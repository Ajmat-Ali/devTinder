import React, { useEffect } from "react";
import UserCard from "./userCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../redux/feed";

const Feed = () => {
  // const { user, loading, error } = useSelector((store) => store.user);
  // if (loading) return <h1>Loading...</h1>;
  // if (error) return <h1>Something went wrong...</h1>;

  const dispatch = useDispatch();
  const { feed, loading, error } = useSelector((store) => store.feed);

  const getAllFed = async () => {
    try {
      const res = await axios({
        method: "get",
        url: BASE_URL + "/feed",
        withCredentials: true,
      });
      // console.log(res.data);
      dispatch(addFeed({ feed: res.data, loading: false, error: false }));
    } catch (error) {
      dispatch(addFeed({ feed: null, loading: false, error: true }));
      console.log(error);
    }
  };
  useEffect(() => {
    if (!feed) {
      getAllFed();
    }
  }, []);

  if (loading) return <h1>Fedd Loading ...</h1>;
  if (error) return <h1>Error in Feed...</h1>;

  return (
    <div className="flex justify-center m-5 mb-20">
      <UserCard feed={feed[0]} />
    </div>
  );
};

export default Feed;
