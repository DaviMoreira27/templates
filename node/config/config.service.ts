import dotenv from "dotenv";
import { ConfigError } from "../errors/default.errors.ts";
import * as ErrorHandler from "../errors/errors.service.ts";
import { VALID_ENVIRONMENTS, type Environments } from "./config.interface.ts";

dotenv.config();

export function getEnvironment(): Environments {
  const env = process.env["NODE_ENV"] ?? "development";
  return VALID_ENVIRONMENTS.includes(env as Environments)
    ? (env as Environments)
    : "development";
}

export function getDatabaseUrl(): string {
  const env = process.env["DATABASE_URL"];

  if (!env) {
    throw new ConfigError(
      undefined,
      ErrorHandler.handleServiceFailure("internal", {
        message: `DB url not found`,
      }),
    );
  }

  return env;
}
