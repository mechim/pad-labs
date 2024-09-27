import { UserServiceImplementation } from "protos/node/services/user_service";

export const userServiceImpl: UserServiceImplementation = {
  async createUser(request) {
    return {
      accessToken: request.username,
    };
  },
  async getUser(request) {
    return {
      email: request.username,
      username: request.username,
    };
  },
  async loginUser(request) {
    return {
      accessToken: request.username,
    };
  },
};
