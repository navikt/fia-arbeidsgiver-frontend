FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim@sha256:3e444367be393366d86a1ac5ec9d41ed22cf90c319d20e65e85e9ece44a98571

ENV PORT=3000 \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

COPY --chown=node:node .next/standalone ./
COPY --chown=node:node .next/static ./.next/static

EXPOSE 3000

CMD ["server.js"]