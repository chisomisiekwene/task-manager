import React, { useState } from 'react'
import Header from './header'
import loginImg from "./assets/login.svg"
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from "./config/firebaseConfig.js"
import { signOut } from "firebase/auth"



function Login() {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("")
    const[user, setUser] = useState([]);

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })

    const login = async(e) => {
        e.preventDefault()
      try{
        const user = await createUserWithEmailAndPassword(
          auth, 
          loginEmail, 
          loginPassword
        );
        console.log(user)
      } catch (error){
        console.log(error.message);
      }

    }

    const logout = async () => {
        await signOut(auth)
    }

  return (
    <div>
        <Header/>
        <div className="flex flex-col items-center justify-center w-full py-[30px]">
        <div className="flex flex-col items-center justify-center m-auto md:w-[800px] w-[80%] gap-[40px]">
            <h1 className='font-bold text-[20px] md:text-[40px] text-center'>Welcome Back!</h1>
            <p>{user?.email}</p>
            <div className="w-full h-[200px] bg-black flex justify-center">
                <img src={loginImg} alt=""  className='w-[2000px]'/>    
            </div>
            <form action="" className="w-full flex flex-col gap-[10px]"> 
                <input 
                    type="email" 
                    name=""  
                    placeholder="Enter your email address" 
                    className="w-full p-[15px] rounded-[20px]"
                    onChange={(event) => {
                        setLoginEmail(event.target.value)
                      }}
                /><br/>
                <input 
                    type="password" 
                    placeholder='Enter your password' 
                    className="w-full p-[15px] rounded-[20px]"
                    onChange={(event) => {
                        setLoginPassword(event.target.value)
                      }}
                /><br/>
                <button 
                    onClick={login}
                    className='font-bold text-white text-[24px] bg-[#50C2C9] w-full p-[10px]'
                >
                    Sign in
                </button>
                <button 
                    onClick={logout}
                    className='font-bold text-white text-[24px] bg-[#50C2C9] w-full p-[10px]'
                >
                    Sign out
                </button>
            </form>
        </div>
        </div>
        </div>
  )
}

export default Login