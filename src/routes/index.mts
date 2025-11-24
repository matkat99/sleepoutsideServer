import { Router } from "express";
import productRoutes from "./product.routes.mts";
import swaggerRoutes from "./swaggerRoutes.mts";

const router:Router = Router();

// The home page route
router.get("/", (req, res) => {
  res.json({ title: "API V1" });
});
// load products routes
router.use("/products", productRoutes);


// Load Swagger UI
router.use(swaggerRoutes);
export default router;
