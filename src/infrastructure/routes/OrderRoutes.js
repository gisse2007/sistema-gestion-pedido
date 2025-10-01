import { Router } from "express";
import orderController from "../controllers/orderController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", verifyToken, (req, res) => orderController.create(req, res));

router.get("/", verifyToken, (req, res) => orderController.getAll(req, res));

router.get("/:id", verifyToken, (req, res) => orderController.getById(req, res));

router.put("/:id", verifyToken, isAdmin, (req, res) => orderController.updateById(req, res));

router.delete("/:id", verifyToken, isAdmin, (req, res) => orderController.deleteById(req, res));

export default router;
