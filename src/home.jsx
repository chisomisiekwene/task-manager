import React from "react";
import homepagePicture from "./assets/home.svg";
import Header from "./header";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-[50px]">
      <Header />
      <div className="flex flex-col justify-center items-center gap-[50px]">
        <p className=" text-[18px] md:text-[32px] text-center">
          Welcome to our todo app
        </p>
        <div className="w-full h-[100px] flex justify-center">
          <img src={homepagePicture} alt="" className="w-[2000px]" />
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={() => navigate("/signup")}
            className="font-bold text-[#fff] md:text-[18px] md:w-[300px] text-[16px] bg-[#50C2C9] md:py-[10px] md:px-[20px] py-[10px] px-[16px] rounded-lg"
          >
            Lets get started
          </button>
          <p className="text-center text-[12px] mt-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#50C2C9] cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
