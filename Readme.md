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
