import React from "react";
import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function DeletePop(props) {
  const [display,setDisplay] = useState(false);
  
  console.log(props);
  const handleDelete = () =>{
  }
  return (
    <div>
      <button onClick={handleDelete}>
          Delete
      </button>
    </div>
  );
}
