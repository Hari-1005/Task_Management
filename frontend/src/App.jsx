import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import PendingTasks from "./pages/PendingTasks";
import InProgressTasks from "./pages/InProgressTasks";
import CompletedTasks from "./pages/CompletedTasks";
import Sidebar from "./components/Sidebar";
import { AppContext } from "./context/AppContext";
import Login from "./components/Login";
import AddTask from "./components/AddTask";

const App = () => {
  const { user } = useContext(AppContext);
  return user ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <AddTask />
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
