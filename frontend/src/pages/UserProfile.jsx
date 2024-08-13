import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/Card';

const UserProfile = () => {
  const params = useParams();
  const username = params.username;
  const [user, setUser] = useState({});
  const [videos, setVideos] = useState({})

  const getUserProfile = () => {
    console.log(username);
    axios.get(`http://localhost:8000/api/v1/users/c/${username}`, {
      withCredentials: true
    })
      .then((response) => {
        setUser(response.data.data)


      })
      .catch((error) => {
        console.log(error.message);
      });

  };

  const getUservideos = () => {
    console.log(user?._id);

    axios.get(`http://localhost:8000/api/v1/videos/user/${user?._id}`, {
      withCredentials: true
    }).then((response) => {
      console.log(response.data);
      setVideos(response.data.data);


    }).catch((error) => {
      console.log("Error during fetch user videos ", error.message);

    })


  }


  useEffect(() => {
    getUserProfile();

  }, []);

  useEffect(() => {
    if (user?._id) {
      getUservideos(user._id);
    }
  }, [user]);
  if (!Array.isArray(videos)) {
    // If getVideo is not an array, render a message or handle it in another way
    return <div>No videos available</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-1xl py-8 mx-auto">
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
        <div>

          {
            videos.length > 0 && (
              <div className=" bg-gray-100 rounded-lg  shadow-lg">
                {
                  videos.map((video) => (
                    <div key={video._id} className='my-2 py-3 hover:border  bg-white   rounded-xl   hover:shadow-indigo-700 hover:shadow-md ' >
                      <Link to={`/playvideo/${video._id}`}>
                        <div className='flex w-full justify-start gap-4  px-3  items-center'>

                          <div>
                            <img src={video.thumbnail} alt="coverImage" className='w-[220px] h-[130px] rounded-2xl' />
                          </div>
                          <div className=''>
                            <div>
                              <div>
                                avatar
                              </div>
                              <div>
                                {video.title}
                              </div>
                            </div>
                            <span>channel Name</span>
                            <div>
                              <span>view</span>
                              <span>{video.createsAt}</span>
                            </div>
                          </div>
                        </div>

                      </Link>
                    </div>
                  ))
                }
              </div>

            )
          }
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
