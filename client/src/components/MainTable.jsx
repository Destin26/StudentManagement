import React from "react";
import StudentTable from "./tables/StudentTable";
import TeachersTable from "./tables/TeachersTable";
import MarksTable from "./tables/MarksTable";
import AddStudent from "./editing/AddStudent";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function MainTable({ table, isAuthenticated, verifyAuth }) {
  let tab;
  if (table === "Students") {
    tab = <StudentTable authStatus={isAuthenticated} verifyAuth={verifyAuth} />;
  } else if (table === "Teachers") {
    tab = (
      <TeachersTable authStatus={isAuthenticated} verifyAuth={verifyAuth} />
    );
  } else if (table === "Marks") {
    tab = <MarksTable authStatus={isAuthenticated} verifyAuth={verifyAuth} />;
  }
  return (
    <div className="ml-4">
      <div className="w-full">{tab}</div>

      {table === "Students" && (
        <>
          <Link to={"/students/add"}>
            <button
              className="p-2 bg-gradient-to-b rounded mt-2 from-slate-400 to-slate-300 hover:from-slate-300 hover:to-slate-400"
              onClick={() => {}}
            >
              Add Student
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
