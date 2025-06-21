import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation, useRegisterMutation } from "../app/features/auth/authApi";
import { setCredentials } from "../app/features/auth/authSlice";

const Login = () => {
  const [loginUser, {isSuccess, isLoading, isError}] = useLoginMutation();
  const [registerUser, {isSuccess: isRegisterSuccess, isLoading: isRegisterLoading, isError: isRegisterError}] = useRegisterMutation();
  const dispatch = useDispatch();
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        const data = await loginUser({email, password}).unwrap();
        if (data.success) {
          dispatch(setCredentials(data?.user))
          toast.success(data.message);
          // setUser(data?.user);
        } else {
          toast.error(data.message);
        }
      } else {
        const data = await registerUser({name,email,password,role}).unwrap();
        if (data.success) {
          toast.success(data.message);
          setState("Login");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-200 max-w-96 m-auto p-8 rounded-lg shadow-md text-sm mt-20 text-gray-600"
    >
      <div className="flex flex-col gap-3">
        <p className="text-center text-2xl font-semibold text-gray-500">
          <span className="text-blue-600">{state}</span>
        </p>

        {state === "Register" && (
          <div className="text-gray-600">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-gray-300 w-full rounded p-2 mt-1"
              type="text"
              required
            />
          </div>
        )}

        <div className="text-gray-600">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-300 w-full rounded p-2 mt-1"
            type="email"
            required
          />
        </div>

        <div className="text-gray-600">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-gray-300 w-full rounded p-2 mt-1"
            type="password"
            required
          />
        </div>

        <button
          className="bg-blue-600 py-2 rounded text-white my-2 cursor-pointer"
          type="submit"
          disabled={isLoading}
        >
          {isLoading || isRegisterLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            </div>
          ) : (
            state === "Login" ? "Login" : "Submit"
          )}
        </button>

        {state === "Login" ? (
          <p>
            Not Registered?{" "}
            <span
              onClick={() => setState("Register")}
              className="text-blue-600 underline cursor-pointer"
            >
              Create account
            </span>
          </p>
        ) : (
          <div className="flex justify-between">
            <p>
              Login?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-600 underline cursor-pointer"
              >
                Click here
              </span>
            </p>

            <div className="flex items-center gap-2">
              <input
                id="role"
                type="checkbox"
                checked={role}
                onChange={(e) => setRole(e.target.checked)}
              />
              <label
                htmlFor="role"
                className="text-red-500 underline cursor-pointer"
              >
                Admin
              </label>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default Login;
