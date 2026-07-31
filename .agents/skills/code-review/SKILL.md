---
name: code-review
description: "Review PRs, commits, and source code for security vulnerabilities (OWASP top 10), style violations, logic errors, edge cases, and performance regressions. Output a structured review with severity levels."
---

# Code Review Skill

Use this skill when asked to review code, pull requests, diffs, or architecture changes.

## Workflow

1. Read all modified and changed files.
2. Inspect for:
   - **Security issues**: OWASP top 10, unvalidated inputs, credential leakage, broken authorization.
   - **Style & Standards**: Compliance with project patterns and language idioms.
   - **Logic & Correctness**: Unhandled edge cases, null pointer dereferences, race conditions.
   - **Performance**: Unoptimized database/API calls, memory leaks, unneeded sync locks.
3. Output a structured review report categorizing findings by severity (Critical, High, Medium, Low, Info) with clear remediations.
