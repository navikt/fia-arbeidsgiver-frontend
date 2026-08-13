FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:23-slim@sha256:96431fe06075e9a31c3d748767c6a882ad1be1b535bef627bd4d240b171b1945

ENV PORT=3000 \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

COPY --chown=node:node .next/standalone ./
COPY --chown=node:node .next/static ./.next/static

EXPOSE 3000

CMD ["server.js"]