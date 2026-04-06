import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/user";

const Login = () => {
  const [email, setEmail] = useState("ajmat@gmail.com");
  const [password, setPassword] = useState("Ajmat@12345");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();

  const handleTogglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    try {
      const res = await axios({
        method: "post",
        url: BASE_URL + "/login",
        data: {
          email,
          password,
        },
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center border border-red-200 mt-6 p-2">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 ">
        <h2 className="text-xl text-center">Login</h2>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="label mt-3">Password</label>
        <div className="relative ">
          <input
            type={isPasswordVisible ? "value" : "password"}
            className="input "
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {isPasswordVisible ? "Hide" : "Show"}
          </button>
        </div>

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
