#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"
ENV_FILE="$BACKEND_DIR/.env"
PM2_APP_NAME="${PM2_APP_NAME:-mkadifference}"
PM2_CONFIG="$BACKEND_DIR/ecosystem.config.cjs"

echo "Step 1: Creating environment variables file..."
if [[ -f "$ENV_FILE" ]]; then
  echo "Using existing $ENV_FILE"
else
  cat > "$ENV_FILE" <<EOF
NODE_ENV=production
PORT=${PORT:-3000}
JWT_SECRET=${JWT_SECRET:-change-me}
MONGO_URI=${MONGO_URI:-mongodb://127.0.0.1/mkadifference}
SERVER_URI=${SERVER_URI:-https://mkadifference.com/}
MAPCOVERAGE=${MAPCOVERAGE:-13}
ALLOWED_ORIGINS=${ALLOWED_ORIGINS:-}
METRICS_TOKEN=${METRICS_TOKEN:-}
SEED_USERNAME=${SEED_USERNAME:-mkadifference}
SEED_PASSWORD=${SEED_PASSWORD:-mkadifference}
SEED_DESCRIPTION=${SEED_DESCRIPTION:-mkadifference}
SEED_NAME=${SEED_NAME:-MKaDifference}
SEED_TYPE=${SEED_TYPE:-organisation}
SEED_INVITER=${SEED_INVITER:-6561f8c7a6f0d92a1b123456}
EOF
  echo "Created $ENV_FILE"
fi

echo "Step 2: Creating the first user..."
if [[ ! -d "$BACKEND_DIR/node_modules" ]]; then
  echo "Backend dependencies missing; installing to run the seed script..."
  (cd "$BACKEND_DIR" && npm install)
fi
node "$BACKEND_DIR/tools/addmkadifference.js"

echo "Step 3: Installing packages..."
NODE_ENV_VALUE="${NODE_ENV:-}"
if [[ -z "$NODE_ENV_VALUE" && -f "$ENV_FILE" ]]; then
  NODE_ENV_VALUE="$(
    grep -E '^[[:space:]]*NODE_ENV[[:space:]]*=' "$ENV_FILE" | tail -n 1 | sed -E 's/^[^=]*=//; s/^[[:space:]]*//; s/[[:space:]]*$//'
  )"
fi
NODE_ENV_VALUE="${NODE_ENV_VALUE:-production}"

install_deps() {
  local dir="$1"
  if [[ -f "$dir/package.json" ]]; then
    echo "Installing dependencies in $dir..."
    if [[ "$NODE_ENV_VALUE" == "production" && -f "$dir/package-lock.json" ]]; then
      (cd "$dir" && npm ci)
    else
      (cd "$dir" && npm install)
    fi
  else
    echo "Skipping $dir (no package.json found)."
  fi
}

install_deps "$BACKEND_DIR"
install_deps "$FRONTEND_DIR"

echo "Step 4: Starting PM2 server..."
if ! command -v pm2 >/dev/null 2>&1; then
  echo "Error: pm2 not found on PATH."
  exit 1
fi

export PM2_APP_NAME
if pm2 describe "$PM2_APP_NAME" >/dev/null 2>&1; then
  pm2 reload "$PM2_CONFIG" --env production --update-env
else
  pm2 start "$PM2_CONFIG" --env production
fi

pm2 save

PORT_VALUE="${PORT:-}"
if [[ -z "$PORT_VALUE" && -f "$ENV_FILE" ]]; then
  PORT_VALUE="$(
    grep -E '^[[:space:]]*PORT[[:space:]]*=' "$ENV_FILE" | tail -n 1 | sed -E 's/^[^=]*=//; s/^[[:space:]]*//; s/[[:space:]]*$//'
  )"
fi
PORT_VALUE="${PORT_VALUE:-3000}"

if command -v curl >/dev/null 2>&1; then
  echo "Checking health endpoint..."
  HEALTH_URL="http://localhost:${PORT_VALUE}/healthz"
  for attempt in {1..10}; do
    if curl -fsS "$HEALTH_URL" >/dev/null; then
      echo "Health check OK."
      break
    fi
    sleep 2
    if [[ "$attempt" -eq 10 ]]; then
      echo "Health check failed after 10 attempts."
      exit 1
    fi
  done
else
  echo "curl not found; skipping health check."
fi

echo "Done."
