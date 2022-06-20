import React from "react";

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
            Students
          </li>
          <li
            className="text-[20px] cursor-pointer"
            onClick={() => {
              props.sendTable("Teachers");
            }}
          >
            Teachers
          </li>
          <li
            className="text-[20px] cursor-pointer"
            onClick={() => {
              props.sendTable("Marks");
            }}
          >
            Marks
          </li>
        </ul>
      </div>
    </nav>
  );
}
