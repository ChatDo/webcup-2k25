import fastify from "fastify"
import fastifyStatic from "@fastify/static"
import path from "node:path"

declare const PhusionPassenger: any
const server = fastify({ logger: true })

server.register(fastifyStatic, {
    root: path.join(__dirname, 'public')
})

server.get('/', (request, reply) => {
    reply.send({hello: 'world'})
})

if (typeof(PhusionPassenger) !== 'undefined') {
    server.listen({ path: "passenger", host: "127.0.0.1"}, (err, address) => {
        if (err) {
            server.log.error(err)
            process.exit(1)
        }
        console.log(`Server listening on ${address}`)
    })
} else {
    server.listen({port: 3000}, (err, address) => {
        if (err) {
            server.log.error(err)
            process.exit(1)
        }
        console.log(`Server listening on ${address}`)
    })
}

