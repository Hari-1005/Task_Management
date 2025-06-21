import TaskCard from "../components/TaskCard";
import { manage } from "../assets/assets";
import Filter from "../components/Filter";
import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../app/features/tasks/tasksApi";

const Tasks = () => {
  const user = useSelector((store) => store.auth)
  const tasks = useSelector((store) => store.tasks.tasks)
  const {data, isLoading} = useGetTasksQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 w-full">
      <p className="text-lg font-medium">Tasks {`(${tasks.length || 0})`}</p>
      <Filter />
      {tasks.length > 0 ? (
        <div className="p-6 border border-gray-300 bg-white rounded w-full max-h-[80vh] overflow-y-auto flex flex-wrap gap-6 justify-start items-start">
          {tasks &&
            tasks.map((task, index) => (
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
