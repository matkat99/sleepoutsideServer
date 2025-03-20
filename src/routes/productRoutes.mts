import {Router } from "express";
import { getAllProducts, getProductById } from "../models/productModel.mts";
import EntityNotFoundError from "../errors/EntityNotFoundError.mts";
const router: Router = Router();

// GET /products/
router.get("/", async (req, res, next) => {
  console.log(req.headers, req.body);
  const products = await getAllProducts();
  if (!products?.length) {
    // This is an example you can refer to about how to handle errors in our routes
    // If you check the middleware folder you will see a general error handler that will get called automatically when we throw like this
   throw new EntityNotFoundError({message : 'Products Not Found',code: 'ERR_NF',
    statusCode : 404})
  }

  res.status(200).json(products);
});

// GET /products/:id
router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const product = await getProductById(id);
    if (!product) {
      res.status(404).json({error:'Product not found'});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /products/:id
router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const product = await getProductById(id);
    if (!product) {
      res.status(404).json({error:'Product not found'});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; // Export the router to use it in the main file
