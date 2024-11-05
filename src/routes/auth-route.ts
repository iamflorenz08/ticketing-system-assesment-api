import { FastifyInstance } from "fastify";
import AuthController from "../controllers/auth-controller";

export const AuthRoute = async (fastify: FastifyInstance, options: any) => {
    fastify.post('/sign-up', AuthController.createUser)
    fastify.post('/sign-in', AuthController.signInUser)
}