import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION as string;

export default async function createToken(userId: string) {
  const token = new jose.SignJWT({ userId })
    .setExpirationTime(JWT_EXPIRATION)
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(JWT_SECRET));
  return token;
}
