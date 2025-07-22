import React, { useState } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import Profile from '../components/Profile.jsx';
import { setMenuhandle } from '../store/navSlice.js';
import { getallVideos } from '../store/videoSlice.js';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const userData = useSelector((state) => state.auth.userData);
  const userstatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuIcon = useSelector((state) => state.nav.menuState);
  const [profile, setprofile] = useState(false);
  const [search, setSearch] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);

  const logoutHandle = () => {
    axios.post('http://localhost:8000/api/v1/users/logout', null, {
      withCredentials: true
    }).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.log(error.message);
    });
  };

  const searchHandle = (e) => {
  e.preventDefault();
  const trimmed = search.trim();
  if (!trimmed) return; // prevent navigating to empty search

  navigate(`/video/${trimmed}`);
  setSearch('');
};
  return (
    <div className="w-full bg-zinc-100 shadow-md border-b sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        <div className="flex items-center gap-2">
          {/* {!menuIcon && (
            <div
              className="md:hidden p-2 rounded-md hover:text-indigo-600 cursor-pointer"
              onClick={() => dispatch(setMenuhandle())}
            >
              <AiOutlineMenu size={22} />
            </div>
          )} */}

          <Link to="/" onClick={() => dispatch(getallVideos())}>
            <div className="text-white font-bold text-lg sm:text-xl px-4 py-2 bg-indigo-700 rounded-xl hover:bg-indigo-800 transition">
              CHITRATUBE
            </div>
          </Link>
        </div>

        <form
          onSubmit={searchHandle}
          className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 border border-indigo-400 rounded-full shadow-sm hover:shadow-md transition"
        >
          <input
            type="text"
            placeholder="Search..."
            value={search}
            className="outline-none text-sm text-gray-800 placeholder-gray-400 w-40"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="text-indigo-600 font-semibold hover:underline">
            Go
          </button>
        </form>

        <div className="hidden md:flex items-center gap-4">
          {userstatus ? (
            <>
              <div className="text-sm text-gray-700 font-medium">Hi, {userData.fullName}</div>
              <Link to="/reels" className="text-sm text-indigo-600 hover:underline">
                Reels
              </Link>
              <div onClick={logoutHandle} className="cursor-pointer hover:text-red-600 transition">
                <IoIosLogOut className="text-2xl" />
              </div>
              <div className="relative">
                <img
                  onClick={() => setprofile((prev) => !prev)}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500 hover:scale-105 transition"
                  src={userData.avatar}
                  alt="User Avatar"
                />
                {profile && (
                  <div className="absolute right-0 mt-2">
                    <Profile />
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login">
              <div className="px-4 py-2 text-indigo-700 font-semibold border border-indigo-500 rounded-lg hover:bg-indigo-50 transition">
                Login
              </div>
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="md:hidden bg-white px-4 pb-4">
          <form onSubmit={searchHandle} className="flex items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              className="outline-none text-sm text-gray-800 placeholder-gray-400 flex-1 border px-3 py-2 rounded-md"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="text-indigo-600 font-semibold">
              Go
            </button>
          </form>

          {userstatus ? (
            <div className="flex flex-col gap-2">
              <span className="text-gray-700">Hi, {userData.fullName}</span>
              <Link to="/reels" className="text-indigo-600 hover:underline">
                Reels
              </Link>
              <div onClick={logoutHandle} className="text-red-600 cursor-pointer">
                Logout
              </div>
              <div className="flex items-center gap-2">
                <img
                  onClick={() => setprofile((prev) => !prev)}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500"
                  src={userData.avatar}
                  alt="User Avatar"
                />
                {profile && <Profile />}
              </div>
            </div>
          ) : (
            <Link to="/login" className="block text-indigo-700 font-semibold">
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
