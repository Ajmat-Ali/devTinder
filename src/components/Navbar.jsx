import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../redux/user";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      const res = await axios({
        method: "delete",
        url: BASE_URL + "/logout",
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(removeUser({ user: null, loading: false, error: false }));
        navigate("/login");
      }
    } catch (error) {
      console.log(error?.Response?.data);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 ">
          {/* {console.log(user.photoUrl)} */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {user?.photoUrl ? (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoUrl}
                  />
                ) : (
                  <div className="text-2xl w-full h-full rounded-full bg-white text-black ">
                    {user?.firstName[0].toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/userConnection"}>All Connection</Link>
              </li>
              <li>
                <Link to={"/userRequest"}>All Request</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
