import { McpAgent } from 'agents/mcp';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { Env } from './index';

interface AuthContext extends Record<string, unknown> {
  claims: {
    sub: string;
    email?: string;
    name?: string;
  };
}

export class McpShopServer extends McpAgent<Env, unknown, AuthContext> {
  server = new McpServer({
    name: 'MCP Shop',
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
        // For now, just return a mock order confirmation
        const orderId = Math.floor(Math.random() * 10000);
        const order = {
          id: orderId,
          userId: this.props.claims.sub,
          email: this.props.claims.email,
          ...args,
          orderDate: new Date().toISOString(),
          status: 'confirmed',
        };

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
      // For now, return empty orders
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              status: 'success',
              orders: [],
              message: 'No orders found. Place an order first!',
            }),
          },
        ],
      };
    });
  }
}
