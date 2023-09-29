import React from 'react'
import homepagePicture from "./assets/home.svg"
import Header from './header'
import { useNavigate } from 'react-router-dom'

function Home() {
   const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-[64px]'>
        <Header/>
        <div className="flex flex-col justify-center items-center">
            <div className='w-full h-[200px] flex justify-center'>
                <img 
                    src={homepagePicture}
                    alt="" 
                    className='w-[2000px]'
                />
            </div>
            
        </div>
        <div className="flex flex-col justify-center items-center gap-[32px]">
                <h1 className='font-bold text-[18px] md:text-[32px] text-center'>Things To Do With TODO</h1>
                <p className='md:text-[24px] text-[16px] w-[80%] text-center text-[#6B7280]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper leo in eros parturient arcu odio diam. Gravida faucibus ac mauris et risus.</p>
                <button 
                    onClick={() => navigate('/signup')}
                    className='font-bold text-white text-[24px] bg-[#50C2C9] w-[300px] p-[10px]'
                >
                    Get Started
                </button>
            </div>
        
    </div>
  )
}

export default Home