import React, { useState } from "react";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, statusQuery } from "./config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { BsEyeSlash } from "react-icons/bs";

function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState();
  const { LOADING, SUCCESS, ERROR } = statusQuery;
  const [showPassword, setShowPassword] = useState();


  const Handlesignup = async (e) => {
    e.preventDefault();
    setStatus(LOADING);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(res, "res");
      await setDoc(doc(db, "users", res?.user?.uid), {
        name: userName,
        email: registerEmail,
      })
        .then(() => {
          // Signed up
          setStatus(SUCCESS);
          toast.success("Signed up successfully");
          navigate("/login");
          console.log(userName);
        })
        .catch((error) => {
          setStatus(ERROR);
          toast.error(error.message);
          // ..
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center w-full py-[30px]">
        <div className="flex flex-col justify-center m-auto md:w-[800px] w-[80%] gap-[40px]">
          <div className="">
            <h1 className="font-bold text-[20px] md:text-[40px] text-center">
              Welcome Onboard
            </h1>
            <p className="text-center text-[14px] md:text-[20px] text-[#6B7280]">
              Lets us help you meet your Task!
            </p>
          </div>

          {/* form */}
          <form
            onSubmit={Handlesignup}
            autoComplete="off"
            action=""
            className="w-full flex flex-col"
          >
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-[15px] rounded-[20px]"
              required
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
            <br />
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full p-[15px] rounded-[20px]"
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
              value={registerEmail}
            />
            <br />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                className="w-full p-[15px] rounded-[20px]"
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
                value={registerPassword}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-2 bottom-[50%] translate-y-[50%]"
              >
                <BsEyeSlash className="w-[30px]" />
              </div>
            </div>

            <br />
            <button
              type="submit"
              className="font-bold text-white text-[24px] bg-[#50C2C9] w-full p-[6px] rounded-lg cursor-pointer"
            >
              {status === LOADING ? (
                <FaSpinner className="mx-auto md-text-[20px] animate-spin" />
              ) : (
                "Sign up"
              )}
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
