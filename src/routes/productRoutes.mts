import {Router } from "express";
import { getAllProducts } from "../models/productModel.mts";
const router: Router = Router();

// GET /products/
router.get("/", async (req, res) => {
  console.log(req.headers, req.body);
const products = await getAllProducts();
res.setHeader('Content-Type', 'application/json');
res.status(200).json(products);

});

export default router; // Export the router to use it in the main file
