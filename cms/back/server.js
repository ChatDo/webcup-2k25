"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const static_1 = __importDefault(require("@fastify/static"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const cuid_1 = __importDefault(require("cuid"));
// @ts-ignore
const fastify_fingerprint_1 = __importDefault(require("fastify-fingerprint"));
const server = (0, fastify_1.default)({ logger: true, });
const prefix = '/editor';
server.register(static_1.default, {
    root: node_path_1.default.join(__dirname, 'public'),
    prefix: "/editor"
});
server.register(fastify_fingerprint_1.default);
server.post(prefix + '/page', (request, reply) => {
    const uid = (0, cuid_1.default)();
    const pageContent = request.body;
    const filePath = node_path_1.default.join(__dirname, "..", "..", "..", "public_html", "page", `${uid}.html`);
    node_fs_1.default.writeFileSync(filePath, pageContent.html);
    reply.send({
        status: "success",
        message: "Page created successfully",
        uid: uid
    });
});
server.get(prefix + "/fingerprint", (request, reply) => {
    // @ts-ignore
    reply.send(`ClientID: ${request.fingerprint}`);
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
