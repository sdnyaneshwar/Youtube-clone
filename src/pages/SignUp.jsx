import React, { useState } from 'react';
import {login} from '../store/authSlice.js'
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
const signUpImage = 'src/Photos/signup.jpg'

const SignUp = () => {
    const dispatch = useDispatch()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [page, setPage] = useState(false)
    const [conf_password, setConf_Password] = useState('')
    const [avatar, setAvatar] = useState();
    const name = "DANY"
    const navigate = useNavigate();


    const submitHandle=()=>{
        if( !password==conf_password){
            return

        }
            
        const formdata = new FormData();
        formdata.append("fullName",fullName)
        formdata.append("email",email)
        formdata.append("username",username)
        formdata.append("password",password)
        formdata.append("avatar",avatar)
        console.log(formdata);

        const user = axios.post('http://localhost:8000/api/v1/users/register',formdata).then((response)=>{
            console.log(response.data);
            if(user){
                dispatch(login({ userData: user.data }));

            }
            navigate('/login')

        }).catch((error)=>{
            console.log(error.message);
            
        })

        

        
        
    }



    return (
        <div className='w-full h-screen' style={{ background: `url(${signUpImage} )`, backgroundSize: 'cover' }}>
            <div className='w-[100%] h-[100%] flex justify-center items-center'>
                <div className={`${page ? 'hidden' : 'visible'}`}>
                    <div className=' w-[400px] h-[570px] bg-white rounded-2xl shadow-sm hover:shadow-slate-50 flex flex-col  gap-7 items-center px-1 pt-14'>
                        
                        <span className='w-[70%]'>
                            <div>FullName</div>
                            <input type="text" value={fullName} className='w-[100%]  shadow-xl border rounded-2xl pl-2 h-7' onChange={(e) => setFullName(e.target.value)} />

                        </span >
                        <span className='w-[70%]'>
                            <div>Email</div>
                            <input type="text" className='w-[100%]  shadow-xl border rounded-2xl pl-2 h-7' value={email} onChange={(e) => setEmail(e.target.value)} /></span>
                        <span className='w-[70%]'>
                            <div>Username </div> <input type="text" className='w-[100%]  shadow-xl border rounded-2xl pl-2 h-7'
                                value={username} onChange={(e) => setUsername(e.target.value)} /></span>
                        <span className='w-[70%]'>
                            <div>Password</div>
                            <input type="text" className='w-[100%]  shadow-xl border rounded-2xl pl-2 h-7' value={password} onChange={e => setPassword(e.target.value)} />
                        </span>
                        <span className='w-[70%]'>
                            <div>Confirm Password</div>
                            <input type="text" className='w-[100%]  shadow-xl border rounded-2xl pl-2 h-7' value={conf_password} onChange={(e) => setConf_Password(e.target.value)} />
                        </span>
                        {
                            password===conf_password? <button className='p-2 px-3 text-white bg-indigo-600 hover:shadow-2xl hover:bg-indigo-400 rounded-2xl' onClick={() => setPage(prev => !prev)}>
                            <GoArrowRight className='text-xl font-bold text-indigo-900 ' />
                            </button>
                            :
                            <span className='text-red-700 '>password not matched</span>
                        }

                        <div className='mb-3'>
                            <span>
                            Already have an account?&nbsp;
                            </span>
                            <Link to={'/login'} className='font-semibold text-indigo-600'>
                            Login
                            </Link>
                        </div>

                        


                    </div>
                </div>
                <div className={`${page ? "visible" : "hidden"}`}>

                    <div className='w-[350px] h-[350px] bg-white rounded-2xl shadow-sm hover:shadow-slate-50   pt-5'>
                        <button className='p-2 px-3 text-white hover:shadow5-2xl hover:bg-indigo-400 rounded-2xl start-0' onClick={() => setPage(prev => !prev)}>
                            <GoArrowLeft className='text-xl font-bold text-indigo-900 ' />
                        </button>
                        <div className='flex flex-col items-center gap-7'>
                            <div>
                                <div className='bg-indigo-800 rounded-full w-28 h-28'>
                                        <img src="src\Photos\butter.jpg" alt="" />
                                </div>

                                <button className=''></button>
                            </div>
                            <span className='flex flex-col items-center gap-3 '>
                                <input type='file' className='border hover:shadow-xl rounded-2xl hover:bg-indigo-300' onChange={(e) => setAvatar(e.target.files[0])} />



                            </span >




                            <div className='px-5 py-3 font-extrabold text-white bg-indigo-800 rounded-2xl ' onClick={submitHandle}>
                                SignUp
                            </div>
                        </div>


                    </div>
                </div>


            </div>

        </div>
    );
}

export default SignUp;
