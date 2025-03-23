import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import TaskCard from "../components/TaskCard";
import { completed } from "../assets/assets";
import Filter from "../components/Filter";

const CompletedTasks = () => {
  const { filterTasks } = useContext(AppContext);
  const filteredTasks =
    filterTasks && filterTasks.filter((task) => task.status === "Completed");

  return (
    <div className="p-2 sm:p-4 w-full">
      <p className="text-lg font-medium">
        Completed Tasks {`(${filteredTasks.length})`}
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
          <img className="sm:w-[30rem] mt-20" src={completed} />
        </div>
      )}
    </div>
  );
};

export default CompletedTasks;
