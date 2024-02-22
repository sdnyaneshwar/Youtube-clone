import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const UserProfile = () => {
  let [user,setUser] = useState(useSelector((state) => state.auth.userData))
  console.log(user);
  
  return (
    <div className='w-full h-screen bg-slate-50'>

      <div className='w-[100%] h-[100%] flex  justify-center'>
        <div className='w-[90%]  bg-white mt-10 h-[300px] rounded-lg shadow-lg'>
          {user && <div className='flex mt-[5%]'>
              <div className='w-[30%] flex justify-center flex-col  ' >
              <img className="rounded-full w-44 h-44" src={user.avatar} alt="Rounded avatar"></img>
              <Link to={'/uploadAvatar'}>
                <button className='w-auto p-2 text-white bg-indigo-500 rounded-xl'>Edit</button>
              </Link>
            </div>
            <div className='w-[70%]  flex flex-col justify-start  '>
              <h1 className='text-2xl font-semibold'>{user.username}</h1>
              <div>{user.fullName}</div>
              <div>{user.email}</div>

            </div>
          </div>}
        </div>
      </div>

    </div>
  )
}

export default UserProfile