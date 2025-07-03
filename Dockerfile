# -----------------------------
# Build Stage (Node for React)
# -----------------------------
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY frontend ./
RUN pnpm build

# -----------------------------
# Python Stage (Django/Wagtail)
# -----------------------------
FROM python:3.12-slim AS python-base
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# deps
RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# copy project
COPY . .

# copy built frontend assets into Django static dir
COPY --from=frontend-build /app/frontend/dist /app/static/frontend

# collectstatic at build time
RUN python manage.py collectstatic --noinput

EXPOSE 8000
CMD gunicorn fayette_gop.wsgi:application --bind 0.0.0.0:8000 --workers 4