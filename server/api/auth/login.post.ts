import { z } from 'zod'
import { verify } from 'argon2'
import { SignJWT } from 'jose'
import { users } from '../../db/schema'

const schema = z.object({
  email: z.string().email(),
  password: z.string()
})

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: 'Неверные данные' })
  }

  const { email, password } = parsed.data

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email)
  })

  if (!user) {
    throw createError({ statusCode: 401, message: 'Неверный email или пароль' })
  }

  const isValid = await verify(user.password, password)
  if (!isValid) {
    throw createError({ statusCode: 401, message: 'Неверный email или пароль' })
  }

  const token = await new SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax'
  })

  return { success: true }
})