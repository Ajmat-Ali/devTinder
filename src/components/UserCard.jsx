import React from "react";

const UserCard = ({ feed }) => {
  const { firstName, lastName, age, gender, photoUrl, skills, bio } = feed;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={photoUrl} alt="profile-pic" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + " " + lastName} </h2>
        <h2 className="card-title">{age} years old </h2>
        <h2 className="card-title">{gender} </h2>
        <p>{bio}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
