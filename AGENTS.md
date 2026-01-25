# Repository Guidelines

## Project Structure & Module Organization
- `backend/` holds the Node/Express API. Source lives in `backend/src/`, compiled output in `backend/dist/`, and API tests in `backend/test/`.
- `frontend/` is the React app (Create React App). UI code is in `frontend/src/`, static assets in `frontend/public/`, and production builds in `frontend/build/`.
- `docs/` serves the OpenAPI/Swagger UI app (`docs/index.js` and `docs/routes/`).
- `docker-compose.yaml` and per-service `Dockerfile`s are provided for containerized runs.

## Build, Test, and Development Commands
Run these from the relevant folder:
- `backend/`: `npm install`, `npm run startDev` (dev server), `npm run build` (compile to `dist/`), `npm run serve` (run compiled build).
- `frontend/`: `npm install`, `npm start` (CRA dev server), `npm run build` (production build).
- `docs/`: `npm install`, `npm start` (Swagger UI at `http://localhost:4000/api-docs/`).

## Coding Style & Naming Conventions
- Indentation: 2 spaces (see `backend/.editorconfig`).
- Linting/formatting: ESLint + Prettier in both `backend/` and `frontend/` (`npm run lint`, `npm run lint:fix`).
- JS naming: follow existing camelCase and file naming in `src/` (e.g., `LessonForm.js`, `contact.test.js`).

## Testing Guidelines
- Backend tests use Jest and live in `backend/test/` with `*.test.js` names. Run `npm run test` or `npm run test:ci`.
- Frontend tests are currently not present; add CRA-style tests as `*.test.js` under `frontend/src/` and run `npm test`.

## Commit & Pull Request Guidelines
- Recent commits are short, lowercase phrases (e.g., "email fix", "new images"). Keep messages concise and action-oriented.
- PRs should include: a clear summary, test commands run, and screenshots for UI changes. Link related issues if applicable.

## Configuration Tips
- Copy `.env.example` to `.env` in `backend/` and `frontend/` before running locally. Keep secrets out of commits.
