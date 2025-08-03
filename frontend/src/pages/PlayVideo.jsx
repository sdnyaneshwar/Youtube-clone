import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SidebarVideos from '../components/SidebarVideos';
import CommentForm from '../components/CommentForm';
import CommentBox from '../components/CommentBox';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

const PlayVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});
  const [key, setKey] = useState(0);
  const [owner, setOwner] = useState({});
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [like, setLike] = useState(false);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(`/api/v1/videos/${videoId}`, { withCredentials: true });
      const videoData = response.data.data[0];
      setVideo(videoData);
      setKey((prev) => prev + 1);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchOwner = async () => {
    if (video.owner) {
      try {
        const response = await axios.get(`/api/v1/users/c/${video.owner}`, { withCredentials: true });
        setOwner(response.data.data);
        setLike(video.isLiked);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleLike = async () => {
    try {
      await axios.get(`/api/v1/like/c/${videoId}`, { withCredentials: true });
      setLike((prev) => !prev);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubscribe = async () => {
    try {
      await axios.post(`/api/v1/subscribe/c/${owner._id}`, null, { withCredentials: true });
      fetchOwner();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    fetchOwner();
  }, [video.owner]);

  return (
    <div key={key} className="w-full min-h-screen flex flex-col bg-gray-50">
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>
      <div className="flex flex-col lg:flex-row w-full">
        <div className="lg:w-3/4 w-full p-4 space-y-4 overflow-y-auto">
          <div className="w-full">
            {video.videoFile && (
              <video className="w-full rounded-lg" controls>
                <source src={video.videoFile} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h1 className="text-xl font-bold mb-2">{video.title}</h1>
            <div className="flex items-center gap-4">
              <Link to={`/profile/${owner.username}`} className="flex items-center gap-2">
                <img className="w-10 h-10 rounded-full" src={owner.avatar} alt="avatar" />
                <span className="font-medium">{owner.username}</span>
              </Link>
              <div className="text-sm text-gray-500">Views: {video.views}</div>
            </div>
            <div className="flex items-center gap-6 mt-4">
              <div onClick={handleLike} className="cursor-pointer flex items-center gap-1">
                {like ? <AiFillLike className="text-blue-600 text-2xl" /> : <AiOutlineLike className="text-gray-600 text-2xl" />}
                <span>{video.videoLikedCount}</span>
              </div>
              <button
                onClick={handleSubscribe}
                className={`px-4 py-2 rounded text-white ${owner.isSubscribed ? 'bg-gray-700' : 'bg-blue-600'} hover:opacity-80`}
              >
                Subscribe {owner.subscriberCounts}
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <button
              className="text-blue-600 font-semibold mb-2"
              onClick={() => setDescriptionVisible((prev) => !prev)}
            >
              {descriptionVisible ? 'Hide Description' : 'Show Description'}
            </button>
            {descriptionVisible && <p className="text-gray-700">{video.description || 'No description provided.'}</p>}
          </div>

          <div className="bg-white p-4 rounded-lg shadow space-y-4">
            <CommentForm video={video._id} />
            <CommentBox video={video._id} />
          </div>
        </div>

        <div className="lg:w-1/4 w-full p-4 bg-white border-l rounded-lg shadow overflow-y-auto">
          <SidebarVideos />
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
