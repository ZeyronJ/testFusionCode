import { Router } from 'express';
import {
  createProduct,
  getProductById,
  getProducts,
  updateProductById,
} from '../controllers/productos.controllers.js';

const routerProducts = Router();

routerProducts.get('/', getProducts);
routerProducts.get('/:id', getProductById);
routerProducts.post('/', createProduct);
routerProducts.put('/:id', updateProductById);

export default routerProducts;
