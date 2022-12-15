import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state";

export default function Navbar() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Node Social Network</a>
      </div>
      {user ? (
        <div className="flex-none">
          <p className="font-semibold text-lg mr-1">{user}</p>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li onClick={() => dispatch(setLogout())}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div
          className="flex-none cursor-pointer"
          onClick={() => navigate("/login")}
        >
          <p className="font-semibold text-lg mr-1">Login</p>
        </div>
      )}
    </div>
  );
}
