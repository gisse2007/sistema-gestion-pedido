import {Router} from "express";
import productController from "../controllers/productController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", (req, res) => productController.getAll(req, res));
router.get("/:id", (req, res) => productController.getById(req, res));

router.post("/", verifyToken, isAdmin, (req, res) => productController.create(req, res));
router.put("/:id", verifyToken, isAdmin, (req, res) => productController.updateById(req, res));
router.delete("/:id", verifyToken, isAdmin, (req, res) => productController.deleteById(req, res));

export default router;
