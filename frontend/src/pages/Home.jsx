import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import Profile from '../components/Profile.jsx'
import Navbar from '../components/Navbar.jsx';
import { setMenuhandle } from '../store/navSlice.js';
import { addVideos } from '../store/videoSlice.js';
import AllVideos from '../components/AllVideos.jsx';


const Home = () => {
    const menuIcon = useSelector((state) => state.nav.menuState)
    const userData = useSelector((state) => state.auth.userData)
    const userstatus = useSelector((state) => state.auth.status)
    const refresh = useSelector((state)=>state.video.allVideoStatus)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const getVideo = useSelector((state)=>state.video.allVideo)

    const logoutHandle = () => {
        axios.post('http://localhost:8000/api/v1/users/logout', null, {
            withCredentials: true
        }).then((respose) => {
            console.log(respose.data);
            dispatch(logout())
            navigate('/login')

        }
        ).catch((error) => {
            console.log(error.message);
        })
    }

    const getAllVideo = ()=>{
        axios.post('http://localhost:8000/api/v1/videos/gelAllVideos',{isVideo:true}
            ,{
            withCredentials: true
          }).then((responce)=>{
            console.log(responce);
            
                dispatch(addVideos(responce.data.data))
                // getVideo.map((video)=>{
                //     console.log(video);
                // })

        }).catch((error)=>{
            console.log(error.message);
        })
    }

    useEffect(()=>{
        if(userstatus){
        getAllVideo()
        }
    },[userstatus,refresh])


    return (
        <div className='w-full h-screen overflow-hidden '>


            <div className='w-[100%] bg-white  flex justify-around flex-col relative h-[100%]'>
                <div className='sticky top-0 z-50 h-[15%]'>
                    <Navbar />






                </div>
                <div className='flex w-[100%] h-[85%] flex-1 bg-white'>

                    <div className={ `sticky top-[15%] bottom-0 flex flex-col items-center justify-start w-[30%] h-screen gap-5 pt-6 font-semibold transition-all duration-300 ease-in-out delay-700 bg-slate-50 ${
                        menuIcon? "visible":"hidden"
                    }`}      >
                        <div className={`p-2 rotate-90 shadow-md cursor-pointer hover:shadow-lg hover:text-indigo-500 bg-slate-50 visible relative md:left-[60px] top-1 `} onClick={() => dispatch(setMenuhandle())}>
                            <span>X</span>
                        </div>
                        <div className='cursor-pointer hover:underline hover:text-gray-600'>Home</div>
                        <div className='cursor-pointer hover:underline hover:text-gray-600'>Trend</div>
                        <div className='cursor-pointer hover:underline hover:text-gray-600'>Song</div>
                        <div className='cursor-pointer hover:underline hover:text-gray-600'>Movie</div>
                        <div className='cursor-pointer hover:underline hover:text-gray-600'>Setting</div>


                    </div>
                    <AllVideos/>
                    
                </div>
            </div>

        </div>
    )
}

export default Home