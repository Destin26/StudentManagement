import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function DeletePop(props) {
  console.log(props);
  return (
    <Popup trigger={<button>Delete</button>} position="bottom">
      <p>Hello</p>
      <p>{props.id}</p>
    </Popup>
  );
}
