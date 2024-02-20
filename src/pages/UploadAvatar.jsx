import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {login} from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

const UploadAvatar = () => {
    const signUpImage = 'src/Photos/signup.jpg'
    const [avatar,setAvatar]=useState(null)
    
    const user= useSelector((state)=>state.auth.userData)
    const dispatch =useDispatch()
    const navigator = useNavigate()

    const updateAvatar = ()=>{
        const formdata = new FormData();
        formdata.append("avatar",avatar)
        axios.patch('http://localhost:8000/api/v1/users/avatar', formdata, {
            withCredentials: true
        },).then((response)=>{
            console.log(response.data);
            let userData = response.data.data;
            dispatch(login(userData))
            navigator('/profile')

        }).catch((error)=>{
            console.log(error.message);
        })
    }

    return (
        <div className='w-full h-screen' style={{ background: `url(${signUpImage} )`, backgroundSize: 'cover' }}>
            <div className='w-[100%] h-[100%] flex justify-center items-center'>

                <div className=''>
                    <div className='w-[350px] h-[350px] bg-white rounded-2xl shadow-sm hover:shadow-slate-50 flex flex-col  gap-7 items-center  pt-5'>
                        <div>
                            <div className='bg-indigo-800 rounded-full w-28 h-28'>
                            <img className="rounded-full w-28 h-28" src={user.user.avatar} alt="Rounded avatar"></img>

                            </div>

                            <button className=''></button>
                        </div>
                        <span className=''>
                            <input type="file" name='avatar' onChange={(e)=>setAvatar(e.target.files[0])}/>
                           
                            
                        </span >


                        <button className='p-2 px-3 text-white bg-indigo-600 hover:shadow5-2xl hover:bg-indigo-400 rounded-2xl' onClick={updateAvatar}>
                            Upload
                        </button>


                    </div>
                </div>

            </div>

        </div>
    )
}

export default UploadAvatar