import { createServer } from "nice-grpc";
import { HealthDefinition, HealthServiceImpl } from "nice-grpc-server-health";
import {
  ServerReflectionService,
  ServerReflection,
} from "nice-grpc-server-reflection";
import Logger from "pino";
import * as fs from "node:fs/promises";
import path from "node:path";

import { UserServiceDefinition } from "protos/node/review/services/user_service";
import { ReviewServiceDefinition } from "protos/node/review/services/review_service";
import { AlbumServiceDefinition } from "protos/node/review/services/album_service";
import { userServiceImpl } from "./modules/user/user-service";

const logger = Logger();
const server = createServer();

server.add(UserServiceDefinition, userServiceImpl);

// library services

// Add this definition in Postman to test the health check
// https://raw.githubusercontent.com/grpc/grpc/refs/heads/master/src/proto/grpc/health/v1/health.proto
server.add(HealthDefinition, HealthServiceImpl());
server.add(
  ServerReflectionService,
  ServerReflection(
    await fs.readFile(
      path.join(
        "node_modules",
        "protos",
        "node",
        "review",
        "descriptors.binpb",
      ),
    ),
    [
      UserServiceDefinition.fullName,
      ReviewServiceDefinition.fullName,
      AlbumServiceDefinition.fullName,
    ],
  ),
);

await server.listen("0.0.0.0:5081");
logger.info("Server started on port 5081");
