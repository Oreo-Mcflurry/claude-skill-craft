# SKILL.md Body Template

## Minimal Slash Command (Claude Code)

```markdown
# [Skill Name]

[One-line role assignment for Claude]

## User Request
$ARGUMENTS

## Instructions

### Step 1: [First Action]
[Concise instruction. Use MUST/NEVER for critical rules.]

### Step 2: [Second Action]
[Code example or expected output format instead of concept explanation.]

### Step 3: [Third Action]
[Reference external file if detailed data needed:]
Read [path/to/reference.md]

## Output Format
[Specify exact output structure Claude should produce]

## Verification
- [ ] [Check 1]
- [ ] [Check 2]
- [ ] [Check 3]
If any check fails, fix and re-verify before presenting to user.
```

## Full Skill with Frontmatter (Folder-Based)

Folder structure:
```
skill-name/           ← kebab-case, no spaces/underscores/uppercase
├── SKILL.md          ← MUST be exactly this name (case-sensitive)
├── scripts/          ← Optional
├── references/       ← Optional
└── assets/           ← Optional
```

**NEVER include README.md in the skill folder.**
**NEVER use "claude" or "anthropic" in the skill name.**

SKILL.md content:
```markdown
---
name: skill-name
description: "[WHAT it does]. [WHEN to use - trigger phrases]. [KEY features]."
license: MIT
allowed-tools: "Bash(python:*) WebFetch"
compatibility: "Requires Python 3.10+"
metadata:
  author: your-name
  version: 1.0.0
---

# [Skill Title]

[Role assignment]

## User Request
$ARGUMENTS

## Process

### Step 1: [Understand]
[Parse user input, ask clarifying questions if needed]

### Step 2: [Execute]
[Core action with MUST/NEVER rules]

### Step 3: [Verify]
[Checklist-based verification loop]

## Constraints
- Body MUST stay under 5,000 words
- NEVER [prohibited action]
- [Freedom level] for [aspect]

## Output Format
[Expected deliverable structure]
```

**Frontmatter field reference:**

| Field | Required | Notes |
|-------|----------|-------|
| `name` | Yes | kebab-case, must match folder name |
| `description` | Yes | Under 1,024 chars, no XML tags `< >` |
| `license` | No | e.g., MIT, Apache-2.0 |
| `allowed-tools` | No | Restrict tool access |
| `compatibility` | No | 1-500 chars, environment requirements |
| `metadata` | No | Custom key-value pairs (author, version, mcp-server) |

## Reference File Template

For files placed in `references/` or `scripts/`:

```markdown
# [Topic Title]

<!-- TOC for files over 100 lines -->
## Table of Contents
- [Section 1](#section-1)
- [Section 2](#section-2)

## Section 1
[Content with examples, tables, code blocks]

## Section 2
[Content]
```

## Anti-Pattern Examples

### BAD: Concept over-explanation
```markdown
## What is a REST API?
A REST API (Representational State Transfer Application Programming Interface) is
an architectural style for distributed systems. It uses HTTP methods like GET, POST,
PUT, DELETE to perform CRUD operations...
```
(150+ tokens wasted. Claude already knows this.)

### GOOD: Direct instruction
```markdown
## API Endpoint Generation
Generate RESTful endpoints following this pattern:
- GET /api/{resource} → list
- GET /api/{resource}/:id → detail
- POST /api/{resource} → create
- PUT /api/{resource}/:id → update
- DELETE /api/{resource}/:id → delete
```
(~50 tokens. Actionable.)

### BAD: Vague verification
```markdown
Make sure everything looks good.
```

### GOOD: Specific verification
```markdown
## Verification Checklist
- [ ] description is under 1,024 characters
- [ ] description uses 3rd person voice
- [ ] body contains zero "when to use" language
- [ ] body is under 5,000 words (run `wc -w`)
- [ ] all reference files have TOC if over 100 lines
- [ ] MUST/NEVER used for critical constraints
If any item fails, fix it and re-run the checklist.
```

## Advanced Techniques

### Composability
Skills MUST work alongside other skills. NEVER assume your skill is the only one loaded.

### Programmatic Validation
For critical checks, bundle validation scripts instead of relying on language-only instructions:
```
# Language-only (non-deterministic)
"Check all fields are valid"

# Script-based (deterministic)
python scripts/validate.py --input {filename}
```
Code is deterministic; language interpretation is not.

### Laziness Prevention
Add explicit encouragement for thoroughness in complex tasks:
```markdown
# Performance Note
- Take time to be thorough with this task
- Quality matters more than speed
- Do NOT skip verification steps
```
Note: More effective in user prompts than in SKILL.md body.

### Testing Guidance
Three areas to test:
1. **Trigger test**: Does the skill activate on expected queries? (~10-20 test queries, target 90%+ trigger rate)
2. **Functional test**: Does it produce correct output? (valid output, successful API calls, error handling)
3. **Performance test**: Is it better than no skill? (fewer messages, fewer tokens, fewer failed calls)

### Common Skill Patterns
| Pattern | When to Use |
|---------|-------------|
| Sequential Workflow | Multi-step processes in specific order |
| Multi-MCP Coordination | Workflow spans multiple services |
| Iterative Refinement | Output quality improves with iterations |
| Context-Aware Selection | Same result, different tools based on context |
| Domain Intelligence | Skill adds expert knowledge beyond tool access |
