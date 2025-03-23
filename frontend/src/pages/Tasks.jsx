import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import TaskCard from "../components/TaskCard";
import { manage } from "../assets/assets";
import Filter from "../components/Filter";

const Tasks = () => {
  const { filterTasks } = useContext(AppContext);

  return (
    <div className="p-2 sm:p-4 w-full">
      <p className="text-lg font-medium">Tasks {`(${filterTasks.length})`}</p>
      <Filter />
      {filterTasks.length > 0 ? (
        <div className="p-6 border border-gray-300 bg-white rounded w-full max-h-[80vh] overflow-y-auto flex flex-wrap gap-6 justify-start items-start">
          {filterTasks &&
            filterTasks.map((task, index) => (
              <div key={index} className="w-full sm:w-md max-w-md">
                <TaskCard task={task} />
              </div>
            ))}
        </div>
      ) : (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <img className="w-[40rem]" src={manage} alt="no tasks available"/>
        </div>
      )}
    </div>
  );
};

export default Tasks;
