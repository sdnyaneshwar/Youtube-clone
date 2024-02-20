
import axios from 'axios';
import React, { useState } from 'react'
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { ImSpinner } from "react-icons/im";


const UploadVideo = () => {
  const signUpImage = 'src/Photos/signup.jpg'
  const [videoFile, setVideo] = useState(null)
  const [thumbnail, setthumbnail] = useState(null)
  const [title, settitle] = useState('')
  const [description, setDescription] = useState('')
  const user = useSelector((state) => state.auth.userData)
  const [loading, setLoading] = useState(false)



  const videoHandle = () => {

    const formdata = new FormData();
    formdata.append("title", title)
    formdata.append("description", description)
    formdata.append("videoFile", videoFile)
    formdata.append("thumbnail", thumbnail)
    console.log(formdata);
    setLoading(true)
    axios.post('http://localhost:8000/api/v1/videos', formdata, {
      withCredentials: true
    }).then((responce) => {
      console.log(responce.data);
      setLoading(false)
      console.log("video uploaded successfully");
    }).catch((error) => {
      setLoading(false)
      console.log(error.message);
    })
  }
  return (
    <div className='w-full h-screen'  >


      <div className=''>
        <div className='flex flex-col items-center pt-5 bg-white shadow-sm rounded-2xl hover:shadow-slate-50 gap-7'>
          {
            loading ? <div>
              <ImSpinner />
            </div>
              :
              <>
              <div>
                
                <div>Title</div>
                <input type="text" className='w-[340px] m-1 border-2 shadow-lg outline-none rounded-xl ' value={title} onChange={(e) => settitle(e.target.value)} />
              </div>
              <div>
                <div>Discription</div>
                <input type="text" className='m-1 w-[340px] h-[100px] border-2 shadow-lg outline-none rounded-xl pt-0 overflow-y-auto' value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <span className=''>
                <div>Videofile</div>
                <input type="file" name='videoFile' className='border-2' onChange={(e) => setVideo(e.target.files[0])} />


              </span >
              <span className=''>
                <div>Thumnail</div>
                <input type="file" name='thumbnail' className='border-2' onChange={(e) => setthumbnail(e.target.files[0])} />


              </span >

              <button className='p-2 px-3 text-white bg-indigo-600 hover:shadow5-2xl hover:bg-indigo-400 rounded-2xl' onClick={videoHandle}>
                <IoCloudUploadOutline className='w-12 h-8' />
              </button>



              </>
          }
        </div>
      </div>



    </div>
  )
}

export default UploadVideo