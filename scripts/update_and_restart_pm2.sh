#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Error: working tree has uncommitted changes. Commit or stash before pulling."
  exit 1
fi

echo "Step 1: Pulling latest changes..."
git pull --ff-only

echo "Step 2: Installing and updating packages..."
for dir in backend frontend; do
  if [[ -f "$ROOT_DIR/$dir/package.json" ]]; then
    echo "Updating $dir dependencies..."
    (
      cd "$ROOT_DIR/$dir"
      npm install
      npm update
    )
  else
    echo "Skipping $dir (no package.json found)."
  fi
done

echo "Step 3: Restarting PM2 with max threads..."
if command -v pm2 >/dev/null 2>&1; then
  pm2 restart all -i max --update-env
else
  echo "Error: pm2 not found on PATH."
  exit 1
fi

echo "Done."
