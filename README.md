# MCP Shop on Cloudflare

A Model Context Protocol (MCP) server deployed on Cloudflare Workers that demonstrates a simple e-commerce shop with OAuth authentication using WorkOS AuthKit.

## Overview

This project implements an MCP server that provides tools for:
- Browsing shop inventory (currently T-shirts)
- Placing orders
- Viewing order history
- User authentication via WorkOS AuthKit

The server is deployed on Cloudflare Workers using Durable Objects for state management and KV storage for persisting orders.

## Key Features

- **OAuth Authentication**: Secure authentication using WorkOS AuthKit
- **MCP Tools**: 
  - `getUserInfo` - Get current user information
  - `listMcpShopInventory` - Browse available products
  - `buyMcpShopItem` - Place an order
  - `listMcpShopOrders` - View order history
- **Cloudflare Integration**: Uses Workers, Durable Objects, and KV storage
- **Type Safety**: Built with TypeScript and Zod schema validation

## Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- Cloudflare account
- WorkOS account with AuthKit configured

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mcp-shop-cloudflare
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env` (if provided) or create a new `.env` file
   - Add your WorkOS credentials:
     ```
     WORKOS_CLIENT_ID=your_client_id
     WORKOS_API_KEY=your_api_key
     WORKOS_AUTHKIT_DOMAIN=your_authkit_domain
     ```

4. Configure Cloudflare KV namespaces:
   - The project uses two KV namespaces: `ORDERS` and `OAUTH_KV`
   - These are already configured in `wrangler.toml` with IDs
   - To create new namespaces for your own deployment:
     ```bash
     wrangler kv:namespace create "ORDERS"
     wrangler kv:namespace create "OAUTH_KV"
     ```
   - Update the IDs in `wrangler.toml` with your namespace IDs

## Running the Application

### Development Mode

Run the application locally using Wrangler:

```bash
pnpm dev
```

This will start the development server at `http://localhost:8787`

### Production Deployment

Deploy to Cloudflare Workers:

```bash
pnpm deploy
```

### Monitoring Logs

To tail logs in real-time:

```bash
pnpm tail
```

## Testing the Application

### Using the MCP Inspector

The project includes an MCP inspector for testing:

```bash
pnpm inspect
```

This will launch the MCP inspector UI where you can:
1. Connect to your local or deployed MCP server
2. Test the available tools
3. View request/response payloads

### Manual Testing

1. Visit the root URL (e.g., `http://localhost:8787/`) to see the connection instructions
2. Connect your MCP client to the `/mcp` endpoint
3. The OAuth flow will automatically trigger for authentication

## Installing in Claude Code

To use this MCP server with Claude Code:

1. Deploy the server to Cloudflare Workers (see deployment instructions above)
2. Get your deployed URL (e.g., `https://mcp-shop-cloudflare.YOUR-SUBDOMAIN.workers.dev`)
3. In Claude Code, add the MCP server:
   ```
   Server URL: https://your-deployment.workers.dev/mcp
   ```
4. Claude will automatically handle the OAuth authentication flow
5. Once connected, you can use commands like:
   - "Show me the shop inventory"
   - "Order a large T-shirt"
   - "Show my order history"

## Architecture & Key Takeaways

### Technology Stack
- **Cloudflare Workers**: Serverless compute platform
- **Durable Objects**: Stateful objects for MCP server instances
- **KV Storage**: Key-value storage for persisting orders
- **WorkOS AuthKit**: OAuth authentication provider
- **TypeScript**: Type-safe development
- **Zod**: Runtime schema validation

### Key Design Decisions

1. **OAuth Provider Pattern**: Uses `@cloudflare/workers-oauth-provider` to handle OAuth flows seamlessly
2. **Durable Objects**: Each MCP connection gets its own Durable Object instance for isolated state
3. **KV Storage**: Orders are stored with 30-day TTL to manage storage costs
4. **Tool Organization**: Tools are registered in separate methods for better code organization

### Security Considerations

- Authentication is required for all MCP operations
- User data is scoped by user ID in KV storage
- OAuth tokens are handled securely through WorkOS
- No sensitive data is logged or exposed

### Development Workflow

1. The `src/index.ts` sets up the OAuth provider and exports configurations
2. The `src/auth-handler.ts` manages the WorkOS authentication flow
3. The `src/mcp-server.ts` implements the MCP server and tools
4. Cloudflare handles routing, scaling, and global distribution

### Best Practices Demonstrated

- **Separation of Concerns**: Auth logic, MCP server, and tools are clearly separated
- **Type Safety**: Full TypeScript coverage with proper interfaces
- **Error Handling**: Graceful error handling with user-friendly messages
- **State Management**: Proper use of Durable Objects for stateful operations
- **Configuration**: Environment-based configuration for different deployments

## Troubleshooting

### Common Issues

1. **Authentication Fails**: Ensure WorkOS credentials are correctly configured
2. **KV Operations Fail**: Check that KV namespaces are properly bound in `wrangler.toml`
3. **Deployment Errors**: Verify Cloudflare account has necessary permissions
4. **MCP Connection Issues**: Ensure the `/mcp` endpoint is accessible

### Debug Commands

- View Cloudflare logs: `pnpm tail`
- Test locally: `pnpm dev`
- Inspect MCP protocol: `pnpm inspect`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run local tests
5. Submit a pull request

## License

ISC License (see package.json)
