import { React, useState, useContext, useEffect } from "react";
import Header from "./header";
import users from "./assets/userImg.svg";
import addbtn from "./assets/Plus Button.svg";
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { auth, db } from "./config/firebaseConfig";
import { useForm } from "react-hook-form";
import {
  collection,
  addDoc,
  setDoc,
  serverTimestamp,
  query,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { AuthContext } from "./context/Authcontext";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { onAuthStateChanged } from "firebase/auth"
// import { auth } from "./config/firebaseConfig.js"

function Todo() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [createTodo, setCreateTodo] = useState("");
  const [selectedTodo, setSelectedTodo] = useState();
  const [Todo, setTodo] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todoArray = [];
      QuerySnapshot.forEach((doc) => {
        todoArray.push({ ...doc.data(), id: doc.id });
      });
      setTodo(todoArray);
    });
    return () => unsubscribe();
  }, []);

  const AddTask = async (data) => {
    // try{
    //   const todoRef = doc(db, "users", "todo");
    //   await setDoc(todoRef, {
    //     ...Todo,
    //     timeStamp: serverTimestamp(),
    //   });
    // }catch(error){
    //   console.log(error);
    // }

    // console.log(Todo);

    // const TodoItem = createTodo;
    // setTodo((prevTodo) => [...prevTodo, { id: Date.now(), todo: TodoItem }]);
    // setCreateTodo(" ");
    // if (createTodo === "") {
    //   alert("Please enter a valid todo");
    //   return;
    // }
    await addDoc(collection(db, "todos"), {
      todo: data.todo,
      completed: false,
    });
    // setCreateTodo("");
    reset()
  };

  // completetodo
  const toggleComplete = async (Todo) => {
    await updateDoc(doc(db, "todos", Todo.id), {
      completed: !Todo.completed,
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  // const handleEditTodo = async (Todo) => {
  //   await updateDoc(doc(db, "todos", Todo.id), {
  //     Todo: selectedTodo,
  //   });
  // };

  const handleEditTodo = (todo) => {
    setIsEditing(true);
    setSelectedTodo(todo);
  };

  const UpdateTask = async (data) => {
    await updateDoc(doc(db, "todos", selectedTodo.id), {
      todo: data.todo,
    });
    setIsEditing(false);
    setSelectedTodo([]);
    reset()
  };

  // const UpdateTask = (updatedTodo) => {
  //   setTodo((prevArray) =>
  //     prevArray.map((details) => {
  //       if (details.id === updatedTodo.id) {
  //         return {
  //           ...details,
  //           todo: updatedTodo.todo,
  //         };
  //       }
  //       return details;
  //     })
  //   );
  //   setIsEditing(false);
  //   setSelectedTodo([]);
  // };

  useEffect(() => {
    isEditing && setValue('todo', selectedTodo?.todo)
  }, [isEditing])

  const onSubmit = (data) => {
    isEditing ? UpdateTask(data) : AddTask(data);
  };
  return (
    <div className="bg-[#50C2C9]">
    <div className="bg-[#50C2C9] h-[500px]">

      <Header/>
      {/* <div className="flex flex-col gap-[20px] justify-center py-[50px]">÷\ */}
      <h1 className="text-[16px] md:text-[32px] text-center font-bold mt-[230px] text-white" >YOUR TASKS</h1>
    </div>
      <div className="bg-[#E6E6E6] p-[20px] flex flex-col gap-[20px] justify-center items-center">

        <div className="bg-white md:p-[20px] p-[30px] rounded-[21px] h-[400px] md:w-[80%] w-full flex flex-col gap-[30px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-between w-full md:gap-[20px] gap-[10px]"
          >
            <input
              type="text"
              {...register("todo", { required: true })}
              placeholder="Enter your new task"
              // value={isEditing && selectedTodo.todo}
              // onChange={(e) =>
              //   isEditing
              //     ? setSelectedTodo({
              //         id: selectedTodo.id,
              //         todo: e.target.value,
              //       })
              //     : setCreateTodo(e.target.value)
              // }
              className="p-[10px] border md:w-[85%] w-[70%]"
              // defaultValue=" "
              required
            />
            <button
              type="submit"
              className="text-center text-white md:text-[18px] text-[16px] font-bold md:w-[15%] w-[30%] border bg-[#50C2C9]"
              onClick={isEditing ? () => UpdateTask(selectedTodo) : AddTask}
            >
              {isEditing ? "UPDATE" : "ADD"}
            </button>
          </form>

          <div className="tasks flex flex-col gap-[30px] overflow-auto">
            {Todo.map((item, index) => (
              <div
                key={index}
                className="taskItem flex gap-[20px] justify-between items-center"
              >
                <div className="flex gap-[20px]">
                  <input
                    type="checkbox"
                    onChange={() => toggleComplete(item)}
                    checked={item.completed ? "checked" : ""}
                  />
                  <p
                    onClick={() => toggleComplete(item)}
                    className={item.completed ? "line-through" : " "}
                  >
                    {item?.todo}
                  </p>
                </div>
                <div className="todo-icons flex gap-[10px]">
                  <BsFillTrashFill
                    className="fill-[#000000] cursor-pointer"
                    onClick={() => deleteTodo(item.id)}
                  />
                  {/* <BsFillCheckCircleFill
                    className={`fill-[${completeTask}] cursor-pointer`}
                    onClick={CompleteTask}
                  /> */}
                  <BsPencilSquare
                    className="fill-[#000000] cursor-pointer mr-[10px]"
                    onClick={() => handleEditTodo(item)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
