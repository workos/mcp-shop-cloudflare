# MCP Shop on Cloudflare

A demo e-commerce MCP (Model Context Protocol) server deployed on Cloudflare Workers with OAuth authentication.

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

## Project Structure

```
src/
├── index.ts          # Main Cloudflare Worker entry point
├── mcp-server.ts     # MCP server implementation
└── auth-handler.ts   # OAuth authentication logic
```

## Architecture

- **Cloudflare Workers**: Serverless compute platform
- **Durable Objects**: State management for OAuth sessions
- **KV Storage**: Persistent storage for orders
- **WorkOS AuthKit**: OAuth authentication provider
- **TypeScript + Zod**: Type safety and validation

## Deployment

```bash
# Deploy to production
pnpm deploy

# Get your deployment URL
wrangler tail
```

Your MCP server will be available at `https://[your-worker].[your-subdomain].workers.dev/mcp`

## Troubleshooting

- **Authentication issues**: Ensure WorkOS credentials are correctly set in environment variables
- **KV namespace errors**: Verify namespace IDs in `wrangler.toml` match your created namespaces
- **Connection errors**: Check that you're connecting to the `/mcp` endpoint, not the root URL

## License

MIT
