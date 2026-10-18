#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-$HOME/medesign}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$(dirname "$SCRIPT_DIR")"

echo -e "\n========================================================"
echo -e "🚀 ME-DESIGN Standalone Repository Extraction Engine (POSIX)"
echo -e "========================================================\n"
echo "Source: $SOURCE_DIR"
echo "Target: $TARGET_DIR"

echo -e "\n[1/5] Running Pre-flight Test Suite in Source..."
cd "$SOURCE_DIR"
node tests/runner.js

echo -e "\n[2/5] Creating clean target directory and copying production assets..."
if [ -d "$TARGET_DIR" ]; then
  BACKUP_DIR="${TARGET_DIR}.bak-$(date +%Y%m%d-%H%M%S)"
  echo "Backing up existing target to $BACKUP_DIR"
  mv "$TARGET_DIR" "$BACKUP_DIR"
fi
mkdir -p "$TARGET_DIR"

WHITELIST_DIRS=(".github" "bin" "data" "integrations" "presets" "references" "scripts" "tests")
WHITELIST_FILES=(".gitignore" "LICENSE" "package.json" "README.md" "medesign.config.js" "SKILL.md")

for dir in "${WHITELIST_DIRS[@]}"; do
  if [ -d "$SOURCE_DIR/$dir" ]; then
    cp -r "$SOURCE_DIR/$dir" "$TARGET_DIR/"
    echo "  Copied: $dir/"
  fi
done

for file in "${WHITELIST_FILES[@]}"; do
  if [ -f "$SOURCE_DIR/$file" ]; then
    cp "$SOURCE_DIR/$file" "$TARGET_DIR/"
    echo "  Copied: $file"
  fi
done

rm -rf "$TARGET_DIR/dist" "$TARGET_DIR/tests/sarif-2.1.0.schema.json" || true
find "$TARGET_DIR" -type f -name "*.bak" -delete || true

echo -e "\n[3/5] Performing Deep Privacy & Path Scrubbing Scan..."
if grep -rnE "hotme|handoffs|C:\\Users" "$TARGET_DIR" --exclude="extract-standalone-repo.*" 2>/dev/null; then
  echo "Privacy violation detected! Extraction halted."
  exit 1
fi
echo "  Clean for open-source: 0 personal paths found."

echo -e "\n[4/5] Initializing Standalone Git Repository..."
cd "$TARGET_DIR"
git init -b main
git add -A
git commit -m "feat(release): initial open-source release of ME-DESIGN v1.2.0"
COMMIT_SHA=$(git rev-parse --short HEAD)
echo "  Git repository initialized (Commit: $COMMIT_SHA)"

echo -e "\n[5/5] Running Self-Contained Test Suite in Target Repository..."
node tests/runner.js
node tests/validate-sarif.js
node tests/test-tokens.js

echo -e "\n========================================================"
echo -e "🎉 ME-DESIGN Standalone Repository is 100% Ready!"
echo -e "========================================================"
echo "Location: $TARGET_DIR"
echo ""
echo "To publish to GitHub:"
echo "  cd \"$TARGET_DIR\""
echo "  gh repo create medesign --private --source=. --remote=origin"
echo "  git push -u origin main"
