# Agents, Access & The Future of Machine Identity

**Speakers:**
- [Lizzie Siegle](https://lizziesiegle.com/) - Cloudflare
- [Nick Nisi](https://nicknisi.com/social) - WorkOS

**Duration:** 15 minutes

## Talk Flow

### 1. The Problem (2 min)
- **Hook:** "AI agents are doing real things - spending money, accessing data, making decisions"
- **Question:** "But how do we know WHO they're acting for?"
- **Quick demo:** Show MCP client trying to buy a shirt WITHOUT auth → It fails

### 2. Quick Context (3 min)
**Split between speakers:**
- **Cloudflare (Lizzie):** "Where agents run - serverless, stateful with Durable Objects"
- **WorkOS (Nick):** "How to manage identity - OAuth that works for machines"
- **MCP:** "The protocol that connects AI to the real world"

### 3. The Auth Challenge (3 min)
- Traditional auth assumes human at keyboard
- Agents need delegated authority
- **Visual:** Show the flow: Human → OAuth → Agent → Action
- "Easy to make authless MCP servers, but..."

### 4. Live Demo (5 min)
**The magic moment:**
1. **Deploy button** → Instant MCP server on Cloudflare
2. Connect Claude/AI client to the MCP endpoint
3. **Try to buy without auth** → Rejected
4. **OAuth flow** → Human authorizes the agent
5. **Success** → Agent buys shirt on user's behalf
6. **Show audit trail** → "Who authorized what, when"

### 5. Key Insights (2 min)
- Machine identity = delegation chains
- **WorkOS:** Tracks WHO authorized WHAT
- **Cloudflare:** Persistent sessions via Durable Objects + KV
- Benefits: Rate limiting, audit trails, revocation

### 6. Call to Action (30 sec)
- "Deploy your own MCP server today"
- "Think about agent permissions like user permissions"
- Link to repo + resources

## Key Demo Points

1. **Make it real:** "This agent can spend real money"
2. **Show consequences:** What happens without proper auth
3. **OAuth dance:** The bridge between human and machine identity
4. **Practical benefits:** Audit trails, rate limiting, revocation

## Technical Setup

- Live MCP Shop server on Cloudflare
- Claude Desktop or MCP Inspector ready
- OAuth flow configured with WorkOS
- Clear visual of the delegation chain

## Remember

- Don't explain features, show them solving problems
- Keep energy high - this is the future of how AI interacts with the world
- The demo is the star - everything builds to that moment

## Video Demo Addendum

### Short Soundless Demo (~30-60 seconds)

**Purpose:** Visual demonstration of permission-based access control for backup/social sharing

**Sequence:**
1. **Without Admin (0-15s)**
   - Show MCP Inspector connected to server
   - Attempt to call `listUsers` tool
   - **Result:** "Unauthorized: Admin access required" error
   - Show regular user can still browse inventory and their own orders

2. **With Admin (15-30s)**
   - Show OAuth re-auth with admin scope
   - Call `listUsers` tool again
   - **Result:** Full user list with emails and order counts
   - Highlight the user info showing who authorized the agent

3. **Key Visual (30-45s)**
   - Split screen or transition showing:
     - Left: "User Agent" - Limited to shopping actions
     - Right: "Admin Agent" - Full system visibility
   - Show the OAuth consent screen difference

**Visual Callouts:**
- Red ❌ for denied actions
- Green ✅ for allowed actions
- Highlight the authorization header showing different scopes
- Show audit trail: "Admin action by user@example.com at 10:32 AM"

**End Card:** "Agents need proper authorization too"