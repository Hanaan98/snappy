import React, { useState } from "react";

function Friends(props) {
  const clickHandler = () => {
    props.onClick(props.username);
  };
  let classname;
  if (props.Selected) {
    classname = "bg-[#41bee7] px-2 py-3 w-full cursor-pointer rounded-md";
  } else {
    classname = "bg-[#ffffff39] px-2 py-3 w-full cursor-pointer rounded-md";
  }
  return (
    <div className={classname} onClick={clickHandler}>
      <div className="grid grid-cols-[auto,1fr] items-center gap-2">
        <img
          className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <h1 className="text-white text-xl font-bold">{props.username}</h1>
      </div>
    </div>
  );
}

export default Friends;
