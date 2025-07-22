import axios from 'axios';
import React, { useState } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { ImSpinner8 } from "react-icons/im";

const UploadVideo = () => {
  const [isVideo, setIsVideo] = useState(true);
  const [videoFile, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const user = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);

  const videoHandle = () => {
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("videoFile", videoFile);
    formdata.append("thumbnail", thumbnail);
    formdata.append("isVideo", isVideo);

    setLoading(true);
    axios.post('http://localhost:8000/api/v1/videos', formdata, {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        alert("Video uploaded successfully!");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-indigo-700 text-center">Upload Video</h2>

        <div className="space-y-2">
          <label className="text-gray-700 font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl outline-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 font-medium">Description</label>
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-xl outline-indigo-500 resize-none"
          ></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 font-medium">Upload Video</label>
          <input
            type="file"
            onChange={(e) => setVideo(e.target.files[0])}
            className="w-full border border-gray-300 p-2 rounded-xl cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 font-medium">Upload Thumbnail</label>
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="w-full border border-gray-300 p-2 rounded-xl cursor-pointer"
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            id="reelCheck"
            type="checkbox"
            checked={isVideo}
            onChange={() => setIsVideo((prev) => !prev)}
            className="w-4 h-4 accent-indigo-600"
          />
          <label htmlFor="reelCheck" className="text-gray-700">
            Is this a Reel? <span className="font-semibold">{isVideo ? "Yes" : "No"}</span>
          </label>
        </div>

        <div className="flex justify-center">
          <button
            onClick={videoHandle}
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl hover:bg-indigo-500 active:scale-95 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <ImSpinner8 className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <IoCloudUploadOutline className="text-2xl" />
                Upload Video
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
