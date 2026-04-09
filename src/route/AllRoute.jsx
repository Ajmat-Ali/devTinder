import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Body from "../components/Body";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Feed from "../components/Feed";
import UserConnection from "../components/UserConnection";
import UserRequest from "../components/UserRequest";

const AllRoute = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/UserConnection" element={<UserConnection />} />
          <Route path="/UserRequest" element={<UserRequest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoute;
