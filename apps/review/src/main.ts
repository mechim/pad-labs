import { createServer } from "nice-grpc";
import { HealthDefinition, HealthServiceImpl } from "nice-grpc-server-health";
import {
  ServerReflectionService,
  ServerReflection,
} from "nice-grpc-server-reflection";
import * as fs from "node:fs";
import path from "node:path";

import { UserServiceDefinition } from "protos/node/services/user_service";
import { userServiceImpl } from "./modules/user-service";

const server = createServer();

server.add(UserServiceDefinition, userServiceImpl);

// library services
server.add(HealthDefinition, HealthServiceImpl());
server.add(
  ServerReflectionService,
  ServerReflection(
    /* WIP */ undefined as any,
    // fs.readFileSync(path.join("path", "to", "protoset.bin")),
    [UserServiceDefinition.fullName],
  ),
);

await server.listen("0.0.0.0:5001");
