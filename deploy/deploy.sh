#!/usr/bin/env bash
# Runs ON the app server (called by Jenkins over SSH).
# Pulls the new images, restarts the stack, checks health, rolls back if unhealthy.
set -euo pipefail
cd /opt/plateworks
 
: "${IMAGE_TAG:?IMAGE_TAG is required}"
set -a; source .env; set +a        # REGISTRY, AWS_REGION, passwords ...
export IMAGE_TAG
 
CURRENT=""
if [ -f .current_tag ]; then CURRENT="$(cat .current_tag)"; fi
 
echo ">> Logging in to ECR"
aws ecr get-login-password --region "$AWS_REGION" \
  | docker login --username AWS --password-stdin "$REGISTRY"
 
echo ">> Pulling images for build $IMAGE_TAG"
docker compose pull backend frontend
 
echo ">> Starting stack"
docker compose up -d --remove-orphans
 
healthy() {
  curl -fsS -o /dev/null http://localhost/api/health \
    && curl -fsS -o /dev/null http://localhost:1337/_health
}
 
echo ">> Waiting for the site to become healthy (up to 200s)"
for i in $(seq 1 40); do
  if healthy; then
    if [ -n "$CURRENT" ]; then echo "$CURRENT" > .previous_tag; fi
    echo "$IMAGE_TAG" > .current_tag
    echo ">> OK - build $IMAGE_TAG is live"
    exit 0
  fi
  sleep 5
done
 
echo ">> NOT healthy. Last logs:"
docker compose logs --tail=40 backend frontend || true
if [ -n "$CURRENT" ]; then
  echo ">> Rolling back to build $CURRENT"
  export IMAGE_TAG="$CURRENT"
  docker compose up -d --remove-orphans
fi
exit 1
