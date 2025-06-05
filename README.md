# MCP Shop on Cloudflare

A demo e-commerce MCP (Model Context Protocol) server deployed on Cloudflare Workers with OAuth authentication. This project demonstrates how AI agents can act as "deputies" with explicit user authority to perform actions like making purchases on their behalf.

## Quick Start

```bash
# Install dependencies
pnpm install

# Run locally
pnpm dev

# Deploy to Cloudflare
pnpm deploy

# Run MCP Inspector
pnpm run inspect
```

## What is this?

This MCP server demonstrates a simple T-shirt shop that AI assistants can interact with. It provides tools for browsing inventory, placing orders, and viewing order history - all secured with OAuth authentication via WorkOS AuthKit.

### Available MCP Tools

- `listMcpShopInventory` - Browse available T-shirts
- `buyMcpShopItem` - Place an order for a T-shirt
- `listMcpShopOrders` - View your order history
- `getUserInfo` - Get current user information
- `setDemoMode` - (Demo only) Control user authorization state
- `clearDemoMode` - (Demo only) Reset demo state
- `prettyPlease` - (Demo only) Restore ordering ability with politeness

## Prerequisites

- Node.js v18+
- pnpm
- [Cloudflare account](https://dash.cloudflare.com/sign-up)
- [WorkOS account](https://dashboard.workos.com/signup) with AuthKit configured

## Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd mcp-shop-cloudflare
pnpm install
```

### 2. Configure WorkOS Authentication

Create a `.env` file with your WorkOS credentials:

```env
WORKOS_CLIENT_ID=your_client_id
WORKOS_API_KEY=your_api_key
WORKOS_AUTHKIT_DOMAIN=your_authkit_domain
```

### 3. Create Cloudflare KV Namespaces

```bash
# Create namespaces for orders and OAuth data
wrangler kv:namespace create "ORDERS"
wrangler kv:namespace create "OAUTH_KV"
```

Update the namespace IDs in `wrangler.toml` with the IDs from the output above.

## Development

```bash
# Start local dev server on http://localhost:8787
pnpm dev

# View real-time logs
pnpm tail
```

## Testing

### With MCP Inspector

```bash
# Launch the MCP Inspector UI
pnpm inspect
```

Connect to `http://localhost:8787/mcp` and test the available tools interactively.

### With Claude Desktop

1. Deploy to Cloudflare: `pnpm deploy`
2. Add to Claude Desktop's config:
   ```json
   {
     "mcpServers": {
       "shop": {
         "url": "https://your-deployment.workers.dev/mcp"
       }
     }
   }
   ```
3. Try commands like:
   - "Show me what T-shirts are available"
   - "Order a large blue T-shirt"
   - "Show my order history"
   
### Demo Mode

The server includes demo tools to showcase authority management:

1. **Ban a user**: Use `setDemoMode` with "banned" to instantly revoke ordering ability
2. **Restore access**: Say "pretty please" to trigger the `prettyPlease` tool
3. **Reset demo**: Use `clearDemoMode` to reset the demo state

This demonstrates how agent authority can be instantly revoked across all sessions.

## Project Structure

```
src/
├── index.ts          # Main Cloudflare Worker entry point
├── mcp-server.ts     # MCP server implementation
└── auth-handler.ts   # OAuth authentication logic
```

## Architecture

- **Cloudflare Workers**: Serverless compute platform
- **Durable Objects**: State management for OAuth sessions and user authority
- **KV Storage**: Persistent storage for orders and user traces
- **WorkOS AuthKit**: OAuth authentication provider with audit trails
- **TypeScript + Zod**: Type safety and validation
- **MCP SDK**: Model Context Protocol implementation for AI agent interaction

## Deployment

```bash
# Deploy to production
pnpm deploy

# Get your deployment URL
wrangler tail
```

Your MCP server will be available at `https://[your-worker].[your-subdomain].workers.dev/mcp`

## Key Concepts

### Agent Deputization

This project demonstrates the concept of "deputization" - where AI agents act with explicit user authority:

1. **OAuth Flow**: Users must explicitly authorize the agent through OAuth consent
2. **Persistent Authority**: Authorization is stored in Durable Objects for session persistence
3. **Instant Revocation**: Authority can be revoked immediately across all active sessions
4. **Audit Trail**: All actions are logged with user attribution via WorkOS

### Security Benefits

- Every action traces back to a specific user authorization
- Authority can be revoked in real-time
- OAuth tokens are securely managed by the infrastructure
- Complete audit trail of all agent actions

## Troubleshooting

- **Authentication issues**: Ensure WorkOS credentials are correctly set in environment variables
- **KV namespace errors**: Verify namespace IDs in `wrangler.toml` match your created namespaces
- **Connection errors**: Check that you're connecting to the `/mcp` endpoint, not the root URL
- **Demo mode stuck**: Use `clearDemoMode` to reset the demo state

## License

MIT
