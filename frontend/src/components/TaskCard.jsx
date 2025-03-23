import React, { useContext, useState } from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import EditTask from "./EditTask";

const calculateDueDays = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `${diffDays} days left`;
  if (diffDays === 0) return "Due today";
  return `Overdue by ${Math.abs(diffDays)} days`;
};

const getBadgeStyle = (type, value) => {
  const styles = {
    priority: {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      High: "bg-red-100 text-red-800",
    },
    status: {
      Pending: "bg-gray-100 text-gray-800",
      "In-Progress": "bg-blue-100 text-blue-800",
      Completed: "bg-green-100 text-green-800",
    },
  };
  return styles[type][value] || "bg-gray-100 text-gray-800";
};

const TaskCard = ({ task }) => {
  const { user, backendUrl, fetchTasks } = useContext(AppContext);
  const [editTaskPopup, setEditTaskPopup] = useState(false);

  const deleteTask = async () => {
    try {
      const { data } = await axios.delete(
        backendUrl + "/api/tasks/" + task._id,
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        fetchTasks();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    try {
      const { data } = await axios.patch(
        backendUrl + "/api/tasks/" + task._id,
        { status: "Completed" },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        fetchTasks();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-5 border w-full max-w-md h-fit border-gray-200">
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">{task.description}</p>

      {/* Badges */}
      <div className="flex justify-between items-center text-sm">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeStyle(
            "priority",
            task.priority
          )}`}
        >
          {task.priority}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeStyle(
            "status",
            task.status
          )}`}
        >
          {task.status}
        </span>
      </div>

      {/* Due Date */}
      <div className="mt-4 text-right text-gray-500 text-xs">
        Due:{" "}
        <span className="font-semibold text-gray-700">
          {calculateDueDays(task.dueDate)}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-5">
        {user.role === "user" && (
          <button
            onClick={() => setEditTaskPopup(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-500 transition cursor-pointer"
          >
            <FaEdit /> Edit
          </button>
        )}

        <button
          onClick={deleteTask}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 text-sm rounded-md hover:bg-red-500 transition cursor-pointer"
        >
          <FaTrash /> Delete
        </button>

        {task.status !== "Completed" && user.role === "user" && (
          <button
            onClick={updateTask}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 text-sm rounded-md hover:bg-green-500 transition cursor-pointer"
          >
            <FaCheck /> Finish
          </button>
        )}
      </div>
      {editTaskPopup && (
        <EditTask id={task._id} setEditTaskPopup={setEditTaskPopup} />
      )}
    </div>
  );
};

export default TaskCard;
