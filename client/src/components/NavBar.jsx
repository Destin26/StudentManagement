import axios from "axios";
import React from "react";
import { Cookies } from "react-cookie";

export default function NavBar(props) {
  const cookie = new Cookies();
  const accessToken = cookie.get("accesstoken");
  const refreshToken = cookie.get("refreshToken");
  let isAdmin = false;
  if (props.user !== null) {
    isAdmin = props.user.isAdmin;
  }
  const logOut = () => {
    try {
      axios({
        method: "post",
        url: "http://localhost:3000/api/users/logout",
        data: {
          Hello: "Hello",
        },
        headers: {
          authorization: "Bearer " + refreshToken,
        },
      }).then((res) => {
        props.getLogout(res.data.auth);
        cookie.remove("refreshToken");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="w-full">
      <div className="h-[65px] bg-slate-400 flex-grow flex p-2 items-center">
        <div>
          <p className="font-semibold">
            {isAdmin ? "Admin" : "Teacher"} Dashboard
          </p>
        </div>
        {!props.authStatus ? (
          <div
            className="ml-auto cursor-pointer"
            onClick={() => props.showLogin(true)}
          >
            Login
          </div>
        ) : (
          <div className="ml-auto">
            <ul className="flex gap-1">
              {props.user ? (
                <li>{props.user.username.toUpperCase()}</li>
              ) : (
                <li>user</li>
              )}
              <li className=" cursor-pointer" onClick={logOut}>
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
