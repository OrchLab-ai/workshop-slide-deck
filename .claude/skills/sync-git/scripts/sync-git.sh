#!/usr/bin/env bash
set -euo pipefail

echo "=== Syncing main with upstream ==="
git fetch origin --prune
git fetch origin main:main
git rebase main --autostash

echo ""
echo "=== Deleting local branches merged into main ==="
merged=$(git branch --merged main | grep -v '^\*\|main' || true)
if [ -n "$merged" ]; then
  echo "$merged" | xargs git branch -d
else
  echo "No merged branches to delete."
fi

echo ""
echo "=== Done ==="
git branch
