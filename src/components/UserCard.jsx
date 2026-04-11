import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { removeFeed } from "../redux/feed";
import { useDispatch } from "react-redux";

const UserCard = ({ feed }) => {
  const { _id, firstName, lastName, age, gender, photoUrl, skills, bio } = feed;

  const dispatch = useDispatch();
  const [swipeDir, setSwipeDir] = useState(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // tiny delay so transition actually triggers
    const t = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleConnection = async (status, _id) => {
    const direction = status === "ignored" ? "left" : "right";
    setSwipeDir(direction);

    setTimeout(async () => {
      try {
        const res = await axios({
          method: "post",
          url: BASE_URL + "/sendConnectionReq/" + status + "/" + _id,
          data: {},
          withCredentials: true,
        });
        setSwipeDir(null);
        dispatch(removeFeed(_id));
      } catch (error) {
        console.log(error?.response?.data);
        setSwipeDir(null);
      }
    }, 300);
  };

  useEffect(() => {
    // tiny delay so transition actually triggers
    const t = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-96">
      {/* Nope label - shows on ignore */}
      <div
        className={`absolute top-6 left-4 z-10 border-2 border-red-500 text-red-500 
        bg-red-50 font-semibold text-xl px-4 py-1 rounded-lg transition-opacity duration-150
        ${swipeDir === "left" ? "opacity-100" : "opacity-0"}`}
      >
        Nope
      </div>

      {/* Like label - shows on interested */}
      <div
        className={`absolute top-6 right-4 z-10 border-2 border-green-500 text-green-500 
        bg-green-50 font-semibold text-xl px-4 py-1 rounded-lg transition-opacity duration-150
        ${swipeDir === "right" ? "opacity-100" : "opacity-0"}`}
      >
        Like
      </div>

      <div
        className={`card bg-base-300 shadow-sm transition-all duration-400
        ${!entered ? "opacity-0 scale-90" : "opacity-100 scale-100"}
        ${swipeDir === "left" ? "-translate-x-full -rotate-12 opacity-0" : ""}
        ${swipeDir === "right" ? "translate-x-full rotate-12 opacity-0" : ""}
      `}
      >
        <figure className="px-10 pt-10">
          <img src={photoUrl} alt="profile-pic" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{firstName + " " + lastName} </h2>
          <h2 className="card-title">{age} years old </h2>
          <h2 className="card-title">{gender} </h2>
          <p>{bio}</p>
          <div className="card-actions mt-2">
            <button
              className="btn btn-error btn-outline"
              onClick={() => handleConnection("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-success btn-outline"
              onClick={() => handleConnection("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
