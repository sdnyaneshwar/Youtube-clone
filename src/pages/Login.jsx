import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
const signUpImage = 'src/Photos/signup.jpg'

const Login = () => {

    const [email, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const datal = useDispatch()




    const loginHandle = () => {
        let data = {
            email,
            password
        };
        console.log(data);


        axios.post('http://localhost:8000/api/v1/users/login', data)
            .then((response) => {
                console.log(response.data);
                const { accessToken, refreshToken } = response.data.data;
                console.log("accessToken:",accessToken,"refreshToken:",refreshToken);
                // Set cookies in the frontend
                document.cookie = `accessToken=${accessToken}; Secure; SameSite=None`; // Set Secure and SameSite attributes for security
                document.cookie = `refreshToken=${refreshToken}; Secure; SameSite=None`; // Set Secure and SameSite attributes for security
            
                let userData = response.data.data;
                datal(login(userData))
                navigate('/');
            })
            .catch((error) => {
                console.log(error.message);
            });
    }



    return (
        <div className='w-full h-screen' style={{ background: `url(${signUpImage} )`, backgroundSize: 'cover' }}>
            <div className='w-[100%] h-[100%] flex justify-center items-center'>
                <div className=' w-[400px] h-[350px] bg-white rounded-2xl shadow-sm hover:shadow-slate-50 flex flex-col  gap-7 items-center px-1 pt-5'>
                    <div className='text-2xl font-extrabold text-indigo-800 '>
                        Log in
                    </div>

                    <span className='w-[70%]'>
                        <div>Email </div> <input type="text" className='w-[100%]  shadow-xl border rounded-2xl pl-2 h-7' value={email} onChange={(e) => setUsername(e.target.value)} /></span>
                    <span className='w-[70%]'>
                        <div>Password</div>
                        <input type="text" className='w-[100%]  shadow-xl border rounded-2xl pl-2 h-7' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </span>

                    <button className='p-2 px-3 text-white bg-indigo-600 hover:shadow-2xl hover:bg-indigo-400 rounded-2xl' onClick={loginHandle}>
                        Submit
                    </button>
                    <div className='mb-3'>
                        <span>
                            don't have an account?&nbsp;
                        </span>
                        <Link to={'/signup'} className='font-semibold text-indigo-600'>
                            signup
                        </Link>
                    </div>



                </div>


            </div>

        </div>
    )
}

export default Login