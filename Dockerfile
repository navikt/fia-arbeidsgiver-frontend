FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim@sha256:807930713aaecdcfb2fb5fdf7e0692eddb354248c85bbe55fe39a50955114c8c

ENV PORT=3000 \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

COPY --chown=node:node .next/standalone ./
COPY --chown=node:node .next/static ./.next/static

EXPOSE 3000

CMD ["server.js"]