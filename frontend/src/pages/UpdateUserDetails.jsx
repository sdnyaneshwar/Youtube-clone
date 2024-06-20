import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const UpdateUserDetails = () => {
    const dispatch = useDispatch()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [conf_password, setConf_Password] = useState('')
    return (
        <div className='w-full h-screen' style={{ background: `url(${signUpImage} )`, backgroundSize: 'cover' }}>
            <div className='w-[100%] h-[100%] flex justify-center items-center'>
                <div>
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
                            password === conf_password ? <button className='p-2 px-3 text-white bg-indigo-600 hover:shadow-2xl hover:bg-indigo-400 rounded-2xl' onClick={() => setPage(prev => !prev)}>
                                <GoArrowRight className='text-xl font-bold text-indigo-900 ' />
                            </button>
                                :
                                <span className='text-red-700 '>password not matched</span>
                        }

                        <div className='mb-3'>
                            <Link to={'/'} className='font-semibold text-indigo-600'>
                                Update
                            </Link>
                        </div>




                    </div>
                </div>



            </div>

        </div>
    )
}

export default UpdateUserDetails