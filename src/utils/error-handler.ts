import { FastifyReply, FastifyRequest } from "fastify";
import { IReply } from "../models/reply";
import TicketingSytemError from "./custom-error";


export const tryCatch = (callback: (request: FastifyRequest, reply: FastifyReply) => void) =>
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            return await callback(request, reply)
        } catch (error: any) {
            console.log(error.message)
            if (error instanceof TicketingSytemError) {
                return reply.status(error.status).send({
                    success: false,
                    message: error.message
                } as IReply)
            }

            return reply.status(500).send({
                success: false,
                message: 'Server error.'
            } as IReply)
        }
    }