/**
 * Generic error reporting utility.
 * Replace the body of `reportError` with your own error tracking
 * service (e.g. Sentry, Datadog) when you're ready.
 */
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  // TODO: integrate your error tracking service here
  console.error("[VYROX error]", error, context);
}
