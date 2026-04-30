# Automated Security & Dependency Governance

Prepared for: Project Teammates & Contributors

Target Environment: GitHub Actions, Node.js

Presentation Deadline: May 2026

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

- The pipeline uses a repository secret named `RENOVATE_TOKEN`. This PAT belongs to the repository owner and acts as a service account for the bot. In corporate setups, replace this with a dedicated machine user.
- Important: PRs authored by the bot will appear as authored by the PAT owner. That's expected for this demo.

### Key Files to Understand

- `renovate.json` — The brain. Configures Renovate behavior, allowed update types, and dashboard settings.
- `.github/workflows/renovate.yml` — The engine. Cron/job running the Renovate Docker image; configured to scan this repo.
- `.github/workflows/ci.yml` — The Confidence Suite. Runs Trivy and Jest when PRs are opened.

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
