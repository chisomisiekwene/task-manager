import React from "react";
import Header from "./header";
import { Navigate, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center w-full py-[30px]">
        <div className="flex flex-col justify-center m-auto md:w-[800px] w-[80%] gap-[40px]">
          <div className="">
            <h1 className="font-bold text-[20px] md:text-[40px] text-center">
              Welcome Onboard
            </h1>
            <p className="text-center text-[14px] md:text-[20px] text-[#6B7280]">Let’s help you to meet your Task!</p>
          </div>

          {/* form */}
          <form action="" className="w-full flex flex-col gap-[10px]">
              <input type="email" placeholder="Enter your email address" className="w-full p-[15px] rounded-[20px]"/><br/>
            
              <input type="tel" placeholder="Enter your Phone number" className="w-full p-[15px] rounded-[20px]"/><br/>
            
              <input type="text" placeholder="Enter your username" className="w-full p-[15px] rounded-[20px]"/><br/>
            
              <input type="password" placeholder="Enter your password" className="w-full p-[15px] rounded-[20px]"/><br/>

              <button 
                    onClick={() => navigate('/login')}
                    className='font-bold text-white text-[24px] bg-[#50C2C9] w-full p-[10px]'
                >
                    Sign up
                </button>
            
          </form>
          <p className="text-center">Already have an account? <span>Sign in</span></p>
        </div>

      </div>
    </div>
  );
}

export default Register;
