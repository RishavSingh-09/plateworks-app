# ---------- build stage: install deps and build the admin panel ---------
FROM node:20-bookworm-slim AS build
RUN apt-get update \
 && apt-get install -y --no-install-recommends build-essential python3 ca-certificates \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Dummy values, only so Strapi can load its config during the build.
# Real secrets are passed at runtime and are NOT stored in the image.
ENV APP_KEYS=build1,build2,build3,build4 \
    API_TOKEN_SALT=build \
    ADMIN_JWT_SECRET=build \
    TRANSFER_TOKEN_SALT=build \
    JWT_SECRET=build
ENV NODE_ENV=production
RUN npm run build
 
# ---------- runtime stage: small final image, runs as non-root ---------
FROM node:20-bookworm-slim AS runtime
ENV NODE_ENV=production HOST=0.0.0.0 PORT=1337
WORKDIR /opt/app
COPY --from=build --chown=1000:1000 /opt/app ./
RUN mkdir -p public/uploads .tmp && chown -R 1000:1000 public .tmp
USER 1000
EXPOSE 1337
HEALTHCHECK --interval=30s --timeout=5s --start-period=90s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:1337/_health') \
    .then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "node_modules/@strapi/strapi/bin/strapi.js", "start"]
