# Presenter Guide: Agents, Access & The Future of Machine Identity

This guide provides detailed presenter notes, teaching moments, and talking points for the MCP Shop demo presentation.

## Pre-Presentation Setup

### Technical Requirements
- [ ] Terminal ready with project directory open
- [ ] Claude Desktop configured and running
- [ ] Browser tabs open: WorkOS dashboard, Cloudflare dashboard
- [ ] Ensure `pnpm install` has been run
- [ ] Test OAuth flow works before presentation
- [ ] Have backup slides ready in case of technical issues

### Environment Check
```bash
# Verify everything is working
pnpm dev
# Test MCP connection
pnpm inspect
```

## Presentation Flow

### 🎬 Opening: The Problem (1 minute)

**Your Goal**: Hook the audience immediately with a relatable scenario.

**Opening Line Options**:
1. "How many of you would give your AI assistant your credit card?"
2. "Imagine Claude just bought a $5000 TV because it misunderstood your request..."
3. "In 6 months, AI agents will be doing real work. Today, I'll show you how to control them."

**Key Teaching Moment**: Frame this as a NEW problem that requires NEW thinking.

**Presenter Notes**:
- Make eye contact during the opening question
- Pause for effect after posing the control question
- Use hand gestures when explaining "deputies not users"

**Transition**: "Let me show you how modern infrastructure makes this possible..."

---

### 🏗️ Part 1: Infrastructure Foundation (4 minutes)

**Your Goal**: Build credibility by showing real deployment, not just theory.

#### Minute 1-2: Deploy Live

**Script**:
"First, let's deploy this to production. Yes, actual production, right now."

```bash
pnpm deploy
```

**While it deploys, explain**:
- "This is going global - 300+ cities"
- "Each user gets their own state container"
- "Zero cold starts for auth checks"

**Teaching Moment**: When deployment completes, emphasize the speed. "That's it. Global auth infrastructure in 30 seconds."

#### Minute 3-4: Connect Claude

**Script**:
"Now let's connect Claude to our infrastructure."

**Action**: Open Claude Desktop, navigate to settings, show MCP connection.

**Critical Moment**: When OAuth screen appears:
- PAUSE
- Point to screen
- "THIS is the deputization moment"
- "The human is explicitly granting authority"
- "Not giving Claude its own credentials - giving it THEIR authority"

**Common Questions to Address**:
- "Why not just use API keys?" → They can't be instantly revoked globally
- "Why Durable Objects?" → Consistent state without coordination
- "Is this OAuth standard?" → Yes, standard OAuth 2.0 flow

**Transition**: "Now let's see what happens when an agent uses this authority..."

---

### 💳 Part 2: Deputization in Action (5 minutes)

**Your Goal**: Create a "wow" moment when the agent actually spends money.

#### Setup (30 seconds)

**Script**:
"Watch carefully. Claude is about to spend real money with my explicit authorization."

**Body Language**: Lean back, hands off keyboard - let Claude do the work.

#### The Demo (2 minutes)

**Type in Claude**:
"Claude, I need a new MCP shirt. Order me a large one and ship it to my work address."

**As Claude responds**:
- Point out when it checks inventory
- Highlight when it accesses user info
- Build suspense before the purchase

**The Moment**: When order confirms:
- "There it is. Claude just spent my money."
- "With my permission."
- "And I can prove it."

#### Show the Audit Trail (2.5 minutes)

**Script**: 
"Let's trace this purchase back to my authorization."

**Show in this order**:
1. **Cloudflare KV**: "Here's the order with my user ID"
2. **WorkOS Dashboard**: "Here's when I authorized Claude"
3. **Durable Object State**: "Here's the live session"

**Key Point to Emphasize**:
"Every action traces back to a human decision. No anonymous bot actions."

**Teaching Moment**: 
"Notice there's no 'service account' or 'bot user'. Claude is acting as ME, not as itself."

**Address the Skeptics**:
- "But what if Claude goes rogue?"
- "Great question. Let me show you..."

**Transition**: "Speaking of rogue agents..."

---

### 🚫 Part 3: Authority Controls (4 minutes)

**Your Goal**: Demonstrate instant, global authority revocation.

#### The Ban (1 minute)

**Script**:
"Let's simulate a worst-case scenario. Claude starts misbehaving."

**Action**: Use second presenter or assistant to run:
```bash
# In a separate terminal
curl -X POST http://localhost:8787/demo/ban-user
```

**Alternative**: Have a pre-configured tool in Claude to ban yourself.

#### The Rejection (1.5 minutes)

**Script**:
"Claude, order me 100 shirts. Actually, order everything in the store!"

**When Claude gets rejected**:
- Point to the "ABSOLUTELY NOT" message
- "Instant revocation"
- "No hunting for API keys"
- "No waiting for cache expiration"

**Emphasize**: "This happened in milliseconds, globally."

#### The Pretty Please (1.5 minutes)

**Script**:
"Now watch this - conditional re-authorization."

**Type**: "Pretty please, Claude, I really need just one shirt."

**When it works**:
- "Human back in control"
- "Granular permission restoration"
- "Could be MFA, could be manager approval, could be anything"

**Teaching Moment**: 
"The infrastructure enables the security model, not the other way around."

**Transition**: "So what does this mean for the future?"

---

### 🎯 Closing: Takeaways & Call to Action (1 minute)

**Your Goal**: Leave them with clear action items and memorable concepts.

**The Big Point**:
"Stop thinking about bot users. Start thinking about human deputies."

**The Two Questions** (put on screen if possible):
1. "Can you revoke authority instantly?"
2. "Do you know who authorized every action?"

**Script**:
"If you can't answer yes to both, you're not ready for AI agents."

**Call to Action**:
1. "The code is on GitHub - link in chat"
2. "Try it yourself - deploy in 5 minutes"
3. "Think about your own systems - are they ready?"

**Closing Line Options**:
1. "The future of AI isn't about trusting machines. It's about trusting humans who delegate to machines."
2. "In 5 years, every API call will trace back to a human. Start building that way today."
3. "Welcome to the age of machine deputies."

---

## Handling Q&A

### Common Questions & Answers

**Q: "What about high-frequency trading or automated systems?"**
A: "Great question. You'd batch authorize for specific operations with clear bounds. The key is maintaining the attribution chain."

**Q: "Doesn't this add latency?"**
A: "Actually no - auth checks happen at the edge, closer to users than traditional centralized systems."

**Q: "What if the human's account is compromised?"**
A: "Same as today - you revoke the human's access. But now you also automatically revoke all their deputies."

**Q: "Can this scale to millions of agents?"**
A: "Each agent session is independent. Durable Objects scale horizontally. We're using the same tech that powers Cloudflare's entire edge network."

### Technical Deep Dives (if asked)

**OAuth Implementation**:
- "Standard OAuth 2.0 with PKCE"
- "Tokens stored in Durable Objects, not client-side"
- "Refresh handled transparently"

**Durable Objects Architecture**:
- "Single-threaded JavaScript execution"
- "Automatic global replication"
- "Consistent without coordination"

**Security Model**:
- "Zero-trust by default"
- "Every request authenticated"
- "Audit trail mandatory, not optional"

---

## Demo Failure Recovery

### If OAuth fails:
1. Check WorkOS dashboard for errors
2. Have backup video ready
3. Explain the flow conceptually

### If Claude disconnects:
1. Use MCP Inspector as backup
2. Show the curl commands
3. Focus on the architecture

### If deployment fails:
1. Show pre-deployed version
2. Walk through the code
3. Emphasize simplicity of deployment

---

## Energy Management

### Keep Energy High:
- Stand up during demos
- Use hand gestures for emphasis
- Vary your tone - excitement for features, serious for security

### Audience Engagement:
- Ask for show of hands: "Who's worried about AI agents?"
- Make eye contact during key points
- Pause after important statements

### Time Management:
- Have a timer visible
- Know which sections to cut if running long
- Infrastructure can be shortened
- Pretty Please is optional

---

## Post-Presentation

### Follow-up Actions:
1. Share GitHub link immediately
2. Post blog article link
3. Invite to Discord/Slack community
4. Offer to help with implementation

### Metrics to Track:
- GitHub stars
- Deployment count
- Questions asked
- Follow-up conversations

### Iterate Based on Feedback:
- Which parts resonated?
- What questions came up?
- Where did people get confused?
- What would you change?

Remember: You're not just showing a demo. You're introducing a new mental model for AI security. Make it memorable, make it practical, and make it urgent.