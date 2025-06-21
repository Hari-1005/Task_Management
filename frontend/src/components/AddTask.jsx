import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useAddTaskMutation } from "../app/features/tasks/tasksApi";


const AddTask = ({addTaskPopup, setAddTaskPopup}) => {
  const [addTask] = useAddTaskMutation();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addTask(taskData).unwrap();
      if (data.success) {
        toast.success(data.message);
        setAddTaskPopup(false);
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
    addTaskPopup && (
      <div className="absolute w-full h-screen bg-gray-200/90 z-20 left-0 top-0">
        <form onSubmit={handleSubmit}>
          <div className="max-w-md mx-auto mt-20 bg-white shadow-md rounded-lg p-5 relative">
            <div
              onClick={() => setAddTaskPopup(false)}
              className="w-fit p-2 bg-gray-200 absolute rounded right-3 top-2 cursor-pointer hover:bg-gray-300"
            >
              <RxCross1 />
            </div>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Add New Task
            </h2>
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
                Add Task
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  );
};

export default AddTask;
