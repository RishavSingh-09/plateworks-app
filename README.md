# Plateworks (plain app)

Gym website: Next.js frontend + Strapi 4 CMS. No Docker, Kubernetes, Terraform or CI/CD files yet - those are the DevOps steps you add yourself.

## Requirements
- Node.js 18 or 20 (Strapi 4 does not support 21+)
- npm

## Run locally

Terminal 1 - CMS (uses a local SQLite file, no database server needed)

    cd backend
    npm install
    npm run develop        # http://localhost:1337/admin  (create your admin user on first visit)

Terminal 2 - website

    cd frontend
    npm install
    npm run dev            # http://localhost:3000

Sample plans, coaches and classes are seeded on first boot (SEED_DATA=true in backend/.env).
If the CMS is down, the website shows built-in sample data and a note at the bottom of each page says so.

## Tests

    cd backend && npm test
    cd frontend && npm test

## Config
- backend/.env          secrets, port, DB settings (copied from .env.example)
- frontend/.env.local   STRAPI_INTERNAL_URL / STRAPI_PUBLIC_URL (default http://localhost:1337)

## Left out on purpose, for your DevOps steps
- PostgreSQL: backend/config/database.js already switches when DATABASE_CLIENT=postgres (pg driver is installed)
- S3 media: add `@strapi/provider-upload-aws-s3` and an upload block in backend/config/plugins.js
- Containers: Next.js `output: 'standalone'` in frontend/next.config.js, and a /api/health route for probes
- Behind a proxy/ingress: `proxy: true` and `url` in backend/config/server.js, CSP media hosts in middlewares.js
- Dockerfiles, compose, Kubernetes, Helm, Terraform, Jenkins/GitHub Actions, monitoring
