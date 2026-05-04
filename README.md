# 🛡️ Automated Security Dependency Governance

![CI Tests](https://github.com/PrithviKiran791/Automated-Security-Dependency-Governance-/actions/workflows/ci.yml/badge.svg)
![Security Pipeline](https://github.com/PrithviKiran791/Automated-Security-Dependency-Governance-/actions/workflows/renovate.yml/badge.svg)
![Security Verified](https://img.shields.io/badge/Security-Trivy_Protected-green?style=for-the-badge&logo=github)

Prepared for: Project Teammates & Contributors

Target Environment: GitHub Actions, Node.js

Presentation Deadline: May 2026

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. System Architecture](#2-system-architecture)
- [3. Repository Configuration & Secrets](#3-repository-configuration--secrets)
- [4. Contribution Guidelines](#4-contribution-guidelines)
- [5. Presentation Strategy (May Demo)](#5-presentation-strategy-may-demo)
- [6. Testing & Local Runs](#6-testing--local-runs)

## 1. Project Overview

Welcome to the Automated Security Dependency Governance project. As modern software relies heavily on open-source packages, a vulnerable dependency can compromise an entire system. Manually tracking and updating these packages is inefficient and error-prone.

To solve this, we have built a Self-Healing Software Factory. This DevSecOps pipeline automatically detects outdated or vulnerable dependencies, tests the patched versions, verifies system security, and merges the updates directly into production without requiring human intervention.

**Core Objective:** Build an enterprise-grade CI/CD pipeline that demonstrates "Secure by Design" principles using automated governance, vulnerability scanning, and robust testing.

## 2. System Architecture

The pipeline consists of four primary pillars working in sequence:

- **Target Application:** A standard Node.js application using `package.json` to manage dependencies (the repo intentionally includes an outdated dependency such as `lodash` to trigger the pipeline).
- **The Detective (Renovate Bot):** A self-hosted automation runner that periodically scans the repository and creates PRs for outdated dependencies.
- **The Confidence Suite (The Bouncer):** A GitHub Actions workflow (`ci.yml`) that triggers on PRs created by the bot and runs:
  - Security Validation: Trivy scans the filesystem for CVEs.
  - Logic Validation: Jest unit tests to ensure updates don't break application functionality.
- **Auto-Merge Governance:** If both the Trivy scan and Jest tests pass, the PR is automatically merged into `main`.

## 3. Repository Configuration & Secrets

This repository demonstrates hosting the Renovate engine within GitHub Actions rather than using the Marketplace app. This provides finer control and illustrates infrastructure-as-code principles.

Key configuration notes:

1. Renovate configuration: see [confidence-suite/renovate.json](confidence-suite/renovate.json#L1) for the current rules (automerge for minor/patch, dependency dashboard enabled).
2. Repository secret: `RENOVATE_TOKEN` — a personal access token (PAT) used by the self-hosted Renovate runner to create PRs and comment on issues. In production, use a dedicated machine/service account instead of a personal user token.
3. Workflow files: the runner and CI are implemented as GitHub Actions workflows (expected at `.github/workflows/renovate.yml` and `.github/workflows/ci.yml`). If you don't see them in the repo, they should be added to enable automation.

Security reminders:

- Keep `RENOVATE_TOKEN` scoped narrowly (repo:status, repo_deployment, public_repo or as required) and rotate it regularly.
- PRs created by the bot will be authored by the account that owns the PAT. This is normal for demos; use a machine user for multi-operator environments.

### Key Files to Understand

- [confidence-suite/renovate.json](confidence-suite/renovate.json#L1) — The brain. Configures Renovate behavior, allowed update types, and dashboard settings.
- `package.json` — The target application's dependency manifest. See [confidence-suite/package.json](confidence-suite/package.json#L1).
- `.github/workflows/renovate.yml` — The engine (expected). Cron/job running the Renovate Docker image; configured to scan this repo.
- `.github/workflows/ci.yml` — The Confidence Suite (expected). Runs Trivy and Jest when PRs are opened.

If you want, I can scaffold `renovate.yml` and `ci.yml` workflows in `.github/workflows/` for this repo.

## 4. Contribution Guidelines

Please follow this workflow to avoid disrupting automation:

1. Clone the repository locally.
2. Do not push directly to `main`. Create a branch and open a PR so the Confidence Suite runs.
3. To trigger the Renovate runner immediately: go to the Actions tab, choose the Renovate workflow, and click "Run workflow".
4. Monitor the Dependency Dashboard (Issues tab) for pending updates.

Known issue: GitHub indexing can delay PR/Issue visibility. If UI looks empty, run `gh pr list` locally to verify PRs.

## 5. Presentation Strategy (May Demo)

Divide the demo into these roles:

- **DevSecOps Engineer:** Explain `.github/workflows/renovate.yml` and why we self-host Renovate.
- **Security Architect:** Detail Trivy integration and shifting security left.
- **QA Engineer:** Walk through `app.test.js` and the Jest setup, emphasizing breakage detection.
- **Release Manager:** Demonstrate triggering Renovate, viewing the PR, and showing the CI run and automated merge.

## How to push changes (local commands)

Run these commands from the repository root to commit and push (assuming you have push rights and Git auth configured):

```powershell
cd "c:\Users\prith\Desktop\My Projects\Devops_Project\confidence-suite"
git init
git add README.md
git commit -m "Add README: Automated Security Dependency Governance"
git branch -M main
git remote add origin https://github.com/PrithviKiran791/Automated-Security-Dependency-Governance-
git push -u origin main
```

If the remote already exists, update the remote URL or push to the appropriate remote/branch.

---

If you'd like, I can commit and attempt to push this README to the repository now from this environment. Let me know and I'll proceed to commit and push.

## 6. Testing & Local Runs

Run unit tests and local security scans before relying on the CI pipeline. Example commands:

```powershell
cd "c:\Users\prith\Desktop\My Projects\Devops_Project\confidence-suite"
npm install
npm test        # runs Jest
```

Install Trivy and scan the workspace (Windows example using PowerShell):

```powershell
# Install Trivy (if not already installed) — follow Trivy docs for Windows install
trivy fs --exit-code 1 --severity HIGH,CRITICAL .
```

CI note: The `ci.yml` workflow should run `trivy fs` and `npm test` and only allow merge when both succeed.

---

Next step options: scaffold missing workflows, run the Confidence Suite in CI, or make more README edits.
