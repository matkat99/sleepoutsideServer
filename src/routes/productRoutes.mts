import {Router } from "express";
import { getAllProducts, getProductById } from "../models/productModel.mts";
const router: Router = Router();

// GET /products/
router.get("/", async (req, res) => {
  console.log(req.headers, req.body);
const products = await getAllProducts();
res.setHeader('Content-Type', 'application/json');
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

export default router; // Export the router to use it in the main file
