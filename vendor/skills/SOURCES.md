# Third-Party Skill Sources

This project vendors selected third-party skills so product teammates can use the same project-level AI workflow across Codex, OpenCode, Claude, and Cursor.

## Product Manager Skills

- Source: https://github.com/deanpeters/Product-Manager-Skills
- Commit: `2fd54026072c655eb3546b574c313b681ee70daf`
- Vendored path: `vendor/skills/product-manager-skills`
- Active skills:
  - `prd-development`
  - `user-story`
  - `user-story-mapping`
  - `lean-ux-canvas`
  - `customer-journey-map`
- License: Attribution-NonCommercial-ShareAlike 4.0 International. See `vendor/skills/product-manager-skills/LICENSE`.
- Note: This license includes non-commercial and share-alike terms. Review before using in commercial distributions.

## UI UX Pro Max Skill

- Source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Commit: `3ebb9c8fd554248329f13eaa9561cb436d4765a1`
- Vendored path: `vendor/skills/ui-ux-pro-max-skill`
- Active skills:
  - `ui-ux-pro-max`
  - `design-system`
  - `ui-styling`
  - `design`
- License: MIT. See `vendor/skills/ui-ux-pro-max-skill/LICENSE`.

## OpenAI Skills

- Source: https://github.com/openai/skills
- Commit: `49f948faa9258a0c61caceaf225e179651397431`
- Vendored path: `vendor/skills/openai-skills`
- Active skills:
  - `playwright`
  - `screenshot`
- License: Each vendored OpenAI skill includes its own `LICENSE.txt` file.

## Active Skill Copies

Selected skills are copied into:

- `.agents/skills`
- `.claude/skills`
- `.opencode/skills`

The project-specific custom skills in those folders are the primary rules. Vendored third-party skills are supporting method libraries.
