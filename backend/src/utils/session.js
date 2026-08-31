import crypto from "crypto";

export function generateSessionToken() {
  return crypto.randomBytes(48).toString("hex");
}

export function hashSessionToken(token) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

export function getSessionExpiration() {
  const expiration = new Date();

  expiration.setDate(expiration.getDate() + 7);

  return expiration;
}