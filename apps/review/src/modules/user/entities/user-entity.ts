import type { ObjectId } from "mongodb";

export type UserEntity = {
  email: string;
  username: string;
  passwordHash: string;
  passwordSalt: string;
};

export type UserEntityWithId = UserEntity & {
  _id: ObjectId;
};
