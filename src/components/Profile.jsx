import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const Profile = () => {
  
  const user = useSelector((state)=>state.auth.userData)
  
  const username = user.username
  const options = [
    {
    name:"Profile",
    to:`/profile/${username}`
  },
    {
      name:"Your channel",
      to:'/channel'
    },
    {
      name:"Upload Video",
      to:'/upload-video'
    },
    {
      name:"Setting",
      to:'/setting'
    },

  ]
  
  return (
    <div className='z-50 w-auto h-auto pt-3 bg-white rounded-lg shadow-lg ' >
      <div className="">
        <ul className=''>
          {
            options.map((option,index)=>(
              <Link key={index} to={option.to}>
              <li  className='py-2 pl-2 pr-6 rounded-lg hover:bg-slate-50 hover:border-slate-200'>{option.name}</li>
              </Link>
            ))
          }

        </ul>
      </div>
    </div>
  )
}

export default Profile