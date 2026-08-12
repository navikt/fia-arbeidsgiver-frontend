FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim@sha256:127a4d4b0f7ea36c4036776f426fcfe2624f0c8a1ef29e396e6c450b1953ef78

ENV PORT=3000 \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

COPY --chown=node:node .next/standalone ./
COPY --chown=node:node .next/static ./.next/static

EXPOSE 3000

CMD ["server.js"]