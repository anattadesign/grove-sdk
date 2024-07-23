#!/bin/bash

# Variables
REPO="https://github.com/anattadesign/grove-sdk.git"
MAIN_BRANCH="master"
GH_PAGES_BRANCH="gh-pages"
BUILD_DIR="build"

# Function to abort if any command fails
abort() {
  echo "$1"
  exit 1
}

# Build the project
npm run build || abort "Build failed!"

# Push to main branch
git add .
git commit -m "Deploy to main" || echo "No changes to commit"
git push origin $MAIN_BRANCH || abort "Failed to push to main branch!"

# Deploy to gh-pages
git checkout $GH_PAGES_BRANCH || abort "Failed to checkout gh-pages branch!"
git pull origin $GH_PAGES_BRANCH || abort "Failed to pull gh-pages branch!"

# Remove old files
git rm -rf . || abort "Failed to remove old files!"

# Copy new build files
cp -r $BUILD_DIR/* . || abort "Failed to copy build files!"

# Add and commit new build files
git add . || abort "Failed to add build files!"
git commit -m "Deploy to gh-pages" || echo "No changes to commit"
git push origin $GH_PAGES_BRANCH || abort "Failed to push to gh-pages branch!"

# Checkout back to main branch
git checkout $MAIN_BRANCH || abort "Failed to checkout main branch!"
