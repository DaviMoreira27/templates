import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const fizzBuzzTable = pgTable("fizz-buzz", {
  id: text().primaryKey().$defaultFn(crypto.randomUUID),
  fizz: varchar({ length: 255 }).notNull(),
  buzz: varchar({ length: 255 }).notNull(),
});
