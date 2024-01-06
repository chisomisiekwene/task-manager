import { FaSpinner } from "react-icons/fa";
import { statusQuery } from "./config/firebaseConfig";

export const PopAdd = (props) => {
  const { setPopUp, todo, handleTodo, handleDate, handleTime, time, date, status, isEdit, editTask, addTask } = props;
  const { LOADING, SUCCESS, ERROR } = statusQuery;

  return (
    <div className="w-full h-[100vh] top-0 z-[100] fixed bg-[#00000050] flex justify-center items-center">
      <div className="flex flex-col gap-[50px] justify-center items-center bg-white p-[24px] max-h-[100vh] w-[80%] overflow-scroll rounded-[8px]">
        <form className="flex flex-col items-center justify-center w-full md:gap-[50px] gap-[10px]">
          <div className="w-[100%] flex flex-col bg-[#0000]">
            <label htmlFor="">Task</label>
            <input
              type="text"
              required
              className="p-[10px] border md:w-[100%] w-[100%]"
              value={todo}
              onChange={handleTodo}
            />
          </div>
          <div className="w-[100%] flex flex-col">
            <label htmlFor="">Date</label>
            <input
              type="date"
              required
              className="p-[10px] border md:w-[100%] w-[100%]"
              value={date}
              onChange={handleDate}
            />
          </div>
          <div className="w-[100%] flex flex-col">
            <label htmlFor="">Time</label>
            <input
              type="time"
              required
              className="p-[10px] border md:w-[100%] w-[100%]"
              value={time}
              onChange={handleTime}
            />
          </div>
        </form>
        <div className="w-[100%] m-auto">
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
          <button
            type="submit"
            className="text-center text-white md:text-[18px] text-[13px] font-bold md:w-[15%] p-[5px] w-[30%] border bg-gray-500 cursor-pointer"
            onClick={() => setPopUp(false)}
          >
            CLOSE
          </button>

        </div>

      </div>
    </div>
  );
};
