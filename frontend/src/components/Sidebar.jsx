import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";
import { IoCheckmarkDone } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className=" bg-white border-r border-gray-200 flex flex-col sm:w-56 justify-between h-[90vh]">
      <ul className="text-gray-500 mt-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-56 cursor-pointer ${
              isActive
                ? "border-blue-600 border-r-4 bg-[#F2F3FF] text-gray-900"
                : ""
            }`
          }
        >
          <FaTasks className="text-xl" />
          <p className="hidden sm:block">Manage Tasks</p>
        </NavLink>

        <NavLink
          to="/pending"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-56 cursor-pointer ${
              isActive
                ? "border-blue-600 border-r-4 bg-[#F2F3FF] text-gray-900"
                : ""
            }`
          }
        >
          <MdOutlinePendingActions className="text-xl" />
          <p className="hidden sm:block">Pending</p>
        </NavLink>

        <NavLink
          to="/in-progress"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-56 cursor-pointer ${
              isActive
                ? "border-blue-600 border-r-4 bg-[#F2F3FF] text-gray-900"
                : ""
            }`
          }
        >
          <TbProgressBolt className="text-xl" />
          <p className="hidden sm:block">In progress</p>
        </NavLink>

        <NavLink
          to="/completed"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-56 cursor-pointer ${
              isActive
                ? "border-blue-600 border-r-4 bg-[#F2F3FF] text-gray-900"
                : ""
            }`
          }
        >
          <IoCheckmarkDone className="text-xl" />
          <p className="hidden sm:block">Completed</p>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
