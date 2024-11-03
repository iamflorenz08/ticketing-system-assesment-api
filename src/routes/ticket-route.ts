import { FastifyInstance } from "fastify";
import TicketController from "../controllers/ticket-controller";

export const TicketRoute = async (fastify: FastifyInstance) => {
    fastify.post('/', TicketController.createTicket)
    fastify.get('/', TicketController.getTickets)
    fastify.put('/:ticket_id', TicketController.updateTicket)
    fastify.delete('/:ticket_id', TicketController.deleteTicket)
}