import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/user";

const SignUp = () => {
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const { user, loading } = useSelector((store) => store.user);

  const handleTogglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const { firstName, lastName, email, password } = formValue;

  const handleFormValue = (e) => {
    const { name, value } = e.target;
    const newValue = { ...formValue, [name]: value };
    setFormValue(newValue);
  };

  const handleSignUp = async () => {
    try {
      const res = await axios({
        method: "post",
        url: BASE_URL + "/signup",
        data: formValue,
        withCredentials: true,
      });
      dispatch(addUser({ user: res.data.data, loading: false, error: false }));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/profile");
      }, 1500);
    } catch (error) {
      const err = error?.response?.data;
      setError(err);
    }
  };

  if (loading) return <h1 className="text-center text-xl m-3">Loading...</h1>;

  return (
    <div>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <h2 className="text-center text-xl">Sign Up</h2>

        <label className="label">First Name</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleFormValue}
          className="input"
          placeholder="First Name"
        />

        <label className="label">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleFormValue}
          className="input"
          placeholder="Last Name"
        />

        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleFormValue}
          className="input"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleFormValue}
            className="input"
            placeholder="Password"
          />
          <button
            onClick={handleTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {isPasswordVisible ? "Hide" : "Show"}
          </button>
        </div>
        {error && <div className="text-center m-2 text-red-400">{error} </div>}

        <button className="btn btn-neutral mt-4" onClick={handleSignUp}>
          Sign Up
        </button>
        <p className="text-center m-2">
          <Link to="/login">Already have account? Login here!</Link>
        </p>
      </fieldset>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Sign Up successful.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
