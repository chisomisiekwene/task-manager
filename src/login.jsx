import React, { useState, useContext } from 'react'
import Header from './header'
import loginImg from "./assets/login.svg"
import { useNavigate } from 'react-router-dom'
import {signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "./config/firebaseConfig";
import { AuthContext } from './context/Authcontext';


function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(false)
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("")

    const {dispatch} = useContext(AuthContext)

  function Handlelogin(e){
    e.preventDefault()
      signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        alert('Welcome')
        navigate('/todo-page')
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})

      })
      .catch((error) => {
          setError(true)
          // console.log(error)
      
      });
    }
  

  return (
    <div>
        <Header/>
        <div className="flex flex-col items-center justify-center w-full py-[30px]">
          <div className="flex flex-col items-center justify-center m-auto md:w-[800px] w-[80%] gap-[40px]">
              <h1 className='font-bold text-[20px] md:text-[40px] text-center'>Welcome Back!</h1>
              <div className="w-full h-[200px] flex justify-center">
                  <img src={loginImg} alt=""  className='w-full'/>    
              </div>
              <form onSubmit={Handlelogin} className="w-full flex flex-col gap-[10px]"> 
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
                      className='font-bold text-white text-[24px] bg-[#50C2C9] w-full p-[10px]'
                  >
                      Sign in
                  </button>
                
                  {error && alert('Wrong Email or password')}
              </form>
          </div>
        </div>
      </div>
  )
}

export default Login