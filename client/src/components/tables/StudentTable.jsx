import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "./Table";

export default function StudentTable(props) {
  const [studentData, setStudentData] = useState(null);
  console.log(studentData);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/students")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setStudentData(data.students);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="w-full">{studentData && <Table data={studentData} />}</div>
  );
}
