import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import TaskCard from "../components/TaskCard";
import { inProgress } from "../assets/assets";
import Filter from "../components/Filter";
import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../app/features/tasks/tasksApi";

const InProgressTasks = () => {
  const { data, isLoading } = useGetTasksQuery();
  const {tasks} = useSelector((store)=>store.tasks);
  const filteredTasks =
    tasks && tasks.filter((task) => task.status === "In-Progress");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 w-full">
      <p className="text-lg font-medium">
        Progress Tasks {`(${filteredTasks.length})`}
      </p>
      <Filter />

      {filteredTasks.length ? (
        <div className="p-6 border border-gray-300 bg-white rounded w-full max-h-[77vh] overflow-y-auto flex flex-wrap gap-6 justify-start items-start">
          {filteredTasks &&
            filteredTasks.map((task, index) => (
              <div key={index} className="w-full sm:w-md max-w-md">
                <TaskCard task={task} />
              </div>
            ))}
        </div>
      ) : (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <img className="sm:w-[30rem] mt-20" src={inProgress} />
        </div>
      )}
    </div>
  );
};

export default InProgressTasks;
