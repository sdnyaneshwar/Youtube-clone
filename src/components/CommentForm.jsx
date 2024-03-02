import React, { useState } from 'react'
import axios from 'axios'


const CommentForm = ({video}) => {
    const [content, setContent] = useState("")
    const commmentHandle = () => {
        // console.log(content);
        const data=  {
            content
        }
        
        axios.post(`http://localhost:8000/api/v1/comment/${video}`,data,{
            withCredentials:true
        }).then((response)=>{
            // console.log(response.data);
            setContent("")
        }).catch((error)=>{
            console.log(error.message);
        })
    }
    return (
        <div className="flex flex-col w-full text-black rounded-xl bg-gradient-to-r from-blue-200 to-indigo-200">
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="mb-4 ">
                    <div className="flex items-center space-x-2">
                        <textarea
                            type="text"
                            placeholder="Say something..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        <button type="button" onClick={commmentHandle} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">
                            Send
                        </button>
                    </div>
                </div>


            </div>
        </div>

    )
}

export default CommentForm