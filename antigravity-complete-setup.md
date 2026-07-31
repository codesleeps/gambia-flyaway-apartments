# Google Antigravity — Complete Dev Setup Guide

> Last updated: June 2026 | Source: antigravity.google, codelabs, Google Cloud Blog

---

## The Four Surfaces

Google Antigravity is a 4-product ecosystem for the agent-first era:

| Surface | Interface | Best For |
|---------|-----------|----------|
| **Antigravity 2.0** | Desktop App | Multi-agent orchestration, parallel tasks, scheduling |
| **Antigravity CLI** | Terminal (TUI, Go) | Keyboard-driven, headless, SSH/remote containers |
| **Antigravity IDE** | Desktop App + Editor | Direct code editing, line-by-line diff review, debugging |
| **Antigravity SDK** | Python (`google.antigravity`) | Custom agent logic, automated pipelines, evals |

All four share the same underlying agent harness — skills, MCP servers, artifacts, and models work across all surfaces.

---

## Quick Comparison

| Feature | 2.0 | CLI | IDE | SDK |
|---------|-----|-----|-----|-----|
| Multi-agent parallel | Yes | Yes | Limited | Yes (code) |
| Code editing | Via agent | Via agent | Built-in editor | Via agent |
| Scheduling | Yes | Via cron | No | Via code |
| Headless / SSH | No | Yes | No | Yes |
| Line-by-line diff | No | No | Yes | No |
| Built-in debugger | No | No | Yes | No |
| Custom logic | Skills only | Skills only | Skills only | Full Python |

---

## 1. Antigravity 2.0 (Desktop App)

### Installation

**Download:** https://antigravity.google/download

**Requirements:**
- **macOS:** Apple Silicon only, macOS 12 (Monterey)+, x86 NOT supported
- **Windows:** Windows 10 64-bit
- **Linux:** glibc >= 2.28, glibcxx >= 3.4.25 (Ubuntu 20, Debian 10, Fedora 36, RHEL 8)

**Install flow:**
1. Download the installer
2. If prompted "Keep Both" or "Replace" → choose "Replace"
3. During install, you'll be prompted to also install the IDE — optional
4. IDE can be downloaded later from the same page

### First Project

```
1. Click the folder-with-+ icon in the left sidebar
2. Click "New Project"
3. Click "Add Folder" → associate local folders or Git repos
   (multiple folders = cross-repo context for the agent)
4. Click "Create"
5. (Optional) Configure project settings — isolated per project
```

### Starting an Agent

```
1. Type your goal (e.g., "Add JWT auth to the API") — press Enter
2. Choose a Mode in the setup modal:
   - Standard: Agent works directly in your folders
   - Isolated: Agent works in an isolated Git worktree
3. Agent boots up with full context of your codebase
```

### Keyboard Shortcuts

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| Open Conversation Picker | ⌘K | Ctrl+K |
| Open File Search | ⌘P | Ctrl+P |
| Focus Input | ⌘L | Ctrl+L |
| New Conversation | ⌘N | Ctrl+N |
| Next/Prev Conversation | ⌥↑/↓ | Alt+↑/↓ |

### Slash Commands

- `/run` — Run until task is finished, no intermediate input
- `/plan` — Ask clarifying questions before implementing
- `/schedule` — Run on a timer (one-time or recurring)
- `/explain` — Explain selected code

### Scheduling (Cron-like)

Agents can be scheduled:
- One-time future runs
- Recurring (e.g., "check for outdated deps every Monday")
- Per-project scheduled tasks
- Good for: code quality checks, dependency audits, nightly builds

---

## 2. Antigravity CLI

### Installation

```bash
# macOS
brew install antigravity

# Linux
curl -fsSL https://antigravity.google/install.sh | bash

# Or download binary from antigravity.google/download
```

### Key Features

- Built in Go for speed
- TUI (terminal UI) with keyboard navigation
- Background agents that don't lock your terminal
- SSH-friendly — works on remote machines / containers
- Same slash commands, MCP servers, and skills as 2.0

### Basic Usage

```bash
# Start an agent session
antigravity

# Run a one-shot task
antigravity run "Fix all TypeScript errors"

# Plan mode
antigravity plan "Add rate limiting to the API"

# List/manage background agents
antigravity list
antigravity attach <session-id>
```

---

## 3. Antigravity IDE

### What It Adds Over 2.0

- **Built-in code editor** — see and edit files directly
- **Line-by-line diff review** — accept/reject agent changes one hunk at a time
- **Built-in debugger** — agent sees runtime errors, offers one-click fixes
- **Agent manager** — manage multiple agents within the editor
- **Artifacts** — rendered output (HTML, charts, diagrams)
- **Deep codebase understanding** — indexes your entire project

### Installation

Included as an option when installing Antigravity 2.0. Can also be downloaded separately from antigravity.google/download.

---

## 4. Antigravity SDK (Python)

### Installation

```bash
pip install google-antigravity
```

### Quick Start

```python
import asyncio
from google.antigravity import Agent, LocalAgentConfig

async def main():
    config = LocalAgentConfig(
        system_instructions="You are an expert code reviewer.",
        # api_key="your_api_key_here",  # optional, uses default auth
    )
    async with Agent(config) as agent:
        response = await agent.chat("Review the code in src/auth.py")
        print(response)

asyncio.run(main())
```

### Use Cases
- Custom agent pipelines
- Automated code review CI
- Batch processing across repos
- Evals and benchmarks
- Building agentic applications with the Antigravity harness

---

## 5. MCP (Model Context Protocol) Servers

All Antigravity surfaces support MCP servers — connect external tools and data sources.

### Configuring MCP Servers

MCP servers are configured per-project or globally. Configuration is stored in the project settings.

**Example MCP server config (JSON):**
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..."
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://..."
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    }
  }
}
```

### Setup in Antigravity

1. Go to Project Settings → MCP Servers
2. Add server config (command + args + env)
3. Restart agent — server tools auto-register
4. Agent can now call MCP tools (e.g., GitHub issues, DB queries)

Popular MCP servers:
- `@modelcontextprotocol/server-github` — repos, PRs, issues
- `@modelcontextprotocol/server-postgres` — database queries
- `@modelcontextprotocol/server-filesystem` — file operations
- `@modelcontextprotocol/server-fetch` — HTTP requests
- `@modelcontextprotocol/server-brave-search` — web search

---

## 6. Skills

Skills are reusable agent behaviors — stored procedures for common tasks.

### Skill Structure

Skills are markdown files with YAML frontmatter that define:
- **Trigger conditions** — when to load
- **Instructions** — what the agent should do
- **Tools** — which tools to use
- **Templates/references** — supporting files

**Example SKILL.md:**
```markdown
---
name: code-review
description: Review PRs for security, style, and correctness
triggers:
  - "review this code"
  - "code review"
tools:
  - read_file
  - terminal
---

# Code Review Skill

1. Read all changed files
2. Check for:
   - Security issues (OWASP top 10)
   - Style violations (project conventions)
   - Logic errors and edge cases
3. Output a structured review with severity levels
```

### Skill Management

- Skills live in `~/.antigravity/skills/`
- Can be project-scoped or global
- Loaded automatically when trigger phrases match
- Can be manually invoked: `/skill code-review`

---

## 7. Artifacts

Antigravity can render rich output artifacts inline:
- HTML pages
- SVG diagrams
- React components
- Charts and visualizations
- Interactive prototypes

When an agent generates an artifact, it appears as a rendered preview alongside the chat.

---

## 8. Models

Antigravity supports multiple model providers:
- **Gemini** (built-in, included): Gemini 2.5 Pro, Gemini 3.5 Flash
- **Bring your own key**: OpenAI, Anthropic, DeepSeek, etc.
- **Local models**: Via Ollama or compatible endpoints

Model selection is per-agent, configurable in project settings.

---

## 9. Recommended Dev Setup Flow

### Step 1: Install Antigravity 2.0
Download from https://antigravity.google/download

### Step 2: Install Antigravity CLI (optional but recommended)
```bash
brew install antigravity  # macOS
```

### Step 3: Install SDK (if building custom agents)
```bash
pip install google-antigravity
```

### Step 4: Create Your First Project
1. Open Antigravity 2.0
2. Create a project pointing to your main repo(s)
3. Configure your preferred model

### Step 5: Set Up MCP Servers
Add at minimum:
- GitHub MCP (for PR/issues integration)
- Filesystem MCP (for broader file access)

### Step 6: Write Key Skills
Create skills for your common workflows:
- Code review
- Test generation
- Documentation updates
- Dependency management

### Step 7: Set Up Scheduled Tasks
- Nightly dependency audit
- Weekly code quality scan
- CI-ready checks

---

## 10. Your Environment

Based on your setup:
- **Mac:** Intel Mac 64GB — Antigravity 2.0 requires Apple Silicon for macOS, so:
  - Use **Antigravity CLI** on your Mac for terminal workflows
  - Use **Antigravity IDE** via web (ide.antigravity.google) if available
  - Or run on the **VPS (Linux)** which meets glibc requirements
- **VPS (72.61.16.111):** Linux — can run Antigravity 2.0, CLI, and SDK
- **Projects:** leanConstruction, football-scout-ai, tropical-ai-chef, tax-free, fly_trading-bot

---

## Reference Links

| Resource | URL |
|----------|-----|
| Homepage | https://antigravity.google |
| Download | https://antigravity.google/download |
| Docs | https://antigravity.google/docs |
| Codelab (2.0) | https://codelabs.developers.google.com/getting-started-google-antigravity |
| Codelab (CLI) | https://codelabs.developers.google.com/getting-started-antigravity-cli |
| Blog: Choosing Your Surface | https://cloud.google.com/blog/topics/developers-practitioners/choosing-your-surface-antigravity-20-antigravity-cli-antigravity-ide-or-antigravity-sdk |
| MCP + Skills Guide | https://medium.com/google-cloud/configuring-mcp-servers-and-skills-for-antigravity-cli-and-ide-a938c7eebb78 |
