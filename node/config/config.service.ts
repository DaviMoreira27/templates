import dotenv from "dotenv";
import { VALID_ENVIRONMENTS, type Environments } from "./config.interface.ts";
import { ConfigError } from "../errors/default.errors.ts";
import ErrorHandler from "../errors/errors.service.ts";

dotenv.config();

export default class ConfigService {
  static getEnvironment(): Environments {
    const env = process.env["NODE_ENV"] ?? "development";
    return VALID_ENVIRONMENTS.includes(env as Environments)
      ? (env as Environments)
      : "development";
  }

  static getDatabaseUrl(): string {
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
}
