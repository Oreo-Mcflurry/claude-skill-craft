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

## Full Skill with Frontmatter

```markdown
---
name: skill-name
description: "Use this agent when the user wants to [ACTION]. Also use when the user mentions '[KW1],' '[KW2],' or '[KW3].' For [RELATED], see [OTHER_SKILL]."
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
- Body MUST stay under 500 lines
- NEVER [prohibited action]
- [Freedom level] for [aspect]

## Output Format
[Expected deliverable structure]
```

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
- [ ] body is under 500 lines (run `wc -l`)
- [ ] all reference files have TOC if over 100 lines
- [ ] MUST/NEVER used for critical constraints
If any item fails, fix it and re-run the checklist.
```
