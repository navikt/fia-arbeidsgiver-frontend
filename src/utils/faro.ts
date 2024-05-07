import {
  Faro,
  getWebInstrumentations,
  initializeFaro,
  LogLevel,
} from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";
import { configureLogger } from "@navikt/next-logger";
import { getFaroEnv } from "./faroEnv";

const ignoredUrlsGlobal = [
  // TODO: legg til URL-ene til andre endepunkt/hosts som ikke skal instrumentaliseres
  // (det går ikke an å bruke window.location.hostname med SSR)
  //new RegExp(`^(?!.*${window.location.hostname})`),
  /antall-deltakere$/,
  /antall-svar$/,
  /antall-fullfort$/,
];

let faro: Faro | null = null;

export function initInstrumentation(): void {
  if (typeof window === "undefined" || faro !== null) return;

  getFaroEnv().then((envValue) => {
    if (envValue.FARO_URL !== undefined) {
      const fro = getFaro(envValue.FARO_URL);
      configureLogger({
        onLog: (log) =>
          fro.api.pushLog(log.messages, {
            level: pinoLevelToFaroLevel(log.level.label),
          }),
      });
    } else {
      console.error("FARO_URL is not defined");
    }
  });
}

export function getFaro(faroUrl: string): Faro {
  if (faro != null) return faro;
  faro = initializeFaro({
    url: faroUrl,
    app: {
      name: "fia-arbeidsgiver-frontend",
    },
    ignoreUrls: ignoredUrlsGlobal,
    instrumentations: [
      ...getWebInstrumentations({
        captureConsole: false,
      }),
      new TracingInstrumentation(),
    ],
  });
  return faro;
}

export function pinoLevelToFaroLevel(pinoLevel: string): LogLevel {
  switch (pinoLevel) {
    case "trace":
      return LogLevel.TRACE;
    case "debug":
      return LogLevel.DEBUG;
    case "info":
      return LogLevel.INFO;
    case "warn":
      return LogLevel.WARN;
    case "error":
      return LogLevel.ERROR;
    default:
      throw new Error(`Unknown level: ${pinoLevel}`);
  }
}
