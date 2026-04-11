import React from "react";
import { useSelector } from "react-redux";

const ProfileView = ({ toggleEditing: { isEditing, setIsEditing } }) => {
  const { user, loading, error } = useSelector((store) => store.user);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong...</h1>;

  if (!user) return null;

  const { firstName, lastName, age, gender, photoUrl, skills, bio } = user;

  return (
    <div className="card bg-primary-content/10 w-96 shadow-sm">
      <figure className=" px-10 pt-10 flex justify-start">
        <img
          src={photoUrl}
          alt="profile-pic"
          className="rounded-full w-10 h-10"
        />
      </figure>

      <div className="card-body  ">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{bio}</p>
        <div className="m-2">
          <button
            onClick={(e) => {
              setIsEditing(true);
            }}
            className="border border-gray-600 w-full p-2 rounded-lg cursor-pointer"
          >
            Edit profile
          </button>
        </div>
        <div className=" space-y-2">
          <div className=" flex flex-col">
            <span className="text-gray-400 text-xsm">Name</span>
            <span className="text-sm">{firstName + " " + lastName}</span>
          </div>
          <div className=" flex flex-col">
            <span className="text-gray-400 text-xsm">Age</span>
            <span className="text-sm">{age}</span>
          </div>
          <div className=" flex flex-col">
            <span className="text-gray-400 text-xsm">Gender</span>
            <span className="text-sm">{gender}</span>
          </div>
          <div className=" flex flex-col">
            <span className="text-gray-400 text-xsm">PhotoUrl</span>
            <span className="text-sm">{photoUrl}</span>
          </div>
          <div className=" flex flex-col">
            <span className="text-gray-400 text-xsm">Skills</span>
            <span className="text-sm">{skills.join(", ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
