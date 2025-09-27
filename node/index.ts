import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { HttpError } from "./errors/app.errors.ts";
import { UnknowInternalError } from "./errors/default.errors.ts";
import * as ErroHandler from "./errors/errors.service.ts";
import * as ConfigService from "./config/config.service.ts";
import FizzBuzzRouter from "./fizz-buzz/fizz-buzz.router.ts";

const app = new Hono().basePath("/api");

app.use(
  logger((str, ...rest) => {
    const now = new Date().toLocaleString();
    console.log(`[${now}] ${str}`, ...rest);
  }),
);

app.onError((err, c) => {
  console.error("Global error handler:", err);

  if (!(err instanceof HttpError)) {
    const errorMessage = err instanceof Error ? err.message : "Not details";
    const defaultError = new UnknowInternalError(
      undefined,
      undefined,
      ErroHandler.handleServiceFailure("internal", {
        message: errorMessage,
      }),
    );

    return c.json(
      defaultError.toJSON({ environment: ConfigService.getEnvironment() }),
      500,
    );
  }

  if (err.config?.redirect) {
    err.config.redirect.searchParams.append("error", err.code);
    return c.redirect(err.config.redirect);
  }

  return c.json(
    err.toJSON({ environment: ConfigService.getEnvironment() }),
    err.httpCode as ContentfulStatusCode,
  );
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/fizz-buzz", FizzBuzzRouter);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

export default app;
