import fastify from "fastify"
import fastifyStatic from "@fastify/static"
import path from "node:path"

const server = fastify()

server.register(fastifyStatic, {
    root: path.join(__dirname, 'public')
})

// Declare a route
server.get('/', (request, reply) => {
    reply.send({hello: 'world'})
})

// Run the server!
server.listen({port: 3000}, (err, address) => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    }
    console.log(`Server listening on ${address}`)
})
