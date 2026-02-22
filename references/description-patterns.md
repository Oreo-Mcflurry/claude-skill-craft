# Description Writing Patterns

## Official Structure Formula

```
[기능 설명 (WHAT)] + [사용 시점 (WHEN/triggers)] + [핵심 기능 (KEY features)]
```

## Format Rules

- Max 1,024 characters
- No XML tags (`< >`) in description
- Write in 3rd person
- Start with "Use this agent when..." or equivalent
- Include trigger keywords naturally
- Add negative triggers when scope is ambiguous ("Not for X, see Y instead")

## Pattern: Keyword-Rich 3rd Person

```
Use this agent when the user wants to [PRIMARY_ACTION]. Also use when the user mentions
'[KEYWORD_1],' '[KEYWORD_2],' '[KEYWORD_3],' or '[KEYWORD_4].' This skill covers
[SCOPE_1], [SCOPE_2], and [SCOPE_3].
```

## Pattern: Problem-Solution

```
When the user needs to [SOLVE_PROBLEM] by [METHOD]. Also use when the user mentions
"[PHRASE_1]," "[PHRASE_2]," or "[PHRASE_3]." For [RELATED_BUT_DIFFERENT], see [OTHER_SKILL].
```

## Pattern: Multi-Trigger with Boundaries

```
Use this agent when the user wants to [ACTION_1] or [ACTION_2]. Also use when the user
says "[TRIGGER_1]," "[TRIGGER_2]," "[TRIGGER_3]," or uses slash commands like
'/[COMMAND].' Distinct from [SIMILAR_SKILL] — this skill focuses on [DIFFERENTIATOR].
```

## Scoring Criteria

| Factor | Weight | Check |
|--------|--------|-------|
| Primary action clarity | 30% | Can Claude determine intent in 1 read? |
| Keyword coverage | 25% | Are synonym/variant triggers included? |
| Boundary clarity | 20% | Is scope clearly bounded vs other skills? |
| Character efficiency | 15% | Is every character earning its place? |
| Localization | 10% | Are non-English triggers included if needed? |

## Negative Triggers (Over-Trigger Prevention)

When a skill triggers too broadly, add negative triggers to the description:

```
# Before (too broad — triggers on any data query)
description: CSV 파일용 데이터 분석을 수행합니다.

# After (scoped with negative trigger)
description: CSV 파일용 고급 데이터 분석. 통계 모델링, 회귀 분석, 클러스터링에
사용하세요. 단순 데이터 탐색에는 사용하지 마세요 (대신 데이터 시각화 스킬 사용).
```

```
# Scope clarification
description: 전자상거래용 PayFlow 결제 처리. 일반 금융 문의가 아닌 온라인 결제
워크플로우 전용으로 사용하십시오.
```

## Common Mistakes

1. **Too vague**: "Use for coding tasks" — matches everything, triggers on noise
2. **Too narrow**: "Use when user says exactly 'create a REST API'" — misses variants
3. **Body leakage**: Including "how to" instructions in description
4. **Missing boundaries**: Not specifying what this skill does NOT do
5. **1st person**: "I help with..." — use "Use this agent when..." instead
6. **No negative triggers**: Failing to exclude adjacent use cases when scope is ambiguous

## Examples of Good Descriptions

### Example 1: Focused Scope
```
Use this agent when the user wants to create or optimize popups, modals, overlays,
slide-ins, or banners for conversion purposes. Also use when the user mentions "exit
intent," "popup conversions," "modal optimization," "lead capture popup," "email popup,"
"announcement banner," or "overlay." For forms outside of popups, see form-cro.
For general page conversion optimization, see page-cro.
```

### Example 2: Multi-Language
```
Use this agent when the user needs to internationalize/localize an iOS project by
extracting hardcoded strings. Also use when the user mentions "localization,"
"xcstrings," "String Catalog," or Korean terms like "로컬라이제이션," "다국어 지원."
```

### Example 3: Action-Oriented
```
When the user wants to audit, review, or diagnose SEO issues on their site. Also use
when the user mentions "SEO audit," "technical SEO," "why am I not ranking," "SEO issues,"
"on-page SEO," "meta tags review," or "SEO health check."
```
