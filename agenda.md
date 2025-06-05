# Agents, Access & The Future of Machine Identity

## Opening: The Problem (1 min)
- [ ] **Together:** Introduce the core problem - agents acting on behalf of humans
- [ ] Set up the question: "How do you control what they're allowed to do?"

## Infrastructure Foundation (4 min)
- [ ] Explain agents need persistent, stateful infrastructure
- [ ] **Demo:** Run `wrangler deploy` from terminal
- [ ] **Show:** Global deployment in seconds
- [ ] **Explain:** Each session gets own Durable Object for persistent authority
- [ ] **Demo:** Connect MCP server to Claude
- [ ] **Show:** OAuth consent screen appears
- [ ] **Handoff:** Pass to second presenter for auth flow

## Deputization in Action (5 min)
- [ ] **Second presenter:** Narrate OAuth consent flow as "deputizing the agent"
- [ ] **Demo:** "Claude, buy me a large MCP shirt, ship to my address"
- [ ] **Show:** Agent places real order
- [ ] **Emphasize:** "Agent just spent my money with my explicit authority"
- [ ] **Demo:** Show WorkOS dashboard audit trail
- [ ] **Demo:** Show Cloudflare KV storage with user traces
- [ ] **Handoff:** Pass back to first presenter

## Authority Controls (4 min)
- [ ] **First presenter:** Use `setDemoModa` to ban user
- [ ] **Demo:** "Claude, try to buy another shirt"
- [ ] **Show:** "ABSOLUTELY NOT. GO AWAY 👋" response
- [ ] **Demo:** Try "Pretty Please" tool
- [ ] **Show:** Still rejected
- [ ] **Emphasize:** Authority instantly revoked across all sessions

## Takeaways (1 min)
- [ ] **Together:** "Think deputies, not users"
- [ ] **Key questions:** Can you revoke authority instantly? Do you know who authorized every action?
- [ ] **Call to action:** Repository link in chat
