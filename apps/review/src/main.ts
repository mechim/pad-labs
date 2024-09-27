import { createServer } from "nice-grpc";
import { HealthDefinition, HealthServiceImpl } from "nice-grpc-server-health";
import {
  ServerReflectionService,
  ServerReflection,
} from "nice-grpc-server-reflection";
import * as fs from "node:fs/promises";
import path from "node:path";

import { UserServiceDefinition } from "protos/node/review/services/user_service";
import { userServiceImpl } from "./modules/user-service";

const server = createServer();

server.add(UserServiceDefinition, userServiceImpl);

// library services
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
    [UserServiceDefinition.fullName],
  ),
);

await server.listen("0.0.0.0:5001");
