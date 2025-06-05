# Agents, Access & The Future of Machine Identity

## Opening: The Problem (1 min)
- [ ] **Together:** Introduce the core problem - agents acting on behalf of humans
- [ ] Set up the question: "How do you control what they're allowed to do?"

## Enter: WorkOS (1 min)
- [ ] "Enterprise auth made simple"
    - [ ] "Not just for humans - works for machines too"
    - [ ] "OAuth that scales from startups to enterprise"

## Infrastructure Foundation (5 min)
- [ ] Agents need persistent, stateful infrastructure
- [ ] Cloudflare 101
    - [ ] 🤔 You think you know Cloudflare? ☁️🔥
    - [ ] "We run your code @ the edge, globally"
    - [ ] Compute, Storage📀, Media🌠, AI🤖
        - [ ] "Durable Objects = stateful compute for agents"
        - [ ] Bindings: AI
    - [ ] "Now with FREE tier - build agents @ no cost"
- [ ] **Demo:** Run `wrangler deploy` from terminal
- [ ] **Show:** Global deployment in seconds
- [ ] **Explain:** Each session gets own Durable Object for persistent authority
- [ ] **Demo:** Connect MCP server to Claude
- [ ] **Show:** OAuth consent screen appears

## Deputization in Action (5 min)
- [ ] **Demo:** Narrate OAuth consent flow as "deputizing the agent"
- [ ] **Demo:** "Claude, buy me a large MCP shirt, ship to my address"
- [ ] **Show:** Agent places real order
- [ ] **Emphasize:** "Agent just spent my money with my explicit authority"
- [ ] **Demo:** Show WorkOS dashboard audit trail
- [ ] **Demo:** Show Cloudflare KV storage with user traces

## Authority Controls (4 min)
- [ ] **First presenter:** Use `setDemoMode` to ban user
- [ ] **Demo:** "Claude, try to buy another shirt"
- [ ] **Show:** "ABSOLUTELY NOT. GO AWAY 👋" response
- [ ] **Demo:** Try "Pretty Please" tool

## Takeaways (1 min)
- [ ] **Together:** "Think deputies, not users"
- [ ] **Key questions:** Can you control what actions agents can take? Do you know who authorized every action?


---

## Demo video

https://github.com/user-attachments/assets/2ef22ae9-bde5-4701-8588-de4230739946


## Get a shirt with MCP!

![](qr-shop.png)


## Check out the code

![](qr-repo.png)
