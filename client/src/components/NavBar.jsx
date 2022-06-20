import React from "react";

export default function NavBar(props) {
  let isAdmin = false;
  if (props.user !== null) {
    isAdmin = props.user.isAdmin;
  }
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
              <li>{props.user.username.toUpperCase()}</li>
              <li>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
