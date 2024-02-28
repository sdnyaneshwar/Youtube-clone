
import React, { useState } from 'react'
import Card from '../components/Card'
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import Profile from '../components/Profile.jsx'
import { setMenuhandle } from '../store/navSlice.js';
import { getallVideos } from '../store/videoSlice.js';

const Navbar = () => {

  const userData = useSelector((state) => state.auth.userData)
  const userstatus = useSelector((state) => state.auth.status)
  
  // console.log(userData);
  const navigate = useNavigate()
  const [profile, setprofile] = useState(false)
  const dispatch = useDispatch()
  const menuIcon = useSelector((state) => state.nav.menuState)


  const logoutHandle = () => {
    axios.post('http://localhost:8000/api/v1/users/logout', null, {
      withCredentials: true
    }).then((respose) => {
      console.log(respose.data);
      navigate('/login')

    }
    ).catch((error) => {
      console.log(error.message);
    })
  }
  return (
    <div className=''>
      <div className='h-[15%] w-full bg-zinc-50 flex  justify-around shadow-xl border gap-6  py-4'>
        {
          menuIcon ? '' : (
            <div className={`p-2  rotate-90 shadow-md cursor-pointer hover:shadow-lg hover:text-indigo-500 bg-slate-100 visible ${menuIcon}`} onClick={() => dispatch(setMenuhandle())}>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
          )
        }


       <Link to={'/'}>
       <div className='px-5 py-3 font-extrabold text-white bg-indigo-800 rounded-2xl' onClick={()=>dispatch(getallVideos())}>
          CHITRATUBE
        </div>
       </Link>
        <div className='p-2 border border-blue-400 rounded-full hover:shadow-lg'>
          <input type="text" className='' />
          <span className='font-semibold text-green-500 cursor-pointer hover:text-indigo-500'>search</span>

        </div>

        {
          userstatus ? <div className='flex '>

            <div>
              hii {userData.fullName}
            </div>

            <div className='px-4 py-2' onClick={logoutHandle}>
              <IoIosLogOut className='text-[30px] text-indigo-600  cursor-pointer font-semibold' />

            </div>
            <div onClick={() => setprofile(prev => !prev)}>
              <img className="w-10 h-10 rounded-full" src={userData.avatar} alt="Rounded avatar"></img>
            </div>
            <div className='flex-col ml-3 mr-5'>
              <div className='absolute mt-1 top-[100%] right-6'>
                {
                  profile && <Profile />
                }


              </div>
            </div>

          </div> :
            <div className='flex gap-4 '>
              <div>
                <Link to={'/login'}>
                  <div>
                    login
                  </div>

                </Link>
              </div>

            </div>
        }


      </div></div>
  )
}

export default Navbar