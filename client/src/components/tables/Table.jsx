import React from "react";

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
          <td onClick={() => getId(data.id)}>Edit</td>
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
