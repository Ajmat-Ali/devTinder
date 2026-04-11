import React, { useEffect } from "react";
import UserCard from "./userCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addFeed, setHasMore, incrementPage } from "../redux/feed";

const Feed = () => {
  const dispatch = useDispatch();
  const { feed, loading, error, page, hasMore } = useSelector(
    (store) => store.feed,
  );

  const getAllFed = async (page) => {
    try {
      const res = await axios({
        method: "get",
        url: BASE_URL + `/feed?page=${page}&limit=5`,
        withCredentials: true,
      });

      if (res.data.length === 0) {
        dispatch(setHasMore(false));
        dispatch(addFeed({ feed: [], loading: false, error: false }));
        return;
      }

      dispatch(addFeed({ feed: res.data, loading: false, error: false }));
    } catch (error) {
      dispatch(addFeed({ feed: null, loading: false, error: true }));
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (feed === null) {
  //     getAllFed(1);
  //   } else if (feed.length === 0 && hasMore) {
  //     const newPage = page + 1;
  //     dispatch(incrementPage());
  //     getAllFed(newPage);
  //   }
  // }, [feed]);

  useEffect(() => {
    if (!feed) {
      getAllFed();
    }
  }, []);

  if (loading) return <h1>Fedd Loading ...</h1>;
  if (error) return <h1>Error in Feed...</h1>;
  if (!feed) return null;
  if (feed.length === 0)
    return <h1 className="text-center m-5 text-2xl">No more new feed found</h1>;

  // if (feed.length === 0 && !hasMore) // will add pagination later
  //   return <h1 className="text-center m-5 text-2xl">No more new feed found</h1>;

  return (
    <div className="flex justify-center m-5 mb-20">
      <UserCard key={feed[0]._id} feed={feed[0]} />
    </div>
  );
};

export default Feed;
