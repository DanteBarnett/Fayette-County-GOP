# Fayette County Republican Party Website

A modern, performant, and accessible web presence built with **React 18 + Vite + Tailwind CSS**.

## Quick-Start

```bash
pnpm i
pnpm dev
```

Open <http://localhost:5173> to view the site.

## Scripts

- `pnpm dev` – start local dev server with hot reload
- `pnpm build` – production build to `dist/`
- `pnpm preview` – locally preview the production build
- `pnpm lint` – run ESLint + Prettier
- `pnpm test` – run unit tests with Vitest

## Environment Variables

Create a `.env` file based on `.env.example` and provide your Supabase credentials.

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=public-anon-key
```

## Supabase Schema (SQL)

```sql
create table events (
  id bigint generated always as identity primary key,
  title text not null,
  date timestamptz not null,
  location text not null
);

create table news (
  id bigint generated always as identity primary key,
  title text not null,
  link text not null,
  isoDate text
);
```

## Deployment

The app is **zero-config** on AWS Amplify or an S3 + CloudFront static site.

1. Build the project: `pnpm build`
2. Upload the generated `dist/` directory to your hosting of choice.

## CI / CD

A GitHub Actions workflow runs lint, test, and build on every push to `main`, then uploads the production artifact.
