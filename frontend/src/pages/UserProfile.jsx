import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const UserProfile = () => {
  const params = useParams();
  const username = params.username;  
  const [user, setUser] = useState({});  

  const getUserProfile = () => {
    console.log(username);
    axios.get(`http://localhost:8000/api/v1/users/c/${username}`, {
      withCredentials: true
    })
    .then((response) => {
      setUser(response.data.data)
      console.log(user);

    })
    .catch((error) => {
      console.log(error.message);
    });
  };


  useEffect(() => {
    getUserProfile();
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl py-8 mx-auto">
        {user && (
          <div className="flex justify-between bg-white rounded-lg shadow-lg">
            <div className="px-6 py-4 ">
              <div className="flex items-center">
                <img className="w-16 h-16 mr-4 rounded-full" src={user.avatar} alt="Profile Avatar" />
                <div>
                  <h1 className="text-2xl font-semibold">{user.fullName}</h1>
                  <p className="text-gray-600">@{user.username}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-800">{user.email}</p>
                <p className="text-gray-800">Subscribed to {user.channelsSubscribedToCount} channels</p>
              </div>
              <div className="mt-4">
                <Link to={'/uploadAvatar'}>
                  <button className="px-4 py-2 text-white bg-indigo-500 rounded-md">Edit Profile</button>
                </Link>
              </div>
            </div>
            <div className='flex items-center justify-center mr-[10%]'>
              <div className='p-2 text-white rounded-full bg-indigo-950'>
                Subscriber  {user.subscriberCounts
}
                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
