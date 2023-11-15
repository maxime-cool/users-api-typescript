import { FastifyInstance } from "fastify/types/instance";
import * as controllers from '../controllers'
import { userCreateSchema, userUpdateSchema } from "../schemas/user.schema";

async function userRouter(fastify: FastifyInstance) {

    fastify.route({
        method: 'GET',
        url: '/',
        handler: controllers.listUsers
    })

    fastify.route({
        method: 'GET',  
        url: '/:userId',
        handler: controllers.getUser
    })

    fastify.route({
        method: 'POST',
        url: '/',
        schema: userCreateSchema,
        handler: controllers.addUser
    })  

    fastify.route({
        method: 'PUT',
        url: '/:userId',
        schema: userUpdateSchema,
        handler: controllers.updateUser
    })
}

export default userRouter