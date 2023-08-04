import React from "react";

function UserTab(props) {
  return (
    <div className="flex items-center bg-[#0d0d30] px-2 py-4 justify-center gap-5 absolute w-full bottom-0">
      <img
        className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <h1 className="text-white text-xl font-bold">{props.username}</h1>
    </div>
  );
}

export default UserTab;
