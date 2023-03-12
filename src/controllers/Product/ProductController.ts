import { randomUUID } from 'crypto';
import { FastifyRequest, FastifyReply } from 'fastify';
import { prismaClient } from '../../database/PrismaClient';

export class ProductController { 

  getAll = async (request: FastifyRequest, reply: FastifyReply) => {

    const products = await prismaClient.product.findMany()

    return reply.status(200).send(products)
  }

  getOne = async (request: FastifyRequest, reply: FastifyReply) => {

    const { id }: any = request.params;

    const product = await prismaClient.product.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        bar_code: true,
        created_at: true,
        ProductCategory: {
          select: {
            category: true
          }
        }
      }
    })

    return reply.status(200).send(product)
  }

  create = async (request: FastifyRequest, reply: FastifyReply) => {

    const { name, bar_code, price }: any = request.body;

    const product = await prismaClient.product.create({
      data: {
        name,
        bar_code: bar_code || randomUUID(),
        price
      }
    })

    return reply.status(201).send(product)
  }

  createWithCategory = async (request: FastifyRequest, reply: FastifyReply) => {

    const { name, bar_code, price, category_id }: any = request.body;

    const product = await prismaClient.productCategory.create({
      data: {
        product: {
          create: {
            name,
            bar_code: bar_code || randomUUID(),
            price
          }
        },
        category: {
          connect: { 
            id: category_id
          }
        }
      }
    })

    return reply.status(201).send(product)
  }


}