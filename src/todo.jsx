import React from 'react'
import Header from './header'
import user from "./assets/userImg.svg"
import addbtn from "./assets/Plus Button.svg"

function Todo() {
  return (
    <div className='bg-[#50C2C9]'>
        <Header/>
        <div className="flex flex-col gap-[20px] justify-center py-[50px]">
            <div className="m-auto bg-white rounded-full md:w-[300px] md:h-[300px] w-[114px] h-[114px]">
                <img src={user} alt="" className='w-full'/>   
            </div>
            <p className='text-center font-bold text-white text-[16px] md:text-[25px] text-[white]'>Welcome Arsalan Ahmed</p>
        </div>
        <div className="bg-[#E6E6E6] p-[20px] flex flex-col gap-[20px]">
            <h1 className='text-[16px] md:text-[20px] font-medium'>Todo list</h1>
            <div className="bg-white p-[20px] rounded-[21px] h-[366px] overflow-auto flex flex-col gap-[20px]">
                <div className="flex justify-between">
                    <p>Task List</p>
                    <img src={addbtn} alt="" />
                </div>
                <div className="taskItem flex gap-[20px]">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Cook Dinner At 8 pm</label>
                </div>
                <div className="taskItem flex gap-[20px]">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Cook Dinner At 8 pm</label>
                </div>
                <div className="taskItem flex gap-[20px]">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Cook Dinner At 8 pm</label>
                </div>
                <div className="taskItem flex gap-[20px]">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Cook Dinner At 8 pm</label>
                </div>
                <div className="taskItem flex gap-[20px]">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Cook Dinner At 8 pm</label>
                </div>
                <div className="taskItem flex gap-[20px]">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Cook Dinner At 8 pm</label>
                </div>
                <div className="taskItem flex gap-[20px]">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Cook Dinner At 8 pm</label>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Todo