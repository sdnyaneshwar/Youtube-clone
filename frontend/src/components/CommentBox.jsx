import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FcDeleteRow } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { LiaSave } from "react-icons/lia";


const CommentBox = ({ video }) => {
  const [comments, setComments] = useState([])
  const [edit, setEdit] = useState(null) 
  const [content, setContent] = useState("")



  const editHandle=(comment)=>{
    const data ={
      content
    }
    axios.patch(`http://localhost:8000/api/v1/comment/c/${comment}`,data,{
      withCredentials:true
    })
    .then((response)=>{
      console.log(response.data);
      setEdit(null)
    })
    .catch((error)=>{
      console.log(error.message);
    })
    
  }

  const deleteHandle=(comment)=>{
    console.log(comment);
    axios.delete(`http://localhost:8000/api/v1/comment/c/${comment}`,{
      withCredentials:true
    }).then((response)=>{
      console.log(response.data);
    }).catch((error)=>{
      console.log(error.message);
    })
  }


  useEffect(() => {
    if (video) {
      const getComments = () => {
        axios.get(`http://localhost:8000/api/v1/comment/${video}`, {
          withCredentials: true
        }).then((response) => {
          console.log(response.data.data)
          setComments(response.data.data)
        }).catch(error => {
          console.error('Error fetching comments:', error);
        });
      }

      getComments();

      const intervalId = setInterval(getComments, 10000);

    return () => clearInterval(intervalId);
    }
  }, [video])

  return (
    <div className="max-w-2xl px-4 py-2 mx-auto mt-4 rounded-md">
      {comments.length > 0 && comments.map((comment, index) => (
        <div key={index} className="flex px-4 py-2 m-4 bg-indigo-100 rounded-md">
          <div className='flex items-center gap-9 justify-normal'>
            <img className="w-16 h-16 mr-4 rounded-full" src={comment.commentuser[0].avatar} alt="Profile Avatar" />

          </div>
          <div className='justify-center w-full'>
            <div className='flex justify-between '>
              <div>{comment.commentuser[0].fullName}</div>
              <div>{comment.createdAt}</div>
              {
                comment.isUpdated && 
                <div className='flex gap-3'>{
                  comment._id ==edit?
                  <LiaSave onClick={()=>editHandle(comment._id)}/>
                  :
                  <CiEdit onClick={()=>setEdit(comment._id)}/>}
                  <FcDeleteRow  onClick={()=>deleteHandle(comment._id)} />
                </div> 
              }
            </div>
            {
             comment._id ==edit?  <textarea value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
            :
            <div className="ml-3 text-xl font-semibold">
            {comment.content} 
            </div>
            }
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentBox
