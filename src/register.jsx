import React, { useState } from "react";
import Header from "./header";
import { Navigate, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebaseConfig";

function Register() {
    const navigate = useNavigate();
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("")
    const [emailExists, setEmailExists] = useState(false)
    

const Handlesignup = (e) => {
  e.preventDefault()
  createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
  .then((userCredential) => {
    alert('You have Signed up successfully')
    const user = userCredential.user;
    console.log(user)
    navigate('/login')
  })
  .catch((error) => {
    if (error.code === 'auth/email-already-in-use') {
      setEmailExists(true)
    } else {
      console.log(error)
    }
  });
}
  
    
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
          <form onSubmit={Handlesignup} action="" className="w-full flex flex-col gap-[10px]">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full p-[15px] rounded-[20px]"
                onChange={(event) => {
                  setRegisterEmail(event.target.value)
                }}
              /><br/>
            
              {/* <input type="tel" placeholder="Enter your Phone number" className="w-full p-[15px] rounded-[20px]"/><br/>
            
              <input type="text" placeholder="Enter your username" className="w-full p-[15px] rounded-[20px]"/><br/>
             */}
              <input type="password" 
                placeholder="Enter your password" 
                className="w-full p-[15px] rounded-[20px]"
                onChange={(event) => {
                  setRegisterPassword(event.target.value)
                }}
              />
              <br/>

            {emailExists && alert('Email already exists')}


              <button 
                    type="submit"
                    className='font-bold text-white text-[24px] bg-[#50C2C9] w-full p-[10px]'
                >
                    Sign up
                </button>
            
          </form>
          <p className="text-center">Already have an account? <span onClick={() => navigate('/login')}>Sign in</span></p>
        </div>

      </div>
    </div>
  );
}

export default Register;
