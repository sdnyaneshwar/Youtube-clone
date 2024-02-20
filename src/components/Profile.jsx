import React from 'react'
import { Link } from 'react-router-dom'


const Profile = () => {
  const options = [
    {
    name:"Profile",
    to:'/profile'
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
              <Link to={option.to}>
              <li key={index} className='py-2 pl-2 pr-6 rounded-lg hover:bg-slate-50 hover:border-slate-200'>{option.name}</li>
              </Link>
            ))
          }

        </ul>
      </div>
    </div>
  )
}

export default Profile