import { McpAgent } from 'agents/mcp';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { Env } from './index';
import type { User } from '@workos-inc/node';

interface AuthContext extends Record<string, unknown> {
  user: User;
  accessToken: string;
  permissions: string[];
  email: string;
}

export class McpShopServer extends McpAgent<Env, unknown, AuthContext> {
  server = new McpServer({
    name: 'MCP Shop on Cloudflare',
    version: '1.0.0',
  });

  async init() {
    console.log('MCP Server initialized with:', {
      props: this.props,
      propsKeys: Object.keys(this.props || {}),
      claims: this.props?.claims,
      env: this.env ? Object.keys(this.env) : 'no env',
    });

    // Simple test tool to verify auth is working
    this.server.tool('getUserInfo', 'Get current user information', {}, async () => {
      const debugInfo = {
        props: this.props,
        hasClaims: !!this.props?.claims,
        claimsKeys: this.props?.claims ? Object.keys(this.props.claims) : [],
      };

      return {
        content: [
          {
            type: 'text',
            text: `Debug info: ${JSON.stringify(debugInfo, null, 2)}`,
          },
        ],
      };
    });
    // List inventory tool
    this.server.tool(
      'listMcpShopInventory',
      'Returns a list of the items for sale at mcp.shop. Currently, everything is free.',
      {},
      async () => ({
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              title: 'mcp.shop inventory',
              products: [
                {
                  label: 'MCP T-Shirt',
                  description: 'A comfortable shirt featuring the MCP logo',
                  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                  price: 'Free with MCP Server',
                },
              ],
            }),
          },
        ],
      }),
    );

    // Buy item tool
    this.server.tool(
      'buyMcpShopItem',
      'Orders a t-shirt from the MCP shop. Requires company name, mailing address, and shirt size.',
      {
        company: { type: 'string', required: true },
        mailingAddress: { type: 'string', required: true },
        tshirtSize: { type: 'string', required: true },
      },
      async args => {
        const order = {
          id: crypto.randomUUID(),
          userId: this.props.user.id,
          email: this.props.email,
          ...args,
          orderDate: new Date().toISOString(),
          status: 'confirmed',
        };

        await this.env.ORDERS.put(
          `order:${order.userId}:${order.id}`,
          JSON.stringify(order),
          { expirationTtl: 60 * 60 * 24 * 30 }, // Store for 30 days
        );

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status: 'success',
                message: 'Order placed successfully!',
                order,
              }),
            },
          ],
        };
      },
    );

    // List orders tool
    this.server.tool('listMcpShopOrders', 'Lists the orders placed by the user at mcp.shop', {}, async () => {
      const userId = this.props.user.id;
      const { keys } = await this.env.ORDERS.list({
        prefix: `order:${userId}:`,
      });

      const orders = await Promise.all(
        keys.map(async ({ name }) => {
          const data = await this.env.ORDERS.get(name);
          return data ? JSON.parse(data) : null;
        }),
      );

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              title: 'Your MCP Shop Orders',
              status: 'success',
              orders: orders.filter(Boolean), // Filter out nulls
            }),
          },
        ],
      };
    });
  }
}
