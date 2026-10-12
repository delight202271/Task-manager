import type { Request, Response } from "express";
import Task from "../models/tasks.js";
import {
  createTaskSchema,
  taskIdSchema,
  updateTaskSchema,
} from "../validation/taskValidation.js";

// Task controller functions

// Creates a new task for the authenticated user
export const createTask = async (req: Request, res: Response) => {
  // Gets today's date in YYYY-MM-DD format
  const date = new Date().toISOString().slice(0, 10);
  console.log(date);

  // Validate the data sent in the request body using Zod
  const result = createTaskSchema.safeParse(req.body);

  // Return an error if the request data is invalid
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid task data",
      errors: result.error.issues,
    });
  }

  // Get the validated task data
  const data = result.data;

  try {
    // Create a new task and associate it with the logged-in user
    const newTask = await Task.create({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      category: data.category,
      completed: data.completed,

      // req.userId comes from the authentication middleware
      // This makes the task belong to the authenticated user
      userId: req.userId!,
    });

    console.log(newTask);

    // Send the newly created task back to the client
    res.json({
      message: "Task received",
      task: newTask,
    });
  } catch (error) {
    // Handle errors that occur while creating the task
    console.error("Failed to create task:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};

// Gets all tasks belonging to the authenticated user
export const getTasks = async (req: Request, res: Response) => {
  const search = req.query.search as string;

  try {
    const tasks = await Task.find({
      ...(search
        ? {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
            ],
          }
        : {}),
    });

    console.log("Tasks found:", tasks.length);

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
};

// Gets a single task using its ID
export const getTaskById = async (req: Request, res: Response) => {
  // Validate the task ID from the URL parameter
  const idResult = taskIdSchema.safeParse(req.params.id);

  // Return an error if the task ID is invalid
  if (!idResult.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID",
      errors: idResult.error.issues,
    });
  }

  // Find the task only if it belongs to the authenticated user
  const task = await Task.findOne({
    _id: idResult.data,
    userId: req.userId!,
  });

  // Return 404 if the task does not exist or does not belong to the user
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  // Return the requested task
  return res.json({
    success: true,
    task,
  });
};

// Updates an existing task
export const updateTask = async (req: Request, res: Response) => {
  try {
    // Validate the task ID from the URL
    const idResult = taskIdSchema.safeParse(req.params.id);

    if (!idResult.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
        errors: idResult.error.issues,
      });
    }

    // Validate the updated task data from the request body
    const result = updateTaskSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid task data",
        errors: result.error.issues,
      });
    }

    // Get the validated data
    const data = result.data;

    // Find the task using both its ID and the authenticated user's ID
    // This prevents one user from updating another user's task
    const task = await Task.findOne({
      _id: idResult.data,
      userId: req.userId!,
    });

    // Return an error if the task cannot be found
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Get today's date for due-date validation
    const date = new Date().toISOString().slice(0, 10);

    // Prevent the user from setting a date in the past
    if (data.dueDate < date) {
      return res.status(400).json({
        success: false,
        message: "Incorrect date",
      });
    }

    // Update the task with the validated data
    task.title = data.title;
    task.description = data.description;
    task.dueDate = data.dueDate;
    task.category = data.category;
    task.completed = data.completed;

    // Save the updated task to MongoDB
    await task.save();

    return res.json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    // Handle errors that occur during the update
    console.error("Failed to update task:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
};

// Deletes a task belonging to the authenticated user
export const deleteTask = async (req: Request, res: Response) => {
  try {
    // Validate the task ID from the URL parameter
    const idResult = taskIdSchema.safeParse(req.params.id);

    if (!idResult.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
        errors: idResult.error.issues,
      });
    }

    // Make sure the request has an authenticated user
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Find the task using both the task ID and user's ID
    // This ensures users can only delete their own tasks
    const task = await Task.findOne({
      _id: idResult.data,
      userId: req.userId,
    });

    // Return 404 if the task does not exist
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Delete the task after confirming it belongs to the user
    await task.deleteOne();

    return res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    // Handle errors that occur while deleting the task
    console.error("Failed to delete task:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};