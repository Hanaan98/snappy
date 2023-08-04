import React from "react";
import robo from "../../src/assets/robot.gif";
function DefaultScreen(props) {
  return (
    <div className="col-span-3 w-full h-full flex flex-col justify-center items-center">
      <img src={robo} alt="" className="w-96 h-96" />
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="text-white text-2xl font-bold">
          Welcome, <span className="text-[#4e0eff]">{props.username}</span>
        </h1>
        <p className="text-white ">Please select a chat to Start Messaging</p>
      </div>
    </div>
  );
}

export default DefaultScreen;
