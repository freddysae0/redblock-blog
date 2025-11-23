# Redblock Blog

A modern blog publishing platform built with **Laravel 12**, **Inertia.js**, **React 19**, and **Tailwind CSS 4**. It ships with an editorial dashboard, article management, category tagging, comment moderation, and built-in analytics for views/engagement.

## Feature Highlights
1. Admin dashboard with article/user/comment statistics and charts.
2. Full CRUD for articles and categories, including draft/publish workflows.
3. Markdown-friendly editor powered by Toast UI with media uploads.
4. Comment moderation queue and per-article discussion threads.
5. View tracking (unique + total) and featured blog landing page.

## Tech Stack
| Layer | Tools |
| --- | --- |
| Backend | Laravel 12, PHP 8.2+, Fortify authentication, SQLite (default) |
| Frontend | Inertia.js, React 19, Tailwind CSS 4, Radix UI, Lucide icons |
| Tooling | Vite 7, TypeScript 5, ESLint 9, Prettier 3, Pest for tests |

## Requirements
- PHP 8.2+
- Composer 2.6+
- Node.js 20+ and npm 10+
- SQLite (bundled) or MySQL/Postgres if you adjust `.env`

## Quick Start
### Automated setup
```bash
composer setup
```
This script installs Composer dependencies, copies `.env`, generates the app key, runs database migrations, installs npm packages, and builds frontend assets (@composer.json#42-49).

### Manual setup (alternative)
```bash
composer install
cp .env.example .env # or copy manually on Windows
php artisan key:generate
php artisan migrate --force
npm install
npm run build
```

## Running the App
### All-in-one dev environment
```bash
composer dev
```
This uses `npx concurrently` to run the PHP server, queue listener, Laravel Pail log viewer, and `npm run dev` with a single command (@composer.json#50-53).

### Individual services
```bash
php artisan serve          # API + SSR entrypoint
php artisan queue:listen   # background jobs
php artisan pail --timeout=0 # structured logs
npm run dev                # Vite + React frontend
```

### Production build
```bash
npm run build          # client bundle
npm run build:ssr      # optional SSR bundle
php artisan serve --env=production
```

## Database & Seeding
- Run migrations: `php artisan migrate`
- Reset and seed with fakes: `php artisan migrate:fresh --seed`

The default `.env` targets `database/database.sqlite`; update `DB_CONNECTION` etc. if you prefer MySQL/Postgres (@config/database.php#19-114).

## Testing
```bash
composer test
```
This clears cached config and runs the Pest-powered test suite (@composer.json#59-62).

## Linting & Formatting
```bash
npm run lint          # ESLint with React hooks rules
npm run format        # Prettier with Tailwind plugin
npm run types         # Type-only check via tsc --noEmit
```

## Project Structure (excerpt)
```
├── app/                # Laravel application (controllers, models)
├── bootstrap/
├── config/
├── database/           # migrations, factories, seeders
├── resources/
│   ├── js/             # Inertia pages, components, layouts
│   └── css/
├── routes/             # web + settings routes
├── tests/              # Pest feature/unit tests
├── package.json        # frontend dependencies & scripts
├── composer.json       # backend dependencies & scripts
└── vite.config.ts      # Vite + Tailwind plugin config
```

## Environment Tips
- Copy `.env.example` before running setup; queues, cache, and mail settings inherit from there.
- Default mail/queue drivers use sync/log; swap drivers and Redis credentials in `.env` for production.
- Set `APP_URL` to match your local hostname so Inertia links resolve correctly.

Happy blogging! 🚀
