import axios from "axios";
import React, { useEffect, useState } from "react";
import MarksFilter from "./MarksFilter";
import Table from "./Table";
import TableFilter from "./TableFilter";
import { Cookies } from "react-cookie";

export default function MarksTable(props) {
  const cookie = new Cookies();
  const [marksData, setMarksData] = useState(null);
  const [classId, setClassId] = useState(1);
  const [filter, setFilter] = useState(null);

  const getClassId = (value) => {
    setFilter(value);
    // console.log(value);
  };

  const getFilters = (arr) => {
    if (arr !== null) {
      // console.log("sdasdasd", arr);
      setFilter(arr);
      // console.log("Filter Reciede successfully", filter);
    }
  };

  useEffect(() => {
    if (filter) {
      axios({
        method: "post",
        url: "http://localhost:3000/api/marks/subject",
        data: filter,
        headers: {
          authorization: "Bearer " + cookie.get("accesstoken"),
        },
      })
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setMarksData(data.marks);
        })
        .catch((err) => {
          if (err) return props.verifyAuth(err.response.data.auth);
          console.error(err);
        });
    }
    // axios
    //   .get("http://localhost:3000/api/marks/subject")
    //   .then((res) => {
    //     return res.data;
    //   })
    //   .then((data) => {
    //     setMarksData(data.marks);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }, [filter]);

  return (
    <div className="w-full">
      <MarksFilter sendFilters={getFilters} />
      {marksData && <Table data={marksData} table="Mark" />}
    </div>
  );
}
