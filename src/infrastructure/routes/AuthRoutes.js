import {Router}  from "express";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";
import authController from "../controllers/authController.js"; 

const router = Router();

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));

router.get("/", verifyToken,(req, res) => authController.getAll(req, res));
router.get("/:id", verifyToken, (req, res) => authController.getById(req, res));
router.put("/:id", verifyToken, (req, res) => authController.updateById(req, res));
router.delete("/:id", verifyToken, isAdmin, (req, res) => authController.deleteById(req, res));

export default router;
