import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://2fd8d17fb69c2be05052ce2954c606f6@o4510997670002688.ingest.de.sentry.io/4511738038452304",
  enabled: process.env.NODE_ENV === "production",
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 0,
  sendDefaultPii: false,
});
