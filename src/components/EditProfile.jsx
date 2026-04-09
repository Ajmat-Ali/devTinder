import axios from "axios";
import React, { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../redux/user";

const EditProfile = ({ toggleEditing: { setIsEditing } }) => {
  const [errorToUpdateProfile, setErrortoUpdateProfile] = useState("");
  const { user, loading, error } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const profileReducer = (state, { name, value }) => {
    switch (name) {
      case "firstName": {
        const x = { ...state, [name]: value };
        return x;
      }
      case "lastName": {
        return { ...state, [name]: value };
      }
      case "age": {
        return { ...state, [name]: value };
      }
      case "gender": {
        return { ...state, [name]: value };
      }
      case "photoUrl": {
        return { ...state, [name]: value };
      }
      case "skills": {
        return { ...state, [name]: value };
      }
      case "bio": {
        return { ...state, [name]: value };
      }
      default: {
        throw new Error("Invalid type!");
      }
    }
  };

  const [profileForm, profileFormDispatch] = useReducer(profileReducer, user);

  const { firstName, lastName, age, gender, photoUrl, skills, bio } =
    profileForm;

  const handleChangeForm = (e) => {
    const { name, value, type } = e.target;

    profileFormDispatch({
      name: name,
      value: value,
    });
  };

  const handleSaveProfile = async () => {
    const data = {
      firstName,
      lastName,
      age,
      gender,
      bio,
      skills: profileForm.skills.split(" ").filter(Boolean),
    };

    if (photoUrl) {
      data.photoUrl = photoUrl;
    }
    try {
      const res = await axios({
        method: "patch",
        url: BASE_URL + "/profile/edit",
        data: data,
        withCredentials: true,
      });
      dispatch(
        addUser({
          user: { ...profileForm, ...data },
          loading: false,
          error: false,
        }),
      ); //---------------
      setIsEditing(false);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.ERROR || "Something went wrong";
      setErrortoUpdateProfile(errorMessage);
    }
  };

  if (errorToUpdateProfile)
    return (
      <h1 className="text-center mt-10 text-red-500 font-bold">
        {errorToUpdateProfile}
      </h1>
    );

  return (
    <div className="card bg-primary-content/10 w-96 shadow-sm">
      {photoUrl && (
        <figure className=" px-10 pt-10 flex justify-start">
          <img
            src={photoUrl}
            alt="profile-pic"
            className="rounded-full w-10 h-10"
          />
        </figure>
      )}

      <div className="card-body  ">
        <div className="card-title">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input py-5 rounded-lg"
              placeholder="first name"
              name="firstName"
              value={firstName}
              onChange={handleChangeForm}
            />
            {/* <p className="label">Optional</p> */}
          </fieldset>
        </div>
        <div className="card-title">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input py-5 rounded-lg"
              placeholder="last name"
              name="lastName"
              value={lastName}
              onChange={handleChangeForm}
            />
            {/* <p className="label">Optional</p> */}
          </fieldset>
        </div>
        <div className="card-title">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="text"
              className="input py-5 rounded-lg"
              placeholder="age"
              name="age"
              value={age}
              onChange={handleChangeForm}
            />
            {/* <p className="label">Optional</p> */}
          </fieldset>
        </div>
        <div className="card-title">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Gender</legend>
            <select
              //   defaultValue="Pick a gender"
              className="select rounded-lg h-10"
              name="gender"
              value={gender ? gender : "Pick a gender"}
              onChange={handleChangeForm}
            >
              <option disabled={true}>Pick a gender</option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
              <option value={"other"}>Other</option>
            </select>
            {/* <span className="label">Optional</span> */}
          </fieldset>
        </div>
        <div className="mt-3">
          <label htmlFor="photoUrl">PhotoUrl</label>
          <div className="flex flex-col w-full mt-2">
            <label className="input validator ">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </g>
              </svg>
              <input
                type="url"
                required
                placeholder="https://"
                pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                title="Must be valid URL"
                name="photoUrl"
                value={photoUrl}
                onChange={handleChangeForm}
              />
            </label>
            {/* <p className="validator-hint">Must be valid URL</p> */}
          </div>
        </div>

        <div className="card-title">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Skills</legend>
            <input
              type="text"
              className="input"
              placeholder="Type skills here..."
              name="skills"
              value={Array.isArray(skills) ? skills.join(" ") : skills}
              onChange={handleChangeForm}
            />
            {/* <p className="label">Optional</p> */}
          </fieldset>
        </div>
        <div className="card-title">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Your bio</legend>
            <textarea
              className="textarea h-24 rounded-lg"
              placeholder="Bio"
              name="bio"
              value={bio}
              onChange={handleChangeForm}
            ></textarea>
            {/* <div className="label">Optional</div> */}
          </fieldset>
        </div>

        <div className="m-2 space-y-2">
          <button
            onClick={() => setIsEditing(false)}
            className="border border-gray-600 w-full p-2 rounded-lg cursor-pointer hover:bg-red-500"
          >
            Discard
          </button>
          <button
            onClick={handleSaveProfile}
            className="border border-gray-600 w-full p-2 rounded-lg cursor-pointer hover:bg-green-400 hover:text-black"
          >
            Save profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
