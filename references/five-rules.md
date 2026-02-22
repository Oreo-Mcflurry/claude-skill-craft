# Anthropic's 5 Body Rules for SKILL.md

## Rule 1: Progressive Disclosure Architecture

Skill loading is NOT instant injection. It follows a 3-stage pipeline:

| Stage | What Loads | When | Token Cost |
|-------|-----------|------|------------|
| 1 | `name` + `description` (metadata) | Always (session start) | ~100 tokens/skill |
| 2 | SKILL.md body | Only when description matches user request | Variable |
| 3 | `scripts/` and `references/` files | Only when body references them | On-demand |

Script execution: code itself does NOT enter context. Only stdout/stderr output consumes tokens.

**Implication for body design:**
- Body is NOT always loaded. Write it as execution instructions, not discovery metadata.
- Heavy content MUST go into reference files (stage 3), not body (stage 2).
- Body acts as a router/orchestrator; reference files act as detailed chapters.

## Rule 2: Description-Only Trigger

The `description` field is the SOLE trigger for skill activation. Body content is NEVER used for matching.

**What goes WHERE:**

| Content | description | body |
|---------|------------|------|
| When to use this skill | YES | NO |
| Trigger keywords/phrases | YES | NO |
| Use case examples | YES | NO |
| What to do (procedures) | NO | YES |
| How to do it (rules) | NO | YES |
| Expected output format | NO | YES |

**Anti-pattern (DELETE from body):**
```
"This skill should be used when..."
"Use this skill for..."
"When to Use This Skill" section
```

**description best practices:**
- Max 1,024 characters
- Write in 3rd person: "Use this agent when..." not "I help with..."
- Include variant phrasings and synonyms for discoverability
- Cover both English and localized trigger phrases if needed

## Rule 3: 500-Line Body Limit

Context window is a shared resource. When a skill loads, it competes with conversation history, system prompt, and other tools for token space.

**Hard rules:**
- Body MUST stay under 500 lines
- Reference files MUST be linked at max 1 level deep from SKILL.md
- 2+ levels of nested references risk Claude reading only first 100 lines (head -100 behavior)
- Reference files over 100 lines MUST have a table of contents at the top

**Structure pattern:**
```
SKILL.md (body)     → Table of contents / orchestrator (~200 lines)
├── references/a.md → Detailed topic A (~100-300 lines)
├── references/b.md → Detailed topic B (~100-300 lines)
└── references/c.md → Detailed topic C (~100-300 lines)
```

## Rule 4: Claude Already Knows

Every sentence in body must earn its token cost. Claude has broad training knowledge — don't re-explain what it already understands.

**Token efficiency test:** For every line, ask: "Does this instruction add value beyond Claude's training?"

| Approach | Tokens | Effectiveness |
|----------|--------|---------------|
| Concept explanation | ~150 | LOW |
| Code example + expected output | ~50 | HIGH |

**Freedom levels for instruction intensity:**

| Level | When to Use | Example Tasks |
|-------|-------------|---------------|
| HIGH freedom | Claude's judgment is reliable | Code review, brainstorming |
| MEDIUM freedom | Some guardrails needed | API integration, refactoring |
| LOW freedom | Exact steps required | DB migration, deployment scripts |

**Anti-patterns:**
- Explaining what a PDF is
- Describing how JSON works
- Defining programming concepts
- Restating tool documentation

## Rule 5: Verification Loops

Embed execute → verify → fix → re-verify loops in the body. This dramatically reduces skipped steps and output errors.

**Checklist pattern:**
```markdown
### Verification Checklist
- [ ] Step 1 output matches expected format
- [ ] No prohibited patterns detected
- [ ] All required sections present
- [ ] Token budget respected
```

**Language strength matters:**

| Word | Compliance Rate |
|------|----------------|
| "always" | Lower |
| "MUST" | Higher |
| "NEVER" | Highest |

**Error messages MUST be specific:**
```
BAD:  "Check for errors"
GOOD: "If description exceeds 1,024 characters, truncate from the end while preserving the first trigger phrase"
```

**Loop structure:**
```
1. Execute the step
2. Verify against checklist
3. If error found → fix specific issue
4. Re-verify until clean
5. Proceed to next step
```
