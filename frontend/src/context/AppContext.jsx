import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();
// import { tasksData } from "../taskData";
// import { toast } from "react-toastify";
import axios from "axios";

const AppContextProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  // const [tasks, setTasks] = useState([]);
  // const [filterTasks, setFilterTasks] = useState([]);
  // const [addTaskPopup, setAddTaskPopup] = useState(false);
  // const [showFilter, setShowFilter] = useState(false);
  // const [activePriority, setActivePriority] = useState(null);
  // const [activeSort, setActiveSort] = useState(null);
  // const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // const fetchUser = async () => {
  //   try {
  //     const { data } = await axios.get(backendUrl + "/api/user/me", {
  //       withCredentials: true,
  //     });
  //     if (data.success) {
  //       setUser(data.user);
  //     } else {
  //       setUser(null);
  //     }
  //   } catch (error) {
  //     setUser(null);
  //   }finally{
  //     setLoading(false);
  //   }
  // };
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/tasks/", {
        withCredentials: true,
      });
      if (data.success) {
        setTasks(data.tasks);
        setFilterTasks(data.tasks);
      }
    } catch (error) {
      setTasks([]);
      setFilterTasks([]);
    }
  };
  useEffect(() => {
    // fetchUser();
    fetchTasks();
  }, []);

  // useEffect(() => {
  //   if (user) fetchTasks();
  // }, [user]);
  

  const values = {
    user,
    setUser,
    tasks,
    setTasks,
    backendUrl,
    addTaskPopup,
    setAddTaskPopup,
    fetchTasks,
    filterTasks,
    setFilterTasks,
    showFilter,
    setShowFilter,
    activePriority,
    setActivePriority,
    activeSort,
    setActiveSort,
    loading
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
