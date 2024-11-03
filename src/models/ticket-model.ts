import { model, Schema } from "mongoose";


export interface ITicket {
    ticket_id?: String,
    description?: String,
    category?: 'hr_request' | 'incident' | 'trouble' | 'change_order' | 'change_request' | 'job_order'
    priority?: 'low' | 'medium' | 'high' | 'critical'
    status?: 'open' | 'in_progress' | 'on_hold' | 'cancelled' | 'closed'
    department?: 'it' | 'hr' | 'finance' | 'creative' | 'marketing',
    user?: String
}

const TicketSchema = new Schema<ITicket>({
    ticket_id: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        enum: ['hr_request', 'incident', 'trouble', 'change_order', 'change_request', 'job_order'],
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'in_progress', 'on_hold', 'cancelled', 'closed'],
        required: true
    },
    department: {
        type: String,
        enum: ['it', 'hr', 'finance', 'creative', 'marketing'],
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

const TicketModel = model('ticket', TicketSchema)

export default TicketModel