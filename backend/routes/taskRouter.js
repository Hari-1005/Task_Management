import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/taskController.js";
import authMiddleware from "../middlewares/auth.js";

const taskRouter = express.Router();

taskRouter.post("/create", authMiddleware, createTask);
taskRouter.get("/", authMiddleware, getAllTasks);
taskRouter.patch("/:id", authMiddleware, updateTask);
taskRouter.delete("/:id", authMiddleware, deleteTask);
export default taskRouter;
