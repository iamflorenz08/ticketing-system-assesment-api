import { IReply } from "../models/reply"
import UserModel, { IUser } from "../models/user"
import TicketingSytemError from "../utils/custom-error"
import { tryCatch } from "../utils/error-handler"
import bcrypt from 'bcrypt'

class AuthController {
    private saltRounds = 5
    createUser = tryCatch(async (request, reply) => {
        const payload = request.body as IUser

        const user = await UserModel.findOne({ email: payload.email })
        if (user) throw new TicketingSytemError(400, "Email already existed.")

        const hashedPassword = await bcrypt.hash(payload.password!, this.saltRounds)
        await new UserModel({ ...payload, password: hashedPassword }).save()

        return reply.status(200).send({
            success: true,
            message: 'Account created.'
        } as IReply)
    })

    signInUser = tryCatch(async (request, reply) => {
        const payload = request.body as IUser
        const user = await UserModel.findOne({ email: payload.email })
        if (!user) throw new TicketingSytemError(400, "User not found.")
        const isPaswordMatch = await bcrypt.compare(payload.password!, user.password!)
        if (!isPaswordMatch) throw new TicketingSytemError(400, "Password doesn\'t match.")

        return reply.status(200).send({
            success: true,
            message: "Logged in.",
            data: user
        } as IReply)
    })
}

export default new AuthController()