import express from "express";
import authRoutes from "../infrastructure/routes/AuthRoutes.js";
import productRoutes from "../infrastructure/routes/ProductRoutes.js";
import orderRoutes from "../infrastructure/routes/OrderRoutes.js";  

const app = express();

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

export default app;
