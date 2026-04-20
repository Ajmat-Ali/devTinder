import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../redux/request";
import { BASE_URL } from "../utils/constant";
import axios from "axios";

const UserRequest = () => {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((store) => store.request);

  const getpendingRequest = async () => {
    try {
      const res = await axios({
        method: "get",
        url: BASE_URL + "/viewPendingRequest",
        withCredentials: true,
      });

      dispatch(
        addRequests({ requests: res.data.data, loading: false, error: false }),
      );
    } catch (error) {
      console.log(error?.response?.data);
      dispatch(addRequests({ requests: null, loading: false, error: true }));
    }
  };

  useEffect(() => {
    getpendingRequest();
  }, []);

  const handleRequest = async (status, _id) => {
    try {
      const res = await axios({
        method: "post",
        url: BASE_URL + "/request/review/" + status + "/" + _id,
        data: {},
        withCredentials: true,
      });

      dispatch(removeRequest({ _id }));
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  if (loading) return <h1>Loading in request....</h1>;
  if (error) return <h1>Error in request....</h1>;
  if (!requests) return null;

  if (requests.length <= 0)
    return (
      <h1 className=" text-3xl text-center m-10 text-red-500">
        No Request found
      </h1>
    );

  return (
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-center text-3xl font-bold mb-8">
        Connection Requests
        <span className="ml-3 text-sm font-normal bg-primary/20 text-primary px-3 py-1 rounded-full">
          {requests.length} pending
        </span>
      </h1>

      <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
        {requests.map((request) => {
          const { firstName, lastName, age, gender, photoUrl } =
            request.senderId;
          return (
            <div
              key={request._id}
              className="flex items-center justify-between gap-4 w-full p-4 rounded-2xl bg-base-200 hover:bg-base-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {/* Left — avatar + info */}
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={photoUrl} alt={firstName} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-base">
                    {firstName + " " + lastName}
                  </span>
                  {age && gender && (
                    <span className="text-sm text-base-content/60">
                      {age} years, {gender}
                    </span>
                  )}
                </div>
              </div>

              {/* Right — buttons */}
              <div className="flex gap-2 shrink-0">
                <button
                  className="btn btn-sm btn-outline btn-error rounded-full px-4"
                  onClick={() => handleRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-sm btn-primary rounded-full px-4"
                  onClick={() => handleRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserRequest;
