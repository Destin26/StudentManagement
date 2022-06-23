import React from "react";
import { useState } from "react";

export default function TableFilter(props) {
  const [classId, setClassId] = useState(1);

  const handleSelectChange = (e) => {
    // console.log(e.target.value);
    setClassId(e.target.value);
  };

  return (
    <div className="w-full bg-white h-[50px]">
      <ul className="flex h-full items-center">
        <li>
          <span className="font-semibold">Class:</span>
          <select onChange={handleSelectChange} value={classId}>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </li>
        <li
          className="rounded cursor-pointer bg-white border-[1px] ml-4 border-black p-2 shadow-md"
          onClick={() => props.sendClassId(classId)}
        >
          Filter
        </li>
      </ul>
    </div>
  );
}
