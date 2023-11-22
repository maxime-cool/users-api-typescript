import { FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "interfaces";
import type * as s from 'zapatos/schema'
import * as db from 'zapatos/db'
import pool from '../db/pgPool'

/* const staticUsers: IUser[] = [
    {
        id: 1,
        name: 'Joyce Byers'
      },
      {
        id: 2,
        name: 'Jimmi Hopper'
      },
      {
        id: 3,
        name: 'Mike Wheeler'
      },
      {
        id: 4,
        name: 'Dustin Henderson'
      },
      {
        id: 5,
        name: 'Lucas Sinclair'
      }
]

export const listUsers = async (request: FastifyRequest, reply: FastifyReply) => {

    Promise.resolve(staticUsers)
    .then((users) => {
        reply.send({ data: users })
    })
}

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {

    const userId = request.params['userId'];
    for (var user of staticUsers) {
        if (user.id == userId) {
            Promise.resolve(user)
            .then((user) => {
                reply.send({ data: user })
            })
        }
    }
}

export const addUser = async (request: FastifyRequest, reply: FastifyReply) => {

    const userName = request.body['name'];
    
    const newUser = <IUser>({
        id: staticUsers.length+1,
        name: userName,
    })
    
    Promise.resolve(staticUsers.push(newUser))
    .then(() => { reply.send({ data: { newUser }})})

}

export const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {

    const userId = request.params['userId'];
    for (var user of staticUsers) {
        if (user.id == userId) {

            Object.keys(request.body).forEach((key) => {
                user[key] = request.body[key]
            })

            Promise.resolve(user)
            .then((user) => {
                reply.send({ data: user })
            })
        }
    }
} */

export const listUsers = 
  async (request: FastifyRequest, reply: FastifyReply) => {
    return db.sql<s.users.SQL, s.users.Selectable[]>`SELECT * FROM ${"users"}`
    .run(pool)
    //.then((users) => ({ data: users }))
    .then((users) => reply.send({ data: users }))
}

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {

    const userId = request.params['userId'];
    return db.sql<s.users.SQL, s.users.Selectable[]>`SELECT * FROM ${"users"} WHERE ${"user_id"}=${db.param(userId)}`
    .run(pool)
    .then((users) => ({ data: users }))
}

export const addUser = async (request: FastifyRequest, reply: FastifyReply) => {

    const userName = request.body['name'];
    //const userCount = db.sql`SELECT COUNT(*) FROM ${"users"}`
    //console.log(userCount)
    const id = listUsers.length + 1 
    return db.sql<s.users.SQL, s.users.Selectable[]>`INSERT INTO ${"users"} VALUES (${db.param(id)}, ${db.param(userName)})`
    .run(pool)
    .then((users) => reply.send({ data: users }))
}

/* export const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {

    const userId = request.params['userId'];

} */