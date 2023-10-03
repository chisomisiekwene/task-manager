import { React, useState } from "react";
import Header from "./header";
import user from "./assets/userImg.svg";
import addbtn from "./assets/Plus Button.svg";
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";

function Todo() {
  const [createTodo, setCreateTodo] = useState("");
  const [selectedTodo, setSelectedTodo] = useState();
  const [Todo, setTodo] = useState([]);
  const [completeTask, setCompleteTask] = useState("#000000");
  const [isEditing, setIsEditing] = useState(false);

  const AddTask = (e) => {
    e.preventDefault();
    const TodoItem = createTodo;

    setTodo((prevTodo) => [...prevTodo, { id: Date.now(), todo: TodoItem }]);
    setCreateTodo(" ");
  };
  console.log(Todo);

  const deleteTodo = (indexToDelete) => {
    // Create a new array that excludes the element to delete
    const updatedTodo = Todo.filter((todos, index) => index !== indexToDelete);

    // Update the state with the new array
    setTodo(updatedTodo);
  };

  const CompleteTask = () => {
    setCompleteTask("#50C2C9");
  };

  const handleEditTodo = (item) => {
    setIsEditing(true);
    setSelectedTodo(item);
  };

  const UpdateTask = (updatedTodo) => {
    setTodo((prevArray) =>
      prevArray.map((details) => {
        if (details.id === updatedTodo.id) {
          return {
            ...details,
            todo: updatedTodo.todo,
          };
        }
        return details;
      })
    );
    setIsEditing(false)
    setSelectedTodo([])
  };

  return (
    <div className="bg-[#50C2C9]">
      <Header />
      <div className="flex flex-col gap-[20px] justify-center py-[50px]">
        <div className="m-auto bg-white rounded-full md:w-[150px] md:h-[150px] w-[114px] h-[114px]">
          <img src={user} alt="" className="w-full" />
        </div>
        <p className="text-center font-bold text-white text-[16px] md:text-[25px] text-[white]">
          Welcome Arsalan Ahmed
        </p>
      </div>
      <div className="bg-[#E6E6E6] p-[20px] flex flex-col gap-[20px] justify-center items-center">
        <h1 className="text-[16px] md:text-[32px] font-bold">TODO LIST</h1>

        <div className="bg-white p-[30px] rounded-[21px] h-[300px] md:w-[60%] w-full flex flex-col gap-[30px]">
          <div className="flex justify-between w-full md:gap-[20px] gap-[10px]">
            <input
              type="text"
              placeholder="Enter your new task"
              value={isEditing ? selectedTodo.todo : createTodo}
              onChange={(e) =>
                isEditing
                  ? setSelectedTodo({
                      id: selectedTodo.id,
                      todo: e.target.value,
                    })
                  : setCreateTodo(e.target.value)
              }
              className="p-[10px] border md:w-[85%] w-[70%]"
              defaultValue=" "
            />
            <button
              className="text-center text-white md:text-[18px] text-[16px] font-bold md:w-[15%] w-[30%] border bg-[#50C2C9]"
              onClick={isEditing ? () => UpdateTask(selectedTodo) : AddTask}
            >
              {isEditing ? "UPDATE" : "ADD"}
            </button>
          </div>

          <div className="tasks overflow-auto flex flex-col gap-[30px] overflow-y-scroll">
            {Todo.map((item, index) => (
              <div
                key={index}
                className="taskItem flex gap-[20px] justify-between items-center"
              >
                <p>{item?.todo}</p>
                <div className="todo-icons flex gap-[10px]">
                  <BsFillTrashFill
                    className="fill-[#000000] cursor-pointer"
                    onClick={() => deleteTodo(index)}
                  />
                  <BsFillCheckCircleFill
                    className={`fill-[${completeTask}] cursor-pointer`}
                    onClick={CompleteTask}
                  />
                  <BsPencilSquare
                    className="fill-[#000000] cursor-pointer"
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
