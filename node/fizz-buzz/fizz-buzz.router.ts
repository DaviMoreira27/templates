import { Hono } from 'hono';
import { getDbConnection } from '../config/database.config.ts';
import { validateCreateDBParam } from './fizz-buzz.middleware.ts';
import { fizzBuzzTable } from './fizz-buzz.table.ts';

const app = new Hono();

app.get('/', validateCreateDBParam, async (c) => {
  const dbConnection = getDbConnection();

  const param = c.get('validatedParams');

  if (param.create_db) {
    const [created] = await dbConnection
      .insert(fizzBuzzTable)
      .values({
        fizz: 'fizz',
        buzz: `buzz`,
      })
      .returning();

    return c.json(created);
  }

  const users = await dbConnection.select().from(fizzBuzzTable);
  return c.json(users);
});

export default app;
