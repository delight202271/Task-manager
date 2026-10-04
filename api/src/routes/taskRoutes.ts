import { Router } from "express";
import { createTask } from "../controllers/taskControllers.js";
import { getTasks } from "../controllers/taskControllers.js";
import { getTaskById } from "../controllers/taskControllers.js";
import { updateTask } from "../controllers/taskControllers.js";
import { deleteTask } from "../controllers/taskControllers.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";

const router = Router();

router.post("/", authMiddleware, createTask);
router.get ("/", authMiddleware, getTasks);
router.get("/:id",authMiddleware, getTaskById);
router.put("/:id",authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;