import { FastifyRequest, FastifyReply } from 'fastify';
import { prismaClient } from '../../database/PrismaClient';

export class ProductCategoryController { 
  getAll = async (request: FastifyRequest, reply: FastifyReply) => {

    const productsCategories = await prismaClient.productCategory.findMany({
      include: {
        category: true,
        product: true
      }
    })

    return reply.status(200).send(productsCategories)
  }

  create = async (request: FastifyRequest, reply: FastifyReply) => {

    const { product_id, category_id }: any = request.body;

    const productCategory = await prismaClient.productCategory.create({
      data: {
        product_id, 
        category_id
      }
    })

    return reply.status(201).send(productCategory)
  }
}