# Agents, Access & The Future of Machine Identity

- [Lizzie Siegle](https://lizziesiegle.com/) from [Cloudflare](https://cloudflare.com)
- [Nick Nisi](https://nicknisi.com/social) from [WorkOS](https://workos.com)

```
I am giving a talk next week. The talk title is "Agents, Access, and the Future of Machine Identity"

This is the talk description:

AI agents are calling APIs, submitting forms, and sending emails—but how do you control what they’re allowed to do? As agents act on behalf of users or organizations, traditional patterns like OAuth, session tokens, and role-based access often fall short.In this talk, we’ll explore how machine identity is evolving to meet this new landscape. You’ll learn:- How to think about authentication for agents (not just humans)- What it means to authorize an action when the actor is an LLM or headless service- Real-world strategies from WorkOS and Cloudflare for assigning, managing, and revoking agent identity and accessBy the end, you’ll walk away with practical tools and mental models to build agent-powered systems that are secure, auditable, and scalable.

I am co-presenting this talk with a devrel from Cloudflare, and I adapted the mcp.shop demo to deploy to Cloudflare for the talk. That's what the mcp-shop-cloudflare repository is. 

I need you to help me thread the needle on this. I need to be able to talk about the demo in a way that's compatible with the talk description (lightly, if need be), and I need it to be worthwhile for Cloudflare to be there with me, and I need to loosely follow the following bullet points that I came up with with the devrel from Cloudflare:

Cloudflare 101☁️🔥
WorkOS 101 🔐
MCP
Deploy button 🚀
GitHub 🐙🐱
Easy to do authless but… 
Auth challenge 😥
Benefits 💰
Know who you are🫵
Buy shirt👚
Limit who can use MCP server/how many times
Can this be done? How well do these topics all fit together? The attached blog post is the inspiration for all of this, too. 

Let's talk about this. How can I pull this off? Does the demo fit. By the way, the talk time is only 15 minutes. Can I talk about everything I need to talk about (with the devrel from Cloudflare) and make it interesting and really fun while threading this needle.
```

- Cloudflare 101☁️🔥
- WorkOS 101 🔐
- MCP
  - Deploy button 🚀
  - GitHub 🐙🐱
- Easy to do authless but… 
  - Auth challenge 😥
  - Benefits 💰
  - Know who you are🫵
- Buy shirt👚
- Limit who can use MCP server/how many times


---


Start with the **problem** (2 min):
- "AI agents are doing real things - spending money, accessing data, making decisions"
- "But how do we know WHO they're acting for?"
- Quick demo: Show an MCP client trying to buy a shirt WITHOUT auth. It fails.

**The auth challenge** (3 min):
- Traditional auth assumes human at keyboard
- Agents need delegated authority
- Show the OAuth flow: Human authorizes → Agent gets token → Agent acts on behalf

**Live demo** (5 min):
- Deploy button → instant MCP server on Cloudflare
- Connect via GitHub/Claude/whatever
- Authorize the agent (show the consent screen)
- Buy a shirt through the agent
- Show how you can revoke access

**The insights** (3 min):
- Machine identity isn't just "here's a token"
- It's about delegation chains: Human → Agent → Action
- Show how WorkOS tracks WHO authorized WHAT
- Cloudflare provides the stateful infrastructure for persistent agent sessions

**The future** (2 min):
- Rate limiting per agent
- Audit trails for compliance
- Revocation patterns

**Key adjustments:**
1. Don't explain Cloudflare/WorkOS features. Show them solving problems.
2. Make the shirt buying feel consequential - "This agent can spend real money"
3. Focus on the OAuth dance as the bridge between human and machine identity

The demo works because it's not abstract. You're showing a real agent with real permissions doing real actions. That's your north star.

---

1. Quick Context (3 min)
   - Cloudflare 101: "Where agents run"
   - WorkOS 101: "How to manage identity"
   - MCP: "The protocol connecting them"

2. The Problem (3 min)
   - Deploy button → "Look how easy!"
   - "Easy to do authless but..." → Show anonymous agent chaos
   - Auth challenge → "Who's this agent? Who authorized it?"

3. The Solution Demo (7 min)
   - Benefits: Audit trails, rate limiting, delegation
   - Live demo: OAuth flow → MCP auth → Buy shirt
   - "Know who you are" → Show user attribution
   - "Limit access" → Show permission scopes

4. Wrap-up (2 min)
   - Mental models for agent identity
   - Call to action
