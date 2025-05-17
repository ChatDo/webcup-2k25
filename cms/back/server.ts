import fastify from "fastify"
import fastifyStatic from "@fastify/static"
import path from "node:path"
import fs from "node:fs"
import cuid from "cuid";
// @ts-ignore
import fingerprint from "fastify-fingerprint"

declare const PhusionPassenger: any
const server = fastify({logger: true,})
const prefix = '/editor'

server.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: "/editor"
})
server.register(fingerprint as any);


server.post(prefix + '/page', (request, reply) => {
    const uid = cuid();
    const pageContent = request.body as { html: string, elements: string };
    const filePath = path.join(__dirname, "..", "..", "..", "public_html", "page", `${uid}.html`);
    fs.writeFileSync(filePath, pageContent.html);
    reply.send({
        status: "success",
        message: "Page created successfully",
        uid: uid
    })
})

server.get(prefix + "/fingerprint", (request, reply) => {
    // @ts-ignore
    reply.send(`ClientID: ${request.fingerprint}`);
});

const callback: (err: Error | null, address: string) => void = (err, address) => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    }
    console.log(`Server listening on ${address}`)
}

if (typeof (PhusionPassenger) !== 'undefined')
    server.listen({path: "passenger", host: "127.0.0.1"}, callback)
else
    server.listen({port: 3000}, callback)

