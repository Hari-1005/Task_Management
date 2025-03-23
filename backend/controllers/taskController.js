import taskModel from "../models/taskModel.js";

// create task
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;
    if (!title || !description)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    await taskModel.create({
      title,
      description,
      priority: priority || "Low",
      status: status || "Pending",
      dueDate,
      user: req.user.id,
    });

    res
      .status(201)
      .json({ success: true, message: "Task created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { user: req.user.id };
    const tasks = await taskModel.find(filter);
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//delete task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await taskModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//update task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    await taskModel.findByIdAndUpdate(id, req.body);
    res.status(200).json({ success: true, message: "Task updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
