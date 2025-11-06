# Quick Guide: Never Manually Download Projects Again

## One-Time Setup (Do This Once)

### 1. Install GitHub CLI on Your Local Computer
```bash
# Mac
brew install gh

# Windows
winget install --id GitHub.cli

# Linux
sudo apt install gh
```

### 2. Login to GitHub CLI
```bash
gh auth login
```

## Backup Any Replit Project in 3 Steps

### Method 1: Using the Backup Script (Fastest)

1. **Open Shell in your Replit project**
2. **Run these commands:**
   ```bash
   curl -O https://raw.githubusercontent.com/jasonclarkagain/privacyguard/main/backup-to-github.sh
   chmod +x backup-to-github.sh
   ./backup-to-github.sh
   ```
3. **Follow the prompts** - it will create a GitHub repo and push your code automatically

### Method 2: Manual Git Push (If Script Doesn't Work)

**In your Replit Shell, run:**
```bash
# Replace PROJECT_NAME with your project name
export PROJECT_NAME="my-project-name"
export GITHUB_USER="jasonclarkagain"

# Create repo on GitHub first at: https://github.com/new
# Then run:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin "https://github.com/$GITHUB_USER/$PROJECT_NAME.git"
git push -u origin main
```

## Download All Your Projects Anytime

Once your projects are on GitHub, you can download them all with one command:

```bash
# Clone all your repos
gh repo list jasonclarkagain --limit 100 | cut -f1 | xargs -I {} gh repo clone {}
```

Or visit: https://github.com/jasonclarkagain?tab=repositories

## Automatic Daily Backups (Advanced)

Add this to your Replit projects to auto-backup daily:

**Create `.replit.d/backup.sh`:**
```bash
#!/bin/bash
git add .
git commit -m "Auto-backup: $(date '+%Y-%m-%d %H:%M:%S')" || exit 0
git push origin main
```

**Add to your crontab or run manually when needed**

## Summary

✅ **Before:** Download each project manually as ZIP (tedious!)
✅ **After:** Push to GitHub once, download anytime, anywhere
✅ **Bonus:** Version control, collaboration, and free backups forever

---

**Quick Reference:**
- Your repos: https://github.com/jasonclarkagain
- Create new repo: https://github.com/new
- Download all: `gh repo list jasonclarkagain --json name --jq '.[].name' | xargs -I {} gh repo clone jasonclarkagain/{}`
