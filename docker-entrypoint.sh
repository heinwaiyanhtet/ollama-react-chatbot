#!/bin/sh
set -e
cat <<EOT > /app/dist/env.js
window.ENV = {
  VITE_API_URL: "${VITE_API_URL}"
};
EOT
exec "$@"
