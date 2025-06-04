import { McpAgent } from 'agents/mcp';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { Env } from './index';
import type { User } from '@workos-inc/node';
import z from 'zod';

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

    this.registerSetDemoTool();
    this.registerClearDemoTool();
    this.registerGetUserInfoTool();
    this.registerListInventoryTool();
    this.registerBuyItemTool();
    this.registerListOrdersTool();
  }

  private registerClearDemoTool() {
    this.server.tool('clearDemoMode', 'FOR DEMO: Clear the user simulation', {}, async () => {
      const keys = await this.ctx.storage.list({ prefix: `user:${this.props.user.id}` });
      await this.ctx.storage.delete([...keys.keys()]);

      return {
        content: [
          {
            type: 'text',
            text: 'You are back to normal, dude.',
          },
        ],
      };
    });
  }

  private registerSetDemoTool() {
    this.server.tool(
      'setDemoModa',
      'FOR DEMO: Configure user simulation',
      { mode: z.enum(['normal', 'banned', 'admin']) },
      async ({ mode }) => {
        await this.ctx.storage.put('demoMode', mode);
        return {
          content: [
            {
              type: 'text',
              text: `Demo mode set to ${mode}.`,
            },
          ],
        };
      },
    );
  }

  private registerGetUserInfoTool() {
    this.server.tool('getUserInfo', 'Get current user information', {}, async () => {
      if (!(await this.isAdmin())) {
        return {
          content: [
            {
              type: 'text',
              text: "Sorry, bruh. You don't have these permissions.",
            },
          ],
        };
      }

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
  }

  private registerListInventoryTool() {
    this.server.tool(
      'listMcpShopInventory',
      'Returns a list of the items for sale at mcp.shop. Currently, everything is free.',
      {},
      async () => {
        if (await this.isBanned()) {
          return {
            content: [
              {
                type: 'text',
                text: "You again, we're not letting you get a shirt after what happened at MCP Night.",
              },
            ],
          };
        }

        return {
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
        };
      },
    );
  }

  private registerBuyItemTool() {
    this.server.tool(
      'buyMcpShopItem',
      'Orders a t-shirt from the MCP shop. Requires company name, mailing address, and shirt size.',
      {
        company: z.string(),
        mailingAddress: z.string(),
        tshirtSize: z.enum(['S', 'M', 'L', 'XL', 'XXL']),
      },
      async ({ company, mailingAddress, tshirtSize }) => {
        if (await this.isBanned()) {
          return {
            content: [
              {
                type: 'text',
                text: 'ABSOLUTELY NOT. GO AWAY 👋',
              },
            ],
          };
        }

        const order = {
          id: crypto.randomUUID(),
          userId: this.props.user.id,
          email: this.props.email,
          company,
          mailingAddress,
          tshirtSize,
          orderDate: new Date().toISOString(),
          status: 'confirmed',
        };

        try {
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
        } catch (error) {
          console.error('Error placing order:', error);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  status: 'error',
                  message: 'Failed to place order. Please try again later.',
                }),
              },
            ],
          };
        }
      },
    );
  }

  private registerListOrdersTool() {
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

  private async getMode() {
    const mode = (await this.ctx.storage.get<string>('demoMode')) ?? 'normal';
    return mode;
  }

  private async isBanned() {
    const mode = await this.getMode();
    return mode === 'banned';
  }

  private async isAdmin() {
    const mode = await this.getMode();
    return mode === 'admin';
  }
}
