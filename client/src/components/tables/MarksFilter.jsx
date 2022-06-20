import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function MarksFilter(props) {
  const [classId, setClassId] = useState(1);
  const [subject, setSubject] = useState(1);
  const [exam, setExam] = useState(1);
  const [arr, setArr] = useState({
    filter: { class: 1, subject: 1, exam: 1 },
  });

  useEffect(() => {
    setArr({ filter: { class: classId, subject: subject, exam: exam } });
  }, [classId, subject, exam]);

  const handleSelectChange = (e) => {
    setClassId(e.target.value);
  };
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const handleExamChange = (e) => {
    setExam(e.target.value);
  };

  useEffect(() => {
    console.log("initialized: ", arr);
    props.sendFilters(arr);
  }, []);

  return (
    <div className="w-full bg-white h-[50px]">
      <ul className="flex items-center gap-2 h-full">
        <li>
          <span className="font-semibold">Class: </span>
          <select onChange={handleSelectChange} value={classId}>
            <option value={1}>A</option>
            <option value={2}>B</option>
          </select>
        </li>
        <li>
          <span className="font-semibold">Subject:</span>
          <select onChange={handleSubjectChange} value={subject}>
            <option value={1}>English</option>
            <option value={2}>Maths</option>
            <option value={3}>Science</option>
            <option value={5}>History</option>
          </select>
        </li>
        <li>
          <span className="font-semibold">Exam: </span>
          <select
            onChange={handleExamChange}
            value={exam}
            className="text-center"
          >
            <option value={1}>FirstTerm</option>
            <option value={2}>SecondTerm</option>
            <option value={3}>ThirdTerm</option>
          </select>
        </li>

        <li
          className="rounded cursor-pointer bg-white border-[1px] border-black p-2 shadow-md"
          onClick={() => {
            console.log(arr);
            props.sendFilters(arr);
          }}
        >
          Filter
        </li>
      </ul>
    </div>
  );
}
