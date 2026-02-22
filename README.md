<div align="center">

# claude-skill-craft

**Build better Claude Code skills. Every time.**

[![npm version](https://img.shields.io/npm/v/claude-skill-craft?style=flat-square&color=CB3837)](https://www.npmjs.com/package/claude-skill-craft)
[![npm downloads](https://img.shields.io/npm/dm/claude-skill-craft?style=flat-square&color=blue)](https://www.npmjs.com/package/claude-skill-craft)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-skill-blueviolet?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTEyIDJMMyA3djEwbDkgNSA5LTVWN3oiLz48L3N2Zz4=)](https://docs.anthropic.com/en/docs/claude-code)

Anthropic의 5가지 body 규칙을 기반으로 Claude Code 스킬을 생성하고 리뷰합니다.

[Installation](#installation) · [Commands](#commands) · [5 Rules](#the-5-rules) · [Examples](#examples)

</div>

---

## Why?

SKILL.md의 body를 어떻게 쓰느냐에 따라 결과물 품질이 완전히 달라집니다.

> description은 **'언제 쓸지'** 를 결정하고, body는 **'어떻게 할지'** 를 결정합니다.
> 이 두 역할을 섞는 순간 스킬은 발동도 안 되고 품질도 떨어집니다.

`claude-skill-craft`는 Anthropic 공식 문서와 엔지니어링 블로그에서 추출한 5가지 규칙을 자동으로 적용합니다.

## Installation

```bash
npm install -g claude-skill-craft
```

설치 시 자동으로 `~/.claude/commands/`에 두 개의 커맨드가 설치됩니다:
- `/skill-create` — 새 스킬 생성
- `/skill-review` — 기존 스킬 리뷰

## Commands

### `/skill-create` — 새 스킬 만들기

```
/skill-create PDF에서 텍스트를 추출하고 마크다운으로 변환하는 스킬
```

Claude가 5가지 규칙에 맞춰 다음을 생성합니다:
1. 최적화된 `description` (1,024자 이하, 3인칭)
2. 규칙을 준수하는 `body` (500줄 이하)
3. 참조 파일 (필요 시 자동 분리)
4. 설치 가이드

### `/skill-review` — 기존 스킬 리뷰

```
/skill-review ~/.claude/commands/my-skill.md
```

```
/skill-review my-skill
```

5가지 규칙 기준으로 채점하고 개선안을 제시합니다:

```
## Skill Review Report: my-skill

### Scores
| Rule                       | Score | Grade |
|----------------------------|-------|-------|
| 1. Progressive Disclosure  | 8/10  | A     |
| 2. Description-Only Trigger| 4/10  | F     |
| 3. 500-Line Body Limit    | 9/10  | A     |
| 4. Token Efficiency        | 6/10  | B     |
| 5. Verification Loop       | 3/10  | F     |
| **Total**                  | **30/50** | **C** |

### Critical Issues (MUST fix)
1. Body line 12: "Use this skill when..." → DELETE (Rule 2 위반)
2. No verification checklist found → ADD checklist (Rule 5 위반)
```

## The 5 Rules

Anthropic의 공식 문서와 엔지니어링 블로그에서 추출한 SKILL.md body 작성 규칙:

| # | Rule | Key Point |
|---|------|-----------|
| 1 | **Progressive Disclosure** | 스킬은 3단계로 로딩됨. body는 목차, 참조 파일은 각 장 |
| 2 | **Description-Only Trigger** | "언제 쓸지"는 description에만. body에 적으면 토큰 낭비 |
| 3 | **500-Line Body Limit** | 맥락 범위는 공공재. body는 짧게, 나머지는 참조 파일로 |
| 4 | **Claude Already Knows** | 개념 설명 대신 코드 예시. 50토큰 > 150토큰 |
| 5 | **Verification Loops** | 실행→검증→수정→재검증. "MUST" > "always" |

## Examples

### 새 스킬 생성 예시

```
/skill-create Git 커밋 메시지를 conventional commits 형식으로 자동 생성하는 스킬
```

### 기존 스킬 리뷰 예시

```
/skill-review hig
```

### 일괄 리뷰

```
/skill-review 내 모든 스킬을 리뷰해줘
```

## Auto-Detection (Optional)

프로젝트 CLAUDE.md에 자동 감지 스니펫을 추가하면, 스킬 관련 요청 시 자동으로 활성화됩니다:

```bash
cat $(npm root -g)/claude-skill-craft/claude-md-snippet.md >> ~/.claude/CLAUDE.md
```

## Uninstall

```bash
npm uninstall -g claude-skill-craft
```

자동으로 설치된 커맨드와 참조 파일이 제거됩니다.

## How It Works

```
npm install
    │
    ▼
install.js
    │
    ├── ~/.claude/commands/skill-create.md
    ├── ~/.claude/commands/skill-review.md
    └── ~/.claude/commands/skill-craft-references/
        ├── five-rules.md
        ├── description-patterns.md
        ├── body-template.md
        └── review-checklist.md
```

스킬 자체도 5가지 규칙을 따릅니다:
- 커맨드 파일은 오케스트레이터 역할 (Stage 2)
- 상세 규칙/템플릿/체크리스트는 참조 파일로 분리 (Stage 3)
- 커맨드 body에 "when to use" 언어 없음
- 검증 체크리스트 내장

## Contributing

Issues and PRs welcome at [GitHub](https://github.com/Oreo-Mcflurry/claude-skill-craft).

## License

MIT

---

<div align="center">

Made with Claude Code by [@Oreo-Mcflurry](https://github.com/Oreo-Mcflurry)

</div>
