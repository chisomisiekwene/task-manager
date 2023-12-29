
import React, { useEffect, useState } from "react";
import userEdit from "./assets/user-edit.svg";
import Header from "./header";
import users from "./assets/userImg.svg";
import { BsFillTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { TbLogout2 } from "react-icons/tb";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  Firestore,
  getFirestore,
} from "firebase/firestore";
import { auth, db, statusQuery, storage } from "./config/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";


function Todo() {
  const [todo, setTodo] = useState(" ");
  const [todoLists, setTodoLists] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [todoId, setTodoId] = useState("");
  const username = JSON.parse(localStorage.getItem("name"));
  const [status, setStatus] = useState();
  const { LOADING, SUCCESS, ERROR } = statusQuery;
  const [img, setImg] = useState("")
  const [imgUrl, setImgUrl] = useState([])


  const navigate = useNavigate()

  function handleTodo(event) {
    setTodo(event.target.value);
  }

  const fetchData = async () => {
    let list = [];
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
        // list.push(doc.data());
      });
      setTodoLists(list);
      console.log(todoLists, "todo");
    } catch (err) {
      console.log(err);
    }
  };
  const userId = auth?.currentUser?.uid;
  const addTask = async (e) => {
    e.preventDefault();
    setStatus(LOADING);
    if (todo === " ") {
      setStatus(ERROR)
      toast.error("Please enter a todo");
    } else {
      const todos = { todo: todo, completed: false, uid: userId };
      try {
        await addDoc(collection(db, "todos"), todos).then((res) => {
          setStatus(SUCCESS);
          setTodo("");
          toast.success("Todo added successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log(res);
          fetchData();
        });
      } catch (error) {
        setStatus(ERROR)
      toast.error(error.message)
      }
    }
  };
  const completeTask = async (todo) => {
    try {
      const todoRef = doc(db, "todos", todo?.id);
      await updateDoc(todoRef, {
        completed: !todo.completed,
      }).then((res) => {
        setStatus(SUCCESS);
        toast.success("Completed", {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchData();
      });
    } catch (error) {
      setStatus(ERROR)
      toast.error(error.message)
    }
  };

  // delete data
  const deleteTask = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete?');
    if (isConfirmed) {
      try {
        await deleteDoc(doc(db, "todos", id)).then((res) => {
          setStatus(SUCCESS);
            toast.success("Todo deleted", {
              position: toast.POSITION.TOP_RIGHT,
            });
          fetchData();
        });
        
      } catch (error) {
        setStatus(ERROR)
        toast.error(error.message)
      }
    } else {
      console.log('Canceled deletion');
    }
  }

  const handleEdit = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTodoId(todo.id);
  };

  const editTask = async (e) => {
    e.preventDefault();
    setStatus(LOADING);
    const todoRef = doc(db, "todos", todoId);
    try {
      await updateDoc(todoRef, {
        todo: todo,
      }).then((res) => {
        setStatus(SUCCESS);
        fetchData();
        toast.success("Todo edited successfully");
        setTodo("");
        setIsEdit(false);
      });
    } catch (error) {
      setStatus(ERROR)
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const logout = async() => {
    try {
      await signOut(auth);
      navigate("/login")
    } catch (err) {
      console.log(err);
    }
  };

 const capitalizedUserName = username?.charAt(0).toUpperCase() + username?.slice(1);

  return (
    <>
      <div className="white">
        <div className="bg-[#50C2C9]">
          <Header />
          <div className="flex flex-col gap-[20px] justify-center items-center py-[50px]">
          <div className="relative  flex justify-center w-[fit-content]">
              <div className="bg-color md:w-[214px] w-[96px] md:h-[214px] h-[96px] flex items-center justify-center md:rounded-[214px] rounded-[96px] border border-[#26D9C4] border-[7px] bg-[#C0D9BF]">
                <p className="font-bold md:text-[100px] text-[50px]">{capitalizedUserName[0]}</p>
             
              </div>
            </div>
            <p className="text-center font-bold text-[16px] md:text-[25px]">
              Welcome {capitalizedUserName}
            </p>
          </div>
          <div className="bg-[#E6E6E6] p-[20px] flex flex-col gap-[20px] justify-center items-center">
            <h1 className="text-[16px] md:text-[32px] font-bold">TODO LIST</h1>{" "}
            <div className="bg-[#ffffff] md:p-[20px] md:p-[30px] p-[20px] rounded-[21px] md:h-[500px] h-[400px] md:w-[50%] w-full flex flex-col gap-[30px] overflow-scroll">
              <form className="flex justify-between w-full md:gap-[20px] gap-[10px]">
                <input
                  type="text"
                  required
                  placeholder="Enter your new task"
                  className="p-[10px] border md:w-[85%] w-[70%]"
                  value={todo}
                  onChange={handleTodo}
                />
                <button
                  type="submit"
                  className="text-center text-white md:text-[18px] text-[13px] font-bold md:w-[15%] p-[5px] w-[30%] border bg-[#50C2C9] cursor-pointer"
                  onClick={isEdit ? editTask : addTask}
                >
                  {status === LOADING ? (
                    <FaSpinner className="mx-auto md-text-[20px] animate-spin" />
                  ) : isEdit ? (
                    "EDIT TASK"
                  ) : (
                    "ADD TASK"
                  )}
                </button>
              </form>
              <div className="tasks flex flex-col gap-[30px] overflow-auto">
                {todoLists.map(
                  (item, index) =>
                    item.uid === userId && (
                      <div
                        key={index}
                        className="taskItem flex gap-[20px] justify-between items-center"
                      >
                        <div className="flex gap-[20px] cursor-pointer">
                          <input
                            type="checkbox"
                            onChange={() => completeTask(item)}
                            checked={item.completed ? "checked" : ""}
                          />
                          <p
                            onClick={() => completeTask(item)}
                            className={item.completed ? "line-through" : " "}
                          >
                            {item?.todo}
                          </p>
                        </div>
                        <div className="todo-icons flex gap-[10px]">
                          <BsFillTrashFill
                            className="fill-[#000000] cursor-pointer"
                            onClick={() => deleteTask(item.id)}
                          />

                          <BsPencilSquare
                            className="fill-[#000000] cursor-pointer mr-[10px]"
                            onClick={() => handleEdit(item)}
                          />
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
            <button
              onClick={logout}
              className=" text-red-500 flex items-center gap-[7px] bg-[#fff] px-[20px] py-[10px] rounded-lg cursor-pointer"
            >
              <TbLogout2 siz={24} />
              <p className="font-bold text-[10px] md:text-[24px] text-center cursor-pointer">
                Log out
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
