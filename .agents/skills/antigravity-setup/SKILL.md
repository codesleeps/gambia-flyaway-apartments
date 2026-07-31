---
name: antigravity-setup
description: "Complete setup guide and environment reference for Google Antigravity across its 4 surfaces: 2.0 (Desktop), CLI (Go TUI), IDE, and Python SDK. Includes MCP server config, skills, scheduling, and model setup."
---

# Google Antigravity — Complete Dev Setup & Reference

Reference guide for configuring and operating Google Antigravity (2.0 Desktop, CLI, IDE, and Python SDK).

## The Four Surfaces

| Surface | Interface | Best For |
|---------|-----------|----------|
| **Antigravity 2.0** | Desktop App | Multi-agent orchestration, parallel tasks, scheduling |
| **Antigravity CLI** | Terminal (TUI, Go) | Keyboard-driven, headless, SSH/remote containers |
| **Antigravity IDE** | Desktop App + Editor | Direct code editing, line-by-line diff review, debugging |
| **Antigravity SDK** | Python (`google.antigravity`) | Custom agent logic, automated pipelines, evals |

## Key Capabilities

- **MCP Servers**: Connect external data sources (GitHub, Postgres, Filesystem, Brave Search).
- **Skills**: Modular instructions in `.agents/skills/<skill-name>/SKILL.md`.
- **Artifacts**: Rendered HTML, diagrams, and UI mockups generated directly in the workspace.
- **Model Harness**: Native support for Gemini models, local endpoints, and external providers.
