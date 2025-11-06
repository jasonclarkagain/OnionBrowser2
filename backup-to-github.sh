#!/bin/bash

# ========================================
# Replit Projects to GitHub Backup Script
# ========================================
# This script helps you quickly push your Replit projects to GitHub
# Run this in each of your Replit projects to back them up

echo "🚀 GitHub Backup Script for Replit Projects"
echo "==========================================="
echo ""

# Get the current project name from the directory
PROJECT_NAME=$(basename "$PWD")

echo "📁 Current Project: $PROJECT_NAME"
echo ""

# Ask for GitHub username (only need to enter once, then reuse)
read -p "Enter your GitHub username (jasonclarkagain): " GITHUB_USER
GITHUB_USER=${GITHUB_USER:-jasonclarkagain}

# Ask if you want to create a new repo or use existing
read -p "Create new GitHub repo? (y/n): " CREATE_REPO

if [ "$CREATE_REPO" = "y" ]; then
  echo ""
  echo "📝 To create the repository, run this command in your local terminal (with GitHub CLI):"
  echo "   gh repo create $GITHUB_USER/$PROJECT_NAME --public --source=. --remote=origin --push"
  echo ""
  echo "Or create it manually at: https://github.com/new"
  echo "Repository name: $PROJECT_NAME"
  echo ""
  read -p "Press Enter after you've created the repository on GitHub..."
fi

# Initialize git if not already done
if [ ! -d ".git" ]; then
  echo "🔧 Initializing git repository..."
  git init
  git add .
  git commit -m "Initial commit: $PROJECT_NAME backup from Replit"
  git branch -M main
else
  echo "✓ Git already initialized"
fi

# Add remote if not exists
if ! git remote | grep -q "origin"; then
  echo "🔗 Adding GitHub remote..."
  git remote add origin "https://github.com/$GITHUB_USER/$PROJECT_NAME.git"
else
  echo "✓ Remote already configured"
fi

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git add .
git commit -m "Backup: $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push -u origin main

echo ""
echo "✅ Done! Your project is backed up at:"
echo "   https://github.com/$GITHUB_USER/$PROJECT_NAME"
echo ""
echo "🔄 To download this project in the future:"
echo "   git clone https://github.com/$GITHUB_USER/$PROJECT_NAME.git"
echo ""
