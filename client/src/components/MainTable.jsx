import React from "react";
import StudentTable from "./tables/StudentTable";
import TeachersTable from "./tables/TeachersTable";
import MarksTable from "./tables/MarksTable";

export default function MainTable({ table, isAuthenticated }) {
  let tab;
  if (table === "Students") {
    tab = <StudentTable authStatus={isAuthenticated} />;
  } else if (table === "Teachers") {
    tab = <TeachersTable authStatus={isAuthenticated} />;
  } else if (table === "Marks") {
    tab = <MarksTable authStatus={isAuthenticated} />;
  }
  return (
    <div>
      <div className="w-full">{tab}</div>
    </div>
  );
}
