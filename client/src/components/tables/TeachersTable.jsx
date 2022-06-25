import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "./Table";
import { Cookies } from "react-cookie";

export default function TeachersTable(props) {
  const cookie = new Cookies();
  const [teacherData, setTeacherData] = useState(null);
  const { verifyAuth } = props;
  // console.log(teacherData);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/teachers",
      headers: {
        authorization: "Bearer " + cookie.get("accesstoken"),
      },
    })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setTeacherData(data.teachers);
      })
      .catch((err) => {
        if (err) return verifyAuth(err.response.data.auth);
        // console.log(err);
      });
  }, []);

  return (
    <div className="w-full">
      {teacherData && <Table data={teacherData} table="Teacher" />}
    </div>
  );
}
