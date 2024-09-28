import { ServerError, Status } from "nice-grpc";
import { UserServiceImplementation } from "protos/node/review/services/user_service";

import { db } from "~/db/mongo";
import { hashPassword, verifyPassword } from "./auth/password-checking";
import { UserEntity } from "./entities/user-entity";

const userCollection = db.collection<UserEntity>("users");

export const userServiceImpl: UserServiceImplementation = {
  async createUser(request) {
    const userExists = await userCollection.findOne({
      $or: [{ email: request.email }, { username: request.username }],
    });
    if (userExists) {
      throw new ServerError(
        Status.ALREADY_EXISTS,
        "User with same username or email already exists",
      );
    }

    const { hash, salt } = await hashPassword(request.password);
    await userCollection.insertOne({
      email: request.email,
      username: request.username,
      passwordHash: hash,
      passwordSalt: salt,
    });

    return {
      accessToken: request.username,
    };
  },

  async getUser(request) {
    const user = await userCollection.findOne({
      username: request.username,
    });
    if (!user) {
      throw new ServerError(Status.NOT_FOUND, "User not found");
    }

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
      },
    };
  },

  async loginUser(request) {
    const user = await userCollection.findOne({
      username: request.username,
    });
    if (!user) {
      throw new ServerError(Status.NOT_FOUND, "User not found");
    }
    const isPasswordCorrect = await verifyPassword(
      request.password,
      user.passwordHash,
      user.passwordSalt,
    );

    if (!isPasswordCorrect) {
      throw new ServerError(Status.INVALID_ARGUMENT, "Invalid password");
    }

    return {
      accessToken: request.username,
    };
  },
};
