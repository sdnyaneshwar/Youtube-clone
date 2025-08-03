import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [videos, setVideos] = useState([]);

  const getUserProfile = async () => {
    try {
      const response = await axios.get(`/api/v1/users/c/${username}`, {
        withCredentials: true
      });
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  const getUserVideos = async (userId) => {
    try {
      const response = await axios.get(`/api/v1/videos/user/${userId}`, {
        withCredentials: true
      });
      setVideos(response.data.data);
    } catch (error) {
      console.error("Error fetching user videos:", error.message);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (user?._id) {
      getUserVideos(user._id);
    }
  }, [user]);

  if (!Array.isArray(videos)) {
    return <div>No videos available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl py-8 mx-auto">
        {user && (
          <div className="flex justify-between bg-white rounded-lg shadow-lg px-6 py-4">
            <div>
              <div className="flex items-center">
                <img className="w-16 h-16 mr-4 rounded-full" src={user.avatar} alt="Profile Avatar" />
                <div>
                  <h1 className="text-2xl font-semibold">{user.fullName}</h1>
                  <p className="text-gray-600">@{user.username}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-800">{user.email}</p>
                <p className="text-gray-800">Subscribed to {user.channelsSubscribedToCount || 0} channels</p>
              </div>
              <div className="mt-4">
                <Link to="/uploadAvatar">
                  <button className="px-4 py-2 text-white bg-indigo-500 rounded-md">Edit Profile</button>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-3 text-white rounded-full bg-indigo-700">
                Subscribers: {user.subscriberCounts || 0}
              </div>
            </div>
          </div>
        )}

        {/* Videos Section */}
        <div className="mt-6">
          {videos.length > 0 ? (
            <div className="grid gap-4">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                  <Link to={`/playvideo/${video._id}`}>
                    <div className="flex gap-4 p-4">
                      <img
                        src={video.thumbnail}
                        alt="Thumbnail"
                        className="w-[220px] h-[130px] rounded-xl object-cover"
                      />
                      <div>
                        <h2 className="text-xl font-semibold">{video.title}</h2>
                        <p className="text-sm text-gray-600 mt-1">{video?.owner?.username || 'Unknown Channel'}</p>
                        <div className="text-gray-500 text-sm mt-2">
                          <span>{video.views || 0} views</span> •{' '}
                          <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 mt-4">No videos uploaded yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
