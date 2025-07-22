import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import AllVideos from '../components/AllVideos.jsx';
import { logout } from '../store/authSlice.js';
import { setMenuhandle } from '../store/navSlice.js';
import { addVideos } from '../store/videoSlice.js';

const Home = () => {
    const menuIcon = useSelector((state) => state.nav.menuState);
    const userstatus = useSelector((state) => state.auth.status);
    const refresh = useSelector((state) => state.video.allVideoStatus);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandle = () => {
        axios.post('http://localhost:8000/api/v1/users/logout', null, {
            withCredentials: true
        }).then(() => {
            dispatch(logout());
            navigate('/login');
        }).catch((error) => {
            console.log(error.message);
        });
    };

    const getAllVideo = () => {
        axios.post('http://localhost:8000/api/v1/videos/gelAllVideos', { isVideo: true }, {
            withCredentials: true
        }).then((res) => {
            dispatch(addVideos(res.data.data));
        }).catch((error) => {
            console.log(error.message);
        });
    };

    useEffect(() => {
        if (userstatus) {
            getAllVideo();
        }
    }, [userstatus, refresh]);

    return (
        <div className="w-full h-screen overflow-hidden">
            <div className="flex flex-col h-full bg-white">
                <div className="sticky top-0 z-50">
                    <Navbar />
                </div>
                <div className="flex flex-1 bg-white">
                    <div className={`sticky top-[70px] h-[calc(100vh-70px)] flex flex-col items-center w-[250px] bg-slate-50 shadow-md p-4 transition-all duration-300 ${menuIcon ? 'visible' : 'hidden'}`}>
                        <div className="self-end mb-4 text-lg font-bold cursor-pointer hover:text-indigo-600" onClick={() => dispatch(setMenuhandle())}>
                            X
                        </div>
                        <div className="flex flex-col gap-4 w-full text-center text-gray-700 font-medium">
                            <div className="hover:bg-gray-200 py-2 rounded-md cursor-pointer">Home</div>
                            <div className="hover:bg-gray-200 py-2 rounded-md cursor-pointer">Trend</div>
                            <div className="hover:bg-gray-200 py-2 rounded-md cursor-pointer">Song</div>
                            <div className="hover:bg-gray-200 py-2 rounded-md cursor-pointer">Movie</div>
                            <div className="hover:bg-gray-200 py-2 rounded-md cursor-pointer">Setting</div>
                        </div>
                    </div>
                    <div className={`flex-1 px-6 py-4 overflow-y-auto ${menuIcon ? 'ml-[250px]' : ''}`}>
                        <AllVideos />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;