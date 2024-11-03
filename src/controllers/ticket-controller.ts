import { IReply } from "../models/reply"
import TicketModel, { ITicket } from "../models/ticket-model"
import { tryCatch } from "../utils/error-handler"
import { getNextSequenceValue } from "../utils/ticket-helper"

class TicketController {
    createTicket = tryCatch(async (request, reply) => {
        const payload = request.body as ITicket
        const ticket_id = await getNextSequenceValue('ticket')

        await new TicketModel({
            ticket_id,
            ...payload
        }).save()

        return reply.status(200).send({
            success: true,
            message: 'Ticket created.'
        } as IReply)
    })

    getTickets = tryCatch(async (request, reply) => {
        const limit = Number((request.query as any).limit) || 10
        const page = Number((request.query as any).page) || 1
        const status = (request.query as any).status
        const skip = (page - 1) * limit
        const find: any = {}

        if (status && status !== 'all') {
            find.status = status
        }

        const ticketCountPromise = TicketModel.countDocuments(find)
        const ticketsPromise = TicketModel
            .find(find)
            .limit(limit)
            .skip(skip)

        const [tickets, ticketCount] = await Promise.all([ticketsPromise, ticketCountPromise])
        return reply.status(200).send({
            success: true,
            data: tickets,
            current_page: page,
            total_page: Math.ceil(ticketCount / limit)
        } as IReply<ITicket[]>)
    })

    updateTicket = tryCatch(async (request, reply) => {
        const { ticket_id } = request.params as any
        const payload = request.body as ITicket

        await TicketModel.updateOne({ _id: ticket_id }, payload)

        return reply.status(200).send({
            success: true,
            message: "Ticket updated."
        } as IReply)
    })

    deleteTicket = tryCatch(async (request, reply) => {
        const { ticket_id } = request.params as any
        await TicketModel.deleteOne({ _id: ticket_id })

        return reply.status(200).send({
            success: true,
            message: "Ticket deleted."
        } as IReply)
    })
}

export default new TicketController()