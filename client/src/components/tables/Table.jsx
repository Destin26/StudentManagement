import React from "react";
import { Link } from "react-router-dom";
import DeletePop from "../editing/DeletePop";

export default function Table(props) {
  const column = Object.keys(props.data[0]);
  // get table heading data
  const ThData = () => {
    return column.map((data) => {
      return (
        <th className="border-[1px] border-slate-500 w-auto p-2" key={data}>
          {data.toUpperCase()}
        </th>
      );
    });
  };

  const getId = (id) => {
    console.log(id);
  };
  // get table row data
  const tdData = () => {
    return props.data.map((data) => {
      return (
        <tr>
          {column.map((v) => {
            return (
              <td className="border-[1px] border-slate-300 w-auto p-2" key={v}>
                {data[v]}
              </td>
            );
          })}
          <td
            onClick={() => getId(data.id)}
            className="px-4  w-[20px] cursor-pointer font-semibold"
            key={data}
          >
            <Link to={`/${props.table.toLowerCase()}/${data.id}`}>Edit</Link>
          </td>
          <td>
            <DeletePop id={data.id}  />
          </td>
        </tr>
      );
    });
  };
  return (
    <table className="table-auto border-collapse w-full">
      <thead>
        <tr className="">{ThData()}</tr>
      </thead>
      <tbody>{tdData()}</tbody>
    </table>
  );
}
