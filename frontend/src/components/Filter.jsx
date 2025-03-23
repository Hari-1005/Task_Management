import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const Filter = () => {
  const {
    user,
    tasks,
    setAddTaskPopup,
    setFilterTasks,
    activePriority,
    setActivePriority,
    activeSort,
    setActiveSort,
  } = useContext(AppContext);

  const filterByPriority = (priority) => {
    if (activePriority === priority) {
      setActivePriority(null);
      return tasks; // Reset to all tasks
    } else {
      setActivePriority(priority);
      return tasks.filter((task) => task.priority === priority);
    }
  };
  const sortByDueDate = (tasksList, order) => {
    if (activeSort === order) {
      setActiveSort(null);
      return tasksList; // Reset sorting
    } else {
      setActiveSort(order);
      return [...tasksList].sort((a, b) => {
        return order === "asc"
          ? new Date(a.dueDate) - new Date(b.dueDate)
          : new Date(b.dueDate) - new Date(a.dueDate);
      });
    }
  };

  const handleFilterSort = (priority = activePriority, order = activeSort) => {
    let filteredTasks = priority ? filterByPriority(priority) : tasks;
    let sortedTasks = order
      ? sortByDueDate(filteredTasks, order)
      : filteredTasks;
    setFilterTasks(sortedTasks);
  };

  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex flex-col sm:flex-row sm:gap-3">
        {/* sort by task priority */}
        <div className="inline-flex rounded-md shadow-xs" role="group">
          <button
            onClick={() => handleFilterSort("High", activeSort)}
            name="High"
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              activePriority === "High"
                ? "bg-gray-100 text-blue-700"
                : "text-gray-900 bg-white"
            }  border border-gray-200 rounded-s-lg hover:bg-gray-100 cursor-pointer`}
          >
            High
          </button>
          <button
            type="button"
            onClick={() => handleFilterSort("Medium", activeSort)}
            name="Medium"
            className={`px-4 py-2 text-sm font-medium ${
              activePriority === "Medium"
                ? "bg-gray-100 text-blue-700"
                : "text-gray-900 bg-white"
            } border-t border-b border-gray-200 hover:bg-gray-100 cursor-pointer`}
          >
            Medium
          </button>
          <button
            type="button"
            onClick={() => handleFilterSort("Low", activeSort)}
            name="Low"
            className={`px-4 py-2 text-sm font-medium ${
              activePriority === "Low"
                ? "bg-gray-100 text-blue-700"
                : "text-gray-900 bg-white"
            } border border-gray-200 rounded-e-lg hover:bg-gray-100 cursor-pointer`}
          >
            Low
          </button>
        </div>

        {/* sort by due date */}
        <div className="inline-flex rounded-md shadow-xs">
          <button
            onClick={() => handleFilterSort(activePriority, "asc")}
            name="High"
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              activeSort === "asc"
                ? "bg-gray-100 text-blue-700"
                : "text-gray-900 bg-white"
            }  border border-gray-200 rounded-s-lg hover:bg-gray-100 cursor-pointer`}
          >
            Due Date ↑
          </button>

          <button
            type="button"
            onClick={() => handleFilterSort(activePriority, "desc")}
            name="Low"
            className={`px-4 py-2 text-sm font-medium ${
              activeSort === "desc"
                ? "bg-gray-100 text-blue-700"
                : "text-gray-900 bg-white"
            } border border-gray-200 rounded-e-lg hover:bg-gray-100 cursor-pointer`}
          >
            Due Date ↓
          </button>
        </div>
      </div>

      <div className="">
        {user.role === "user" && (
          <button
            onClick={() => setAddTaskPopup(true)}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 cursor-pointer"
          >
            Add Task
          </button>
        )}
      </div>
    </div>
  );
};

export default Filter;
