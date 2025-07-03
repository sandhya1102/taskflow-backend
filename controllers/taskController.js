import Task from "../models/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;
    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      dueDate,
      priority,
      completed: completed === "Yes" || completed === true,
    });
    res.status(201).json({
      message: "Task created successfully",
      task,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
      error: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    if (!tasks) {
      return res.status(404).json({
        message: "tasks not found.",
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export const getTasksById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task)
      return res.status(400).json({
        message: "Task not found",
        success: false,
      });
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.completed !== undefined) {
      data.completed = data.completed === "Yes" || data.completed === true;
    }

    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      data,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated)
      return res.status(404).json({
        message: "Can't update task",
        success: false,
      });
    res.status(200).json({
      message: "Task updated successfully.",
      success: true,
      task: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted)
      return res.status(404).json({
        message: "Can't delete task",
        success: false,
      });
    res.status(200).json({
      message: "Task deleted successfully.",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
