import { FastifyRequest, FastifyReply } from 'fastify';
import { prismaClient } from '../../database/PrismaClient';

export class CategoryController { 
  getAll = async (request: FastifyRequest, reply: FastifyReply) => {

    const categories = await prismaClient.category.findMany()

    return reply.status(200).send(categories)
  }

  create = async (request: FastifyRequest, reply: FastifyReply) =>{

    const { name }: any = request.body;

    const product = await prismaClient.category.create({
      data: {
        name
      }
    })

    return reply.status(201).send(product)
  }
}