import * as z from "zod";
import { hash } from "argon2";
import { users } from "../../db/schema";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: "Неверные данные" });
  }

  const { email, password } = parsed.data;

  const existing = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (existing) {
    throw createError({ statusCode: 409, message: "Email уже занят" });
  }

  const hashedPassword = await hash(password);

  await db.insert(users).values({
    email,
    password: hashedPassword,
  });

  return { success: true };
});
