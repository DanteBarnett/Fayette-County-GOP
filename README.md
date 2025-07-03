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

## Continuous Integration & Deployment

A GitHub Actions workflow (`.github/workflows/ci.yml`) automatically:

1. Installs dependencies using cached pnpm store.
2. Runs **ESLint / Prettier** + unit tests (Vitest).
3. Generates a production build.
4. Uploads the `dist/` folder as an artifact.
5. (Optional) If AWS credentials are provided as repo secrets it syncs the build to an S3 bucket and invalidates the linked CloudFront distribution.

### AWS Secrets expected

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION (e.g. us-east-1)
S3_BUCKET (e.g. my-site-bucket)
CLOUDFRONT_DISTRIBUTION_ID (optional)
```

### One-line deployment (manual)

```bash
pnpm build && aws s3 sync dist s3://$S3_BUCKET --delete && \
  aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths '/*'
```

You can also hook the build output to **AWS Amplify** by pointing the Amplify Console at this repository – the default build command (`pnpm build`) and output directory (`dist`) are auto-detected.

## PWA Assets

Every size & format required by modern browsers is pre-generated in `public/`:

* `favicon-16x16.png`, `favicon-32x32.png`, `favicon.ico`
* `pwa-192x192.png`, `pwa-512x512.png` (maskable)
* `apple-touch-icon.png` (180×180)
* `favicon.svg`, `masked-icon.svg`

Update the SVG or PNGs with your own branding to instantly refresh all favicons.

## Husky pre-commit

Local Git hooks are installed automatically after dependencies are installed (`pnpm i`) thanks to the `prepare` script:

```bash
husky install          # run automatically
```

The `pre-commit` hook runs ESLint, Prettier formatting, and unit tests to keep the `main` branch green.
