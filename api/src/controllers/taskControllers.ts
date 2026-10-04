 import type { Request, Response } from "express";
 import Task from "../models/tasks.js"
import {createTaskSchema,taskIdSchema,updateTaskSchema} from "../validation/taskValidation.js";



export const createTask = async (req: Request, res:Response) =>{


    const date = new Date().toISOString().slice(0, 10);
      console.log(date);
      const result = createTaskSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid task data",
          errors: result.error.issues,
        });
      }
      const data = result.data;
      try {
        const newTask = await Task.create({
          title: data.title,
          description: data.description,
          dueDate: data.dueDate,
          category: data.category,
          completed: data.completed,
          userId: req.userId!,
        });
        console.log(newTask);
        res.json({
          message: "Task received",
          task: newTask,
        });
      } catch (error) {
        console.error("Failed to create task:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to create task",
        });
      }
}

export const getTasks = async (req: Request, res: Response) =>{
      try {
   const tasks = await Task.find({
  userId: req.userId!,
});

    return res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Failed to fetch tasks:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
}

export const getTaskById = async (req: Request, res: Response) => { 
  const idResult = taskIdSchema.safeParse(req.params.id);

  if (!idResult.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID",
      errors: idResult.error.issues,
    });
  }

const task = await Task.findOne({
  _id: idResult.data,
  userId: req.userId!,
});

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  return res.json({
    success: true,
    task,
  });
}
export const updateTask = async (req: Request, res: Response) => {
      try {
    const idResult = taskIdSchema.safeParse(req.params.id);

    if (!idResult.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
        errors: idResult.error.issues,
      });
    }

    const result = updateTaskSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid task data",
        errors: result.error.issues,
      });
    }

    const data = result.data;

  const task = await Task.findOne({
  _id: idResult.data,
  userId: req.userId!,
});

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const date = new Date().toISOString().slice(0, 10);

    if (data.dueDate < date) {
      return res.status(400).json({
        success: false,
        message: "Incorrect date",
      });
    }

    task.title = data.title;
    task.description = data.description;
    task.dueDate = data.dueDate;
    task.category = data.category;
    task.completed = data.completed;

    await task.save();

    return res.json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Failed to update task:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  try {
  
    const idResult = taskIdSchema.safeParse(req.params.id);

    if (!idResult.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
        errors: idResult.error.issues,
      });
    }

    
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const task = await Task.findOne({
      _id: idResult.data,
      userId: req.userId,
    });

   
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // 5. Delete the task we already found
    await task.deleteOne();

    return res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete task:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};