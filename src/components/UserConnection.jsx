import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/connection";

const UserConnection = () => {
  const dispatch = useDispatch();
  const { connections, loading, error } = useSelector(
    (store) => store.connection,
  );

  const getConnectedUser = async () => {
    try {
      const res = await axios({
        method: "get",
        url: BASE_URL + "/connection",
        withCredentials: true,
      });

      dispatch(
        addConnections({ connections: res.data, loading: false, error: false }),
      );
    } catch (error) {
      dispatch(
        addConnections({ connections: null, loading: false, error: true }),
      );
    }
  };

  useEffect(() => {
    getConnectedUser();
  }, []);

  if (loading) return <h1>Loading....</h1>;
  if (error) return <h1>Error....</h1>;

  if (connections.length <= 0)
    return (
      <h1 className=" text-3xl text-center m-10 text-red-500">
        No Connection found
      </h1>
    );

  return (
    // <div>
    //   <h1 className="text-center text-3xl">All Connection</h1>
    //   <div className="flex flex-col items-center gap-5 m-10">
    //     {connections.map((connection) => {
    //       const { firstName, lastName, age, gender, photoUrl, skills } =
    //         connection;
    //       return (
    //         <div
    //           key={connection._id}
    //           className="flex border items-center gap-x-5 w-4/12 p-4 rounded-xl justify-between bg-black/30"
    //         >
    //           <div className="space-y-2">
    //             <div>
    //               <img
    //                 src={photoUrl}
    //                 alt="photUrl"
    //                 className="w-16 h-16 rounded-full"
    //               />
    //             </div>
    //             <div className="flex flex-col">
    //               <span>{firstName + " " + lastName}</span>
    //               <span>{age && gender && age + " years" + ", " + gender}</span>
    //             </div>
    //           </div>
    //           <div>{skills.join(", ")}</div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-center text-3xl font-bold mb-8">
        My Connections
        <span className="ml-3 text-sm font-normal bg-primary/20 text-primary px-3 py-1 rounded-full">
          {connections.length} connected
        </span>
      </h1>

      <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
        {connections.map((connection) => {
          const { firstName, lastName, age, gender, photoUrl, skills } =
            connection;
          return (
            <div
              key={connection._id}
              className="flex items-center justify-between gap-4 w-full p-4 rounded-2xl bg-base-200 hover:bg-base-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {/* Left — avatar + info */}
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={photoUrl} alt={firstName} />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-base">
                    {firstName + " " + lastName}
                  </span>
                  {age && gender && (
                    <span className="text-sm text-base-content/60">
                      {age} years, {gender}
                    </span>
                  )}
                  {/* Skills */}
                  {skills?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right — message button */}
              <button className="btn btn-sm btn-outline btn-primary rounded-full px-4 shrink-0">
                Message
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserConnection;
