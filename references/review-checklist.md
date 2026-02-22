# Skill Review Checklist

## Pre-Check: Structure Validation (Pass/Fail)

These MUST pass before scoring. Any failure is an automatic Critical Issue:

| Check | Pass | Fail |
|-------|------|------|
| Folder name is kebab-case | ✅ | ❌ Auto-fail |
| File is named exactly `SKILL.md` (case-sensitive) | ✅ | ❌ Auto-fail |
| YAML frontmatter has `---` delimiters | ✅ | ❌ Auto-fail |
| `name` field exists and is kebab-case | ✅ | ❌ Auto-fail |
| `description` field exists and is non-empty | ✅ | ❌ Auto-fail |
| No XML tags (`< >`) in frontmatter | ✅ | ❌ Auto-fail |
| No `README.md` in skill folder | ✅ | ❌ Auto-fail |
| Skill name does not contain "claude" or "anthropic" | ✅ | ❌ Auto-fail |

## Scoring

Score each rule 0-10. Total: /50. Grade: A (40+), B (30-39), C (20-29), F (<20).

## Rule 1: Progressive Disclosure (0-10)

| Check | Pass | Fail |
|-------|------|------|
| Body acts as orchestrator, not encyclopedia | Yes → +2 | No → 0 |
| Heavy content split into reference files | Yes → +2 | No → 0 |
| Reference files are max 1 level deep | Yes → +2 | No → 0 |
| No inline data dumps (>50 lines of raw data) | Yes → +2 | No → 0 |
| Scripts return output only (code not in context) | Yes/NA → +2 | No → 0 |

## Rule 2: Description-Only Trigger (0-10)

| Check | Pass | Fail |
|-------|------|------|
| description exists and is non-empty | Yes → +1 | No → 0 |
| description is under 1,024 characters | Yes → +2 | No → 0 |
| description uses 3rd person voice | Yes → +2 | No → 0 |
| Body contains NO "when to use" language | Yes → +3 | No → 0 |
| description includes keyword variants/synonyms | Yes → +2 | No → 0 |

**"When to use" language detection patterns:**
- "This skill should be used when"
- "Use this skill for"
- "When to Use This Skill" (section header)
- "This is useful when"
- "Invoke this skill if"
- "이 스킬은 ~할 때 사용"

## Rule 3: Body Size Limit (0-10)

| Check | Pass | Fail |
|-------|------|------|
| Body is under 5,000 words | Yes → +4 | No → 0 |
| Body is under 300 lines (ideal) | Yes → +2 | 300+ lines → +1, >5,000 words → 0 |
| Reference files each under 300 lines | Yes → +2 | No → 0 |
| Reference files over 100 lines have TOC | Yes → +2 | No/NA → 0 |

**Measurement:** Count words excluding frontmatter YAML (`wc -w`).

## Rule 4: Token Efficiency (0-10)

| Check | Pass | Fail |
|-------|------|------|
| No concept explanations Claude already knows | Yes → +3 | No → 0 |
| Uses code examples over prose descriptions | Yes → +3 | No → 0 |
| Freedom level appropriate for task type | Yes → +2 | No → 0 |
| No redundant/repeated instructions | Yes → +2 | No → 0 |

**Token waste indicators:**
- "X is a Y that does Z" definitional sentences
- Paragraphs explaining standard tools/formats
- Repeated instructions in different words
- Over-specified obvious behaviors

## Rule 5: Verification Loop (0-10)

| Check | Pass | Fail |
|-------|------|------|
| Has explicit verification step(s) | Yes → +2 | No → 0 |
| Uses checklist format for verification | Yes → +2 | No → 0 |
| Uses MUST/NEVER for critical constraints | Yes → +2 | No → 0 |
| Error messages are specific and actionable | Yes → +2 | No → 0 |
| Has fix → re-verify loop | Yes → +2 | No → 0 |

## Report Format

```
## Skill Review Report: [Skill Name]

### Scores
| Rule | Score | Grade |
|------|-------|-------|
| 1. Progressive Disclosure | /10 | |
| 2. Description-Only Trigger | /10 | |
| 3. Body Size Limit | /10 | |
| 4. Token Efficiency | /10 | |
| 5. Verification Loop | /10 | |
| **Total** | **/50** | **[A/B/C/F]** |

### Critical Issues (MUST fix)
1. [Issue description + specific fix]

### Improvements (SHOULD fix)
1. [Issue description + specific fix]

### Optimizations (COULD fix)
1. [Issue description + specific fix]

### Rewritten Sections
[Provide rewritten version of any failing sections]
```

## Bonus Checks (Informational, not scored)

| Check | Status |
|-------|--------|
| Description has negative triggers (if scope is ambiguous) | |
| Description follows [WHAT] + [WHEN] + [KEY] formula | |
| Skill works alongside other skills (composability) | |
| Critical validations use scripts, not language-only instructions | |
| Error handling included | |
| Examples provided | |
| References clearly linked | |
