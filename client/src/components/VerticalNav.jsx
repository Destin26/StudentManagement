import React from "react";
import { Link } from "react-router-dom";

export default function Verticalnav(props) {
  return (
    <nav className="h-screen">
      <div className="w-[200px] bg-white shadow-lg h-full">
        <ul className="p-2">
          <li
            className="text-[20px] cursor-pointer"
            onClick={() => {
              props.sendTable("Students");
            }}
          >
            <Link to={"/"}>Students</Link>
          </li>
          <li
            className="text-[20px] cursor-pointer"
            onClick={() => {
              props.sendTable("Teachers");
            }}
          >
            <Link to={"/"}>Teachers</Link>
          </li>
          <li
            className="text-[20px] cursor-pointer"
            onClick={() => {
              props.sendTable("Marks");
            }}
          >
            <Link to={"/"}>Marks</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
