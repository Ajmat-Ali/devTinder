import React from "react";
import UserCard from "./userCard";
import { useSelector } from "react-redux";

const Feed = () => {
  const { user, loading, error } = useSelector((store) => store.user);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong...</h1>;
  return (
    <div className="flex justify-center m-5 mb-20">
      <UserCard user={user} />
    </div>
  );
};

export default Feed;
