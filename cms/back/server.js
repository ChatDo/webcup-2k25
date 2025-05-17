"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const static_1 = __importDefault(require("@fastify/static"));
const node_path_1 = __importDefault(require("node:path"));
const server = (0, fastify_1.default)();
server.register(static_1.default, {
    root: node_path_1.default.join(__dirname, 'public')
});
// Declare a route
server.get('/', (request, reply) => {
    reply.send({ hello: 'world' });
});
// Run the server!
server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    // Server is now listening on ${address}
});
