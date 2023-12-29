import React, { useState, useContext } from "react";
import Header from "./header";
import loginImg from "./assets/login.svg";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, statusQuery } from "./config/firebaseConfig";
import { get, child } from "firebase/database";
import { AuthContext } from "./context/Authcontext";
import { collection, doc, getDoc } from "firebase/firestore";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { BsEyeSlash } from "react-icons/bs";

function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [status, setStatus] = useState();
  const [showPassword, setShowPassword] = useState();
  const { LOADING, SUCCESS, ERROR } = statusQuery;

  const { dispatch } = useContext(AuthContext);
  const userId = auth?.currentUser?.uid;

  const fetchUser = async () => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userDisplayName = docSnap.data().name;
      localStorage.setItem("name", JSON.stringify(userDisplayName));
    } else {
      console.log("No such document!");
    }
  };

  const Handlelogin = (e) => {
    setStatus(LOADING);
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        // Signed in
        setStatus(SUCCESS);
        toast.success("Logged in successfully");
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/todo-page");
        fetchUser();
        console.log(user);
      })
      .catch((error) => {
        setStatus(ERROR);
        toast.error(error.message);
      });
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center w-full py-[30px]">
        <div className="flex flex-col items-center justify-center m-auto md:w-[800px] w-[80%] gap-[40px]">
          <div className="w-full h-[100px] flex justify-center">
            <img src={loginImg} alt="" className="w-full" />
          </div>
          <h1 className="font-bold text-[20px] md:text-[40px] text-center">
            Welcome Back!
          </h1>
          <form
            autoComplete="off"
            onSubmit={Handlelogin}
            className="w-full flex flex-col"
          >
            <input
              type="email"
              name=""
              placeholder="Enter your email address"
              className="w-full p-[15px] rounded-[20px]"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
            <br />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-[15px] rounded-[20px]"
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className=" cursor-pointer absolute right-2 bottom-[50%] translate-y-[50%]"
              >
                <BsEyeSlash className="w-[30px]" />
              </div>
            </div>
            <br />
            <div></div>
            <button className="font-bold text-white text-[24px] bg-[#50C2C9] w-full p-[6px] rounded-lg">
              {status === LOADING ? (
                <FaSpinner className="mx-auto md-text-[20px] animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          <p className="text-[12px] text-center mt-2">
            Don't have an account?
            <span
              onClick={() => navigate("/signup")}
              className="text-[#50C2C9] cursor-pointer"
            >
              {" "}
              Create one here
            </span>
          </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
