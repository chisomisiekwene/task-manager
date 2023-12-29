import React, { useContext } from "react";
import shape from "./assets/Shape.png";

function Header() {
  
  return (
    <div className="flex justify-between">
      <div className="md:w-[500px] w-[214px] h-[168px]">
        <img src={shape} alt="" className="w-full" />
      </div>
      <div className="headerText py-[20px] md:px-[70px] px-[30px]">
        <h1
          className="font-bold text-[14px] md:text-[24px] cursor-pointer"
        >
          TODO APP
        </h1>
      </div>
    </div>
  );
}

export default Header;
