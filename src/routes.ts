import { FastifyInstance, FastifyServerOptions, DoneFuncWithErrOrRes } from 'fastify';

/* CONTROLLERS */
import { ProductController } from './controllers/Product/ProductController';
import { CategoryController } from './controllers/Category/CategoryController';
import { ProductCategoryController } from './controllers/ProductCategory/ProductCategoryController';


module.exports = function (app: FastifyInstance, opts: FastifyServerOptions, done: DoneFuncWithErrOrRes) {

  const productController     = new ProductController(); 
  const categoryController    = new CategoryController(); 
  const createProductCategory = new ProductCategoryController(); 

  app.get('/', async () => {
    return 'Hello World!';
  });

  /* PRODUCT */
  app.get('/product'            , productController.getAll);
  app.get('/product/:id'        , productController.getOne);
  app.post('/product'           , productController.create);
  app.post('/product-category'  , productController.createWithCategory);
  
  /* CATEGORY */
  app.get('/category'           , categoryController.getAll);
  app.post('/category'          , categoryController.create);

  /* PRODUCT CATEGORY */
  app.get('/product_category'   , createProductCategory.getAll);
  app.post('/product_category'  , createProductCategory.create);
  
  done()
}