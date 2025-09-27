import type { MiddlewareHandler } from "hono";
import { z } from "zod";
import { InvalidRequestParameterError } from "../errors/request.errors.ts";
import { HttpError } from "../errors/app.errors.ts";

export const randomQuerySchema = z.object({
  random: z.string(),
});

interface randomQueryVariable {
  validatedParams: z.infer<typeof randomQuerySchema>;
}

export const validateRandomQueryParam: MiddlewareHandler<{
  Variables: randomQueryVariable;
}> = async (c, next) => {
  try {
    const params = { random: c.req.query("random") };
    const parsed = randomQuerySchema.safeParse(params);

    if (!parsed.success) {
      console.error("Validation failed:", z.flattenError(parsed.error));
      throw new InvalidRequestParameterError<z.infer<typeof randomQuerySchema>>(
        undefined,
        z.flattenError(parsed.error),
      );
    }

    c.set("validatedParams", parsed.data);

    await next();
  } catch (error) {
    console.error("Error validating or parsing request", error);
    if (error instanceof HttpError) {
      throw error;
    }

    throw new InvalidRequestParameterError<z.infer<typeof randomQuerySchema>>();
  }
};
