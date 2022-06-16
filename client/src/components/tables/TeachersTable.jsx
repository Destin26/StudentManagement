import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "./Table";

export default function TeachersTable(props) {
  const [teacherData, setTeacherData] = useState(null);
  console.log(teacherData);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/teachers")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setTeacherData(data.teachers);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="w-full">{teacherData && <Table data={teacherData} />}</div>
  );
}
