Fayette County Republican Party — Modern Website
================================================

This repository contains the **Fayette GOP Site**, a production-ready web monorepo powered by **Python 3.12**, **Django 5**, **Wagtail 6**, **React 18**, and **Tailwind CSS**.  It ships with Docker-based local development, GitHub Actions CI, and ready-to-deploy AWS & Render configurations.

> 🗂  **Full project structure** is shown below.  Critical files are provided in-repo; most directories will be created automatically by Django/Wagtail or the React build.

```text
.
├── Dockerfile
├── docker-compose.yml
├── manage.py
├── postcss.config.js
├── tailwind.config.js
├── vite.config.ts
├── .dockerignore
├── .gitignore
├── README.md  ← you are here
├── requirements.txt
├── fayette_gop/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── home/
│   ├── __init__.py
│   ├── admin.py
│   ├── models.py
│   ├── templates/
│   │   └── home/
│   │       └── home_page.html
│   └── tests.py
├── templates/
│   └── base.html
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts  (symlink to project-root vite.config.ts)
    ├── index.html
    └── src/
        ├── App.tsx
        ├── main.tsx
        └── components/
            └── NavBar.tsx
```

Prerequisites
-------------

* Docker 20+
* Make (optional but handy)

Local Development (Docker-first)
--------------------------------

```bash
# 1. Clone the repo
$ git clone https://github.com/your-org/fayette-gop-site.git && cd fayette-gop-site

# 2. Spin up full stack (Django, Postgres, Node, Vite dev server)
$ docker-compose up ‑d --build

# 3. Apply DB migrations & create superuser
$ docker-compose exec web python manage.py migrate
$ docker-compose exec web python manage.py createsuperuser

# 4. Access sites
# ‑ Django/Wagtail:  http://localhost:8000/
# ‑ Wagtail admin:   http://localhost:8000/admin/
# ‑ React dev:       http://localhost:5173/
```

Alternate: Native Python/Node
-----------------------------

Install dependencies with `poetry install` or `pip install -r requirements.txt`, setup a local Postgres DB, then:

```bash
# Django
$ python manage.py migrate && python manage.py runserver

# React
$ cd frontend && pnpm install && pnpm dev
```

Deployment
----------

### AWS Elastic Beanstalk (Docker platform)

1. Push the Docker image to Amazon ECR:

```bash
$ aws ecr create-repository --repository-name fayette-gop-site
$ docker build -t fayette-gop-site .
$ docker tag fayette-gop-site:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/fayette-gop-site:latest
$ docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/fayette-gop-site:latest
```

2. Create a new Elastic Beanstalk environment (Docker running on Python 3.12) and set environment variables:

```env
DJANGO_SETTINGS_MODULE=fayette_gop.settings
DJANGO_SECRET_KEY=«prod-secret»
DATABASE_URL=«your-rds-url»
ALLOWED_HOSTS=yourdomain.com
SENDGRID_API_KEY=«sendgrid-key»
GA_ID=G-XXXXXXXXXX
```

3. Deploy via EB CLI or AWS Console.

### Render.com (free tier)

Render supports Docker out-of-the-box; create a new **Web Service** from this repo, enable **Build Command** `docker build -t fayette-gop-site .` and **Start Command** `docker run ‑p 8000:8000 fayette-gop-site`.

### Static Assets

React production build is generated at Docker build time and served by Django **whitenoise**.  For a higher-scale setup, push the `/frontend/dist` folder to S3 and point CloudFront at it, keeping Django API on a separate sub-domain.

CI / CD
-------

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on pull request:

1. **Python:** black, flake8, isort, mypy, pytest.
2. **JS/TS:** ESLint, Prettier, Jest/RTL.
3. Build Docker image & push to ECR (on `main`).

Tech Stack Breakdown
--------------------

* **Backend:** Django 5 + Wagtail 6 — role-based CMS, StreamFields, Snippets.
* **Database:** PostgreSQL 15 (SQLite in dev).
* **Frontend:** React 18 (Vite + TS) — optional headless mode.
* **Styling:** Tailwind CSS + shadcn/ui component library.
* **Auth & Security:** Django auth, CSRF, strong cookies, optional 2FA.
* **Testing:** pytest, React Testing Library.

### Wagtail Models

See `home/models.py` for full implementation of:

* `SiteSettings` (Snippet)
* `HomePage`, `StandardPage`
* `EventIndexPage` / `EventPage`
* `BlogIndexPage` / `BlogPostPage`
* `LeadershipPage` + `Leader` snippet
* `GalleryPage` / `GalleryItem`

License
-------

MIT © 2024 Fayette County Republican Party
