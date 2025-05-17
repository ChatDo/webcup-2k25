import fastify from "fastify"
import fastifyStatic from "@fastify/static"
import path from "node:path"
import * as repl from "node:repl";

declare const PhusionPassenger: any
const server = fastify({logger: true,})
const prefix = '/editor'

server.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: "editor"
})

server.post(prefix + '/create-page', (request, reply) => {
    reply.send(request.body);
})

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

