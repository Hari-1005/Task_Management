import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../app/features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../app/features/auth/authSlice";

const Navbar = () => {
  const {user} = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [logoutUser, {isLoading}] = useLogoutMutation();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const data = await logoutUser().unwrap();
      if (data.success) {
        dispatch(clearAuth());
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-between items-center h-16 px-3 sm:px-10 py-3 bg-white border-b border-gray-200">
      <h1
        onClick={() => {
          navigate("/");
        }}
        className="text-2xl font-semibold cursor-pointer text-blue-700"
      >
        TASK &nbsp;MANAGER
      </h1>
      <button
        onClick={logout}
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 cursor-pointer"
      >
        {user ? "Sign out" : "Login"}
      </button>
    </div>
  );
};

export default Navbar;
