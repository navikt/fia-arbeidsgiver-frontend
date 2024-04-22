import {
  Faro,
  getWebInstrumentations,
  initializeFaro,
  LogLevel,
} from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";
import { configureLogger } from "@navikt/next-logger";

let faro: Faro | null = null;
export function initInstrumentation(): void {
  if (typeof window === "undefined" || faro !== null) return;

  const fro = getFaro();

  configureLogger({
    onLog: (log) =>
      fro.api.pushLog(log.messages, {
        level: pinoLevelToFaroLevel(log.level.label),
      }),
  });
}

export function getFaro(): Faro {
  if (faro != null) return faro;
  faro = initializeFaro({
    url: process.env.NEXT_PUBLIC_TELEMETRY_URL,
    app: {
      name: "fia-arbeidsgiver-frontend",
    },
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