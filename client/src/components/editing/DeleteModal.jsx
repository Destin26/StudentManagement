import React from "react";

export default function DeleteModal(props){
    const classname = 'w-full h-full hidden rounded-sm bg-[#000000] bg-opacity-50 fixed items-center justify-center'


    return(
        <div className={classname}>
            <button className="rounded-md  w-[70px] h-[30px] bg-red-600 shadow-md text-white">
                 Confirm?
            </button>
        </div>
    )
}