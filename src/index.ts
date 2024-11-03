import 'dotenv/config'
import Fastify from 'fastify'
import mongoose from 'mongoose'
import { TicketRoute } from './routes/ticket-route'
import fastifyCors from '@fastify/cors'
const fastify = Fastify()
const port = Number(process.env.PORT) || 5001
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;
const MONGODB_URI = process.env.MDB!
const FE_URL = process.env.FE_URL || 'http://localhost:3000'

mongoose.connect(MONGODB_URI).then(() => console.log('DB Connected')).catch(err => console.log(err))

fastify
    .register(fastifyCors, {
        origin: [FE_URL]
    })
    .get('/', async (request, reply) => {
        return reply.status(200).send("Welcome to TAS Api!")
    })
    .register(TicketRoute, { prefix: '/api/v1/tickets' })

fastify.listen({ port, host }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})