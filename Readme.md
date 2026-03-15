# MKaDifference

Community-focused social platform with members, organisations, activities, messaging, and map discovery.

## Structure

- `backend/` Express API + MongoDB + Socket.IO
- `frontend/` React + Vite client

## Requirements

- Node.js >= 21.5
- MongoDB instance

## Environment

Backend reads the following environment variables:

- `MONGO_URI` MongoDB connection string
- `JWT_SECRET` JWT signing secret
- `PORT` HTTP server port
- `ALLOWED_ORIGINS` Optional comma-separated CORS allowlist
- `MAPCOVERAGE` Optional map coverage radius (defaults to `1` when unset or invalid)
- `METRICS_TOKEN` Optional bearer token required for `GET /metrics`

## Local Development

Backend:

```sh
cd backend
npm install
npm start
```

Frontend:

```sh
cd frontend
npm install
npm run dev
```

## Tests

Backend:

```sh
cd backend
npm test
```

Frontend:

```sh
cd frontend
npm test
```

## Notes

- Activity join uses `POST /api/activities/join` with `{ id }`.
- Manual QA scenarios live in `Testing.md`.

## Operations Scripts

The repository includes helper scripts for common server tasks. Run them from the project root.

Bootstrap (create `.env`, seed the first user, install dependencies, start PM2):

```sh
bash scripts/bootstrap_pm2.sh
```

Optional environment overrides for the bootstrap step (export before running):

```sh
export PORT=3000
export MONGO_URI="mongodb://127.0.0.1/mkadifference"
export JWT_SECRET="your-secret"
export METRICS_TOKEN="your-metrics-token"
export SEED_USERNAME="mkadifference"
export SEED_PASSWORD="mkadifference"
export SEED_NAME="MKaDifference"
export SEED_TYPE="organisation"
export SEED_INVITER="6561f8c7a6f0d92a1b123456"
bash scripts/bootstrap_pm2.sh
```

Update & restart (pull latest, install/update dependencies, restart PM2 with max instances):

```sh
bash scripts/update_and_restart_pm2.sh
```

PM2 ecosystem config (cluster mode with max instances):

```sh
pm2 start backend/ecosystem.config.cjs --env production
pm2 reload backend/ecosystem.config.cjs --env production --update-env
pm2 save
```

Seed user script (reads `backend/.env` or environment variables):

```sh
node backend/tools/addmkadifference.js
```
