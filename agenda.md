# Agents, Access & The Future of Machine Identity - CHECKLIST

**Duration:** 15 minutes
**Speakers:** Lizzie Siegle (Cloudflare) | Nick Nisi (WorkOS)

---

## ☁️🔥 Cloudflare 101 (1 min) - LIZZIE
- [ ] "We run your code at the edge, globally"
- [ ] "Durable Objects = stateful compute for agents"
- [ ] "Now with FREE tier - build agents at no cost"

## 🔐 WorkOS 101 (1 min) - NICK
- [ ] "Enterprise auth made simple"
- [ ] "Not just for humans - works for machines too"  
- [ ] "OAuth that scales from startups to enterprise"

## 🤖 MCP (2 min)
- [ ] "Model Context Protocol - how AI talks to tools"
- [ ] "You know GitHub Copilot? It uses MCP to read/write your code"
- [ ] "Same idea: agents acting on YOUR behalf with YOUR permissions"

## 🐙🐱 GitHub Example (1 min)
- [ ] "GitHub MCP server lets AI manage your repos"
- [ ] "But it needs YOUR GitHub token"
- [ ] "Same auth pattern we're using for the shop"

## 🚀 Deploy Button (1 min)
- [ ] "One click → your MCP server is live on Cloudflare"
- [ ] "Powered by Workers and Durable Objects"

## 😬 Easy to do authless but... (2 min)
- [ ] Show MCP Inspector connected
- [ ] Call `listMcpShopInventory` - works!
- [ ] Call `buyMcpShopItem` - works... wait, whose credit card?
- [ ] "Anyone could order 1000 shirts to anywhere"

## 😥 Auth Challenge (2 min)
- [ ] "OAuth wasn't built for agents"
- [ ] "Agents can't click 'Allow' buttons"
- [ ] "WorkOS solves this with delegated auth"
- [ ] "Cloudflare makes it stateful with Durable Objects"

## 💰 Benefits (2 min)
- [ ] Show OAuth flow → authorize agent
- [ ] Show how state persists in Durable Object
- [ ] "Now orders are tied to real users"
- [ ] "Audit trail, rate limiting, revocation"

## 🫵 Know Who You Are (1 min)
- [ ] Show order with user info attached
- [ ] "Every action traced to who authorized it"
- [ ] "WorkOS tracks the delegation chain"

## 👚 Buy Shirt (1 min)
- [ ] Complete the purchase flow
- [ ] Show `listMcpShopOrders` with user's order
- [ ] "Stored in Cloudflare KV with full audit trail"

## 🚫 Limit Usage (1 min)
- [ ] "Rate limit by user identity, not by agent"
- [ ] "Permission scopes enforced at the edge"
- [ ] "Revoke access anytime"

## 🎬 Wrap Up (1 min)
- [ ] "Deploy on Cloudflare today - free tier available"
- [ ] "Add WorkOS auth to any MCP server"
- [ ] Show QR code/link
- [ ] "Questions? Find us after!"

---

## 🎯 CORE MESSAGE
"Cloudflare + WorkOS = Secure agent infrastructure"
