import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "auth_token");

  if (!token) {
    throw createError({ statusCode: 401, message: "Не авторизован" });
  }

  let payload: { id: number; email: string };

  try {
    const { payload: decoded } = await jwtVerify(token, secret);
    payload = decoded as typeof payload;
  } catch {
    throw createError({ statusCode: 401, message: "Токен недействителен" });
  }

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, payload.id),
    columns: { password: false },
  });

  if (!user) {
    throw createError({ statusCode: 404, message: "Пользователь не найден" });
  }

  return user;
});
