import { drizzle } from "drizzle-orm/node-postgres";
import * as configService from "../config/config.service.ts";

export function getDbConnection() {
  const db = drizzle(configService.getDatabaseUrl());
  return db;
}
