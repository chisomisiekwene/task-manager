import React from 'react'
import Header from './header'
import login from "./assets/login.svg"
import { useNavigate } from 'react-router-dom'


function Login() {
    const navigate = useNavigate();

  return (
    <div>
        <Header/>
        <div className="flex flex-col items-center justify-center w-full py-[30px]">
        <div className="flex flex-col justify-center m-auto md:w-[800px] w-[80%] gap-[40px]">
            <h1 className='font-bold text-[20px] md:text-[40px] text-center'>Welcome Back!</h1>
            <div className="w-full h-[200px] flex justify-center">
            <img src={login} alt=""  className='w-[2000px]'/>    
            </div>
            <form action="" className="w-full flex flex-col gap-[10px]"> 
                <input type="email" name=""  placeholder="Enter your email address" id="" className="w-full p-[15px] rounded-[20px]"/><br/>
                <input type="password" placeholder='Enter your password' name="" id="" className="w-full p-[15px] rounded-[20px]"/><br/>
                <button 
                    onClick={() => navigate('/todo-page')}
                    className='font-bold text-white text-[24px] bg-[#50C2C9] w-full p-[10px]'
                >
                    Sign in
                </button>
            </form>
        </div>
        </div>
        </div>
  )
}

export default Login