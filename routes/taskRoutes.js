import express from "express";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import {
  createTask,
  deleteTask,
  getTasks,
  getTasksById,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/createTask", AuthMiddleware, createTask);
router.get("/get", AuthMiddleware, getTasks);
router.get("/get/:id", AuthMiddleware, getTasksById);
router.put("/update/:id", AuthMiddleware, updateTask);
router.delete("/delete/:id", AuthMiddleware, deleteTask);

export default router;
