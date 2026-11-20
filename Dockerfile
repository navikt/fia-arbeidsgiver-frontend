FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim@sha256:6eee8b7df01e46bf404ffedbdb0d3d43117245c388dd011f8b7e6520d9abd4e4

ENV PORT=3000 \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

COPY --chown=node:node .next/standalone ./
COPY --chown=node:node .next/static ./.next/static

EXPOSE 3000

CMD ["server.js"]