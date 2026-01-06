# Repository Guidelines

## Project Structure & Module Organization

- `src/app` contains Angular components, services, and routing.
- Entry points live in `src/main.ts` (browser) and `src/main.server.ts` (SSR), with server glue in `src/server.ts`.
- Global styles are in `src/styles.scss`.
- Static assets and translations live under `public/` (notably `public/pictures`, `public/svg`, and `public/i18n`).
- Environment configuration is in `src/environments`.

## Build, Test, and Development Commands

- `bun install`: install dependencies with Bun.
- `ng serve` or `bun run start`: run the dev server (non-SSR).
- `bun run build`: production build (outputs to `dist/`).
- `bun run serve:ssr`: serve the SSR build from `dist/ArtaferaFrontendNew/server/server.mjs`.
- `bun run test`: run unit tests via Angular CLI.

## Coding Style & Naming Conventions

- TypeScript and Angular templates follow Angular CLI conventions.
- Prettier is configured in `package.json` (100-char line width, single quotes). Format before committing.
- Prefer descriptive, feature-based names: `feature-name.component.ts`, `feature-name.service.ts`, `feature-name.component.html`.

## Testing Guidelines

- Unit tests use Jasmine + Karma (`*.spec.ts` files next to source).
- Name specs after the unit under test, e.g., `header.component.spec.ts`.
- Run all tests with `bun run test` before submitting changes.

## Commit & Pull Request Guidelines

- Recent history uses short, direct commit subjects (e.g., “Update packages”). Keep commits scoped and imperative.
- PRs should include: clear summary, linked issue (if any), and screenshots for UI changes.
- Note SSR-related changes explicitly since they affect `dist/` and `server.mjs`.

## Configuration & Localization

- Transloco configuration is in `transloco.config.ts`; translation files live in `public/i18n`.
- Keep new translation keys grouped by feature and aligned with existing JSON structure.
