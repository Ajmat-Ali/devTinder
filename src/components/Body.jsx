import React from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/user";

const Body = () => {
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const getProfile = async () => {
    try {
      const res = await axios({
        method: "get",
        url: BASE_URL + "/profile",
        withCredentials: true,
      });

      dispatch(addUser({ user: res.data, loading: false, error: false }));
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(addUser({ user: null, loading: false, error: false }));
        navigate("/login");
        return;
      }
      dispatch(addUser({ user: null, loading: false, error: true }));
    }
  };

  useEffect(() => {
    if (!user) {
      getProfile();
    }
  }, []);

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <h1>Something went wrong Body</h1>;

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
