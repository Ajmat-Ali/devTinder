import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Body from "../components/Body";
import Login from "../components/Login";
import Profile from "../components/Profile";

const AllRoute = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoute;
