import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useEditTaskMutation, useGetTasksQuery } from "../app/features/tasks/tasksApi";

const EditTask = ({ id, setEditTaskPopup }) => {
  const { data } = useGetTasksQuery();
  const [editTask] = useEditTaskMutation();

  const task = data?.tasks.find((task) => task._id === id);

  const [taskData, setTaskData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    dueDate: new Date(task.dueDate).toISOString().substring(0, 10),
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await editTask({ id, taskData }).unwrap();
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setEditTaskPopup(false);
        setTaskData({
          title: "",
          description: "",
          priority: "",
          status: "",
          dueDate: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="absolute top-16 left-0 w-full h-screen bg-gray-200/90">
      <form onSubmit={handleSubmit}>
        <div className="max-w-md mx-auto mt-20 bg-white shadow-md rounded-lg p-5 relative">
          <div
            onClick={() => setEditTaskPopup(false)}
            className="w-fit p-2 bg-gray-200 absolute rounded right-3 top-2 cursor-pointer hover:bg-gray-300"
          >
            <RxCross1 />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-4">Edit Task</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              placeholder="Task Title"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleChange}
              placeholder="Task Description"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              rows="4"
              required
            ></textarea>
            <div className="flex justify-between">
              <select
                className="w-1/2 px-3 py-2 border border-gray-300 rounded"
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
              <select
                className="w-1/2 px-3 py-2 border border-gray-300 rounded"
                name="status"
                value={taskData.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <input
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition duration-200 cursor-pointer"
            >
              Edit Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
