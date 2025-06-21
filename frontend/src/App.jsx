import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import PendingTasks from "./pages/PendingTasks";
import InProgressTasks from "./pages/InProgressTasks";
import CompletedTasks from "./pages/CompletedTasks";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery } from "./app/features/auth/authApi";
import { setCredentials, clearAuth } from "./app/features/auth/authSlice";
import { useGetTasksQuery } from "./app/features/tasks/tasksApi";
import { setTasks } from "./app/features/tasks/tasksSlice";

const App = () => {
  const { user } = useSelector((store) => store.auth);
  const { data, error, isLoading } = useGetMeQuery();
  const { data : tasks} = useGetTasksQuery();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data?.user));
      dispatch(setTasks(tasks?.tasks));
    } else {
      dispatch(clearAuth());
    }
  }, [data, error, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return user ? (
    <div className="bg-[#F8F9FD] max-w-[1536px] mx-auto">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Tasks />} />
            <Route path="/pending" element={<PendingTasks />} />
            <Route path="/in-progress" element={<InProgressTasks />} />
            <Route path="/completed" element={<CompletedTasks />} />
            <Route path="*" element={<h1>404 NOT FOUND</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  );
};

export default App;
