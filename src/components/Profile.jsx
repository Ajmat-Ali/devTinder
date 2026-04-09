import React, { useState } from "react";
import ProfileView from "./ProfileView";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { user, loading, error } = useSelector((store) => store.user);
  if (loading) return <h1>Loading....</h1>;
  if (error) return <h1>Error....</h1>;

  const toggleEditing = { isEditing, setIsEditing };
  return (
    <div className="flex justify-center m-5 mb-20">
      {isEditing ? (
        <EditProfile toggleEditing={toggleEditing} />
      ) : (
        <ProfileView toggleEditing={toggleEditing} />
      )}
    </div>
  );
};

export default Profile;
