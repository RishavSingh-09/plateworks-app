#!/usr/bin/env bash
# Manual rollback. Run on the app server: cd /opt/plateworks && ./rollback.sh
set -euo pipefail
cd /opt/plateworks
if [ ! -f .previous_tag ]; then echo "No previous version recorded."; exit 1; fi
set -a; source .env; set +a
PREV="$(cat .previous_tag)"
CUR="$(cat .current_tag)"
echo ">> Rolling back build $CUR -> $PREV"
export IMAGE_TAG="$PREV"
docker compose pull backend frontend
docker compose up -d --remove-orphans
echo "$PREV" > .current_tag
echo "$CUR" > .previous_tag
echo ">> Done. Now running build $PREV"
