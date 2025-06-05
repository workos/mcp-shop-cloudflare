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
git clone https://github.com/workos/mcp-shop-cloudflare
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

---

# Presentation: Agents, Access & The Future of Machine Identity

This section provides a detailed walkthrough of the demo presentation, explaining the concepts, implementation details, and the broader implications for AI agent authorization.

📹 **[Watch the Demo Video](https://github.com/user-attachments/assets/2ef22ae9-bde5-4701-8588-de4230739946)**

## 🎯 The Core Problem

**What we're solving:** As AI agents become more capable, they need to perform actions on behalf of users - from making purchases to accessing APIs. The critical question is: **"How do you control what they're allowed to do?"**

This demo answers that question by introducing the concept of **agent deputization** - treating AI agents not as independent users, but as deputies acting with explicit human authority.

## 📚 Key Concepts

### Machine Identity vs. Human Authority

Traditional systems treat bots and automated systems as their own users with their own credentials. This creates several problems:

1. **Attribution**: When an agent takes an action, who is responsible?
2. **Revocation**: How do you instantly stop a rogue agent?
3. **Audit**: Can you trace every action back to human authorization?

Our approach flips this model: agents are **deputies** that act with delegated human authority, not independent actors.

### The Deputy Model

Think of it like a power of attorney:
- A human explicitly grants limited authority to an agent
- The agent can only act within those bounds
- The human can revoke that authority instantly
- Every action traces back to the human's authorization

## 🎬 Presentation Walkthrough

### Opening: Setting the Stage (1 minute)

**Goal**: Immediately establish the problem space and get the audience thinking about agent authorization.

**Key Points**:
- AI agents are becoming capable of real-world actions (spending money, accessing data)
- Current security models weren't designed for this
- We need a new mental model: deputies, not users

### Part 1: Infrastructure Foundation (4 minutes)

**Goal**: Show how modern edge infrastructure enables secure agent deputization.

**Technical Deep Dive**:

1. **Cloudflare Workers**: Provides globally distributed compute
   - Runs at the edge, close to users
   - Stateless by design, perfect for API endpoints
   - Built-in security features

2. **Durable Objects**: The key to persistent authority
   - Single-threaded JavaScript execution
   - Consistent state across the globe
   - Perfect for managing OAuth sessions
   - Each user gets their own Durable Object instance

**Demo Sequence**:
```bash
# Deploy the infrastructure
pnpm deploy
```

**Key Moment**: When the OAuth screen appears, this is the **deputization moment** - the human is explicitly granting authority to the agent.

**References**:
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Durable Objects Guide](https://developers.cloudflare.com/workers/learning/using-durable-objects/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

### Part 2: Deputization in Action (5 minutes)

**Goal**: Demonstrate real agent actions with real consequences.

**The "Wow" Moment**: The agent actually spends money on behalf of the user.

**Demo Flow**:
1. User says: "Claude, buy me a large MCP shirt, ship to my address"
2. Agent uses the authorized session to place a real order
3. Show the order confirmation
4. **Critical Point**: The agent just spent real money with the user's explicit authority

**Technical Details**:
- OAuth token is stored in the Durable Object
- Every API call includes user attribution
- WorkOS AuthKit provides the audit trail
- Orders are stored in Cloudflare KV for persistence

**Show the Audit Trail**:
- WorkOS dashboard shows every authentication event
- Cloudflare KV shows order history with user IDs
- Demonstrate full traceability

**Key Concept**: This isn't role-playing or simulation - the agent has real, revocable authority to act on the user's behalf.

**References**:
- [WorkOS AuthKit Documentation](https://workos.com/docs/authkit)
- [OAuth 2.0 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)

### Part 3: Authority Controls (4 minutes)

**Goal**: Demonstrate instant, global authority revocation.

**The Power Move**: Show how quickly you can stop a rogue agent.

**Demo Sequence**:
1. Use `setDemoMode` to ban the user
2. Ask Claude to buy another shirt
3. Get rejected with "ABSOLUTELY NOT. GO AWAY 👋"
4. Try the "Pretty Please" tool to show conditional re-authorization

**Technical Implementation**:
```typescript
// Authority check happens in the Durable Object
const mode = await this.ctx.storage.get<string>('demoMode');
if (mode === 'banned') {
  throw new Error("User is banned");
}
```

**Key Points**:
- Authority revocation is instant and global
- No need to hunt down API keys or tokens
- The human remains in control at all times
- Even "pretty please" shows controlled re-authorization

**Key Insights**:
- Authority should be centralized and instantly revocable
- Edge infrastructure enables real-time security decisions
- Human oversight must be built into the system

### Closing: Takeaways & Future Implications (1 minute)

**The Big Ideas**:

1. **Think Deputies, Not Users**
   - Agents act with human authority, not their own
   - Every action traces back to a human decision

2. **Infrastructure Matters**
   - Modern edge platforms enable new security models
   - Persistent state at the edge is a game-changer

3. **The Two Critical Questions**:
   - Can you revoke authority instantly?
   - Do you know who authorized every action?

**Future Implications**:
- As agents become more capable, this model becomes more critical
- Regulatory compliance will likely require human attribution
- This pattern can extend beyond shopping to any agent action

## 🔧 Implementation Details

### OAuth Flow with Durable Objects

The magic happens in the combination of OAuth and Durable Objects:

1. **Initial Authorization**:
   ```typescript
   // User initiates OAuth flow
   const authUrl = authKit.getAuthorizationUrl({
     redirectUri: `${baseUrl}/oauth/callback`,
     state: sessionId
   });
   ```

2. **Token Storage**:
   ```typescript
   // Store in Durable Object for persistence
   await durableObject.storeTokens(tokens);
   ```

3. **Authority Checks**:
   ```typescript
   // Every request checks current authority
   const isAuthorized = await durableObject.checkAuthority(userId);
   ```

### Security Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Claude    │────▶│  MCP Server  │────▶│ Durable Object  │
│  (Agent)    │     │  (Worker)    │     │ (User Session)  │
└─────────────┘     └──────────────┘     └─────────────────┘
                            │                      │
                            ▼                      ▼
                    ┌──────────────┐      ┌─────────────┐
                    │   WorkOS     │      │     KV      │
                    │  (AuthKit)   │      │  (Orders)   │
                    └──────────────┘      └─────────────┘
```

## 📖 Learning Resources

### Core Technologies

1. **Model Context Protocol (MCP)**
   - [Official MCP Documentation](https://modelcontextprotocol.io/)
   - [Building MCP Servers Guide](https://modelcontextprotocol.io/docs/guides/building-servers)

2. **Cloudflare Workers & Durable Objects**
   - [Workers Fundamentals](https://developers.cloudflare.com/workers/learning/)
   - [Durable Objects Deep Dive](https://blog.cloudflare.com/introducing-workers-durable-objects/)
   - [Edge State Explained](https://developers.cloudflare.com/workers/learning/how-workers-works/)

3. **OAuth & Security**
   - [OAuth 2.0 Simplified](https://aaronparecki.com/oauth-2-simplified/)
   - [Token Storage Best Practices](https://auth0.com/docs/secure/security-guidance/data-security/token-storage)
   - [WorkOS AuthKit Guide](https://workos.com/docs/authkit/guide)

### Conceptual Reading

1. **Agent Authorization & Security**
   - [API Security Project](https://owasp.org/www-project-api-security/)
   - [Zero Trust Security](https://www.cloudflare.com/learning/security/glossary/what-is-zero-trust/)

2. **Edge Computing & Distributed Systems**
   - [Edge Computing Explained](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/)
   - [CAP Theorem and Edge State](https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html)

### Practical Tutorials

1. **Building Your Own Agent Authorization System**
   - Start with this repo as a template
   - [MCP Server Tutorial](https://modelcontextprotocol.io/docs/tutorials/building-a-server)
   - [Cloudflare Workers Tutorial](https://developers.cloudflare.com/workers/tutorials/)

2. **Extending the Demo**
   - Add more granular permissions
   - Implement rate limiting
   - Add multi-factor authentication
   - Create audit log visualizations

## 🚀 Try It Yourself

1. **Clone and Deploy**:
   ```bash
   git clone https://github.com/workos/mcp-shop-cloudflare
   cd mcp-shop-cloudflare
   pnpm install
   pnpm deploy
   ```

2. **Connect to Claude Desktop**:
   - Add your deployment URL to Claude's config
   - Try the demo commands
   - Experiment with authority revocation

3. **Extend the Concept**:
   - What other actions could agents perform?
   - How would you implement granular permissions?
   - Could this model work for your use case?

## 💡 Discussion Questions

1. **Ethics & Responsibility**
   - If an agent makes a mistake, who is liable?
   - How do we ensure informed consent for agent actions?
   - What are the implications for AI accountability?

2. **Technical Challenges**
   - How do you handle offline authority checks?
   - What about high-frequency, low-risk actions?
   - How do you scale to millions of agents?

3. **Future Directions**
   - Will we need new legal frameworks for agent actions?
   - How will this intersect with digital identity standards?
   - What role will edge computing play in AI security?

## 🤝 Contributing

This demo is meant to spark discussion and experimentation. We welcome:
- Bug fixes and improvements
- Additional authorization patterns
- Integration with other AI platforms
- Documentation and tutorials

## 📞 Get Involved

- **GitHub**: [MCP Shop Repository](https://github.com/workos/mcp-shop-cloudflare)
- **Discord**: [MCP Community](https://discord.gg/mcp-community)

Remember: The future of AI agent authorization is being written now. Your input and experimentation can help shape how billions of AI agents will interact with the world safely and responsibly.
