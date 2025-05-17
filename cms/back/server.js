"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const static_1 = __importDefault(require("@fastify/static"));
const node_path_1 = __importDefault(require("node:path"));
const server = (0, fastify_1.default)({ logger: true, });
const prefix = '/editor';
server.register(static_1.default, {
    root: node_path_1.default.join(__dirname, 'public')
});
server.get(prefix + '/', (request, reply) => {
    reply.send({ hello: 'world' });
});
const callback = (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
};
if (typeof (PhusionPassenger) !== 'undefined')
    server.listen({ path: "passenger", host: "127.0.0.1" }, callback);
else
    server.listen({ port: 3000 }, callback);
