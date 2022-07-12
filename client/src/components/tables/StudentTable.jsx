import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "./Table";
import TableFilter from "./TableFilter";
import { Cookies } from "react-cookie";

export default function StudentTable(props) {
  const cookie = new Cookies();

  const [studentData, setStudentData] = useState(null);
  const [classId, setClassId] = useState(1);

  const getClassId = (value) => {
    setClassId(value);
    console.log(classId);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/students/v2",
      params: {
        classid: classId,
      },
      headers: {
        authorization: "Bearer " + cookie.get("accesstoken"),
      },
    })
      .then((res) => {
        console.log("Student Response", res);
        return res.data;
      })
      .then((data) => {
        setStudentData(data.students);
      })
      .catch((err) => {
        if (err) return props.verifyAuth(err.response.data.auth);
        // console.log(err);
      });

    // axios
    //   .get("http://localhost:3000/api/students", {
    //     params: {
    //       classid: classId,
    //     },
    //   })
    //   .then((res) => {
    //     return res.data;
    //   })
    //   .then((data) => {
    //     setStudentData(data.students);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }, [classId]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/students", {
  //       params: {
  //         classid: classId,
  //       },
  //     })
  //     .then((res) => {
  //       return res.data;
  //     })
  //     .then((data) => {
  //       setStudentData(data.students);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  return (
    <div className="w-full">
      <TableFilter sendClassId={getClassId} />
      {studentData && <Table data={studentData} table="Student" />}
    </div>
  );
}
