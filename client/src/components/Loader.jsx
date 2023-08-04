import React from "react";
import LoaderImg from "../assets/loader.gif";
function Loader() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[#131324]">
      <img src={LoaderImg} alt="Loading..." />
    </div>
  );
}

export default Loader;
