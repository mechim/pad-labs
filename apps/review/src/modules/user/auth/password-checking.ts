import * as crypto from "node:crypto";
import { promisify } from "node:util";

const pbkdf2 = promisify(crypto.pbkdf2);

// Get this from .env eventually
const privateKey = "secret";

export const hashPassword = async (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashBytes = await pbkdf2(password, salt, 1000, 64, "sha512");
  const hash = hashBytes.toString("hex");

  return {
    salt,
    hash,
  };
};

export const verifyPassword = async (
  password: string,
  hash: string,
  salt: string,
) => {
  const hashBytes = await pbkdf2(password, salt, 1000, 64, "sha512");

  return hash === hashBytes.toString("hex");
};
