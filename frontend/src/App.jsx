import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import UploadAvatar from './pages/UploadAvatar'
import Login from './pages/Login'
import {Routes , Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import UploadVideo from './pages/UploadVideo'
import UserProfile from './pages/UserProfile'
import PlayVideo from './pages/PlayVideo'
import UpdateUserDetails from './pages/UpdateUserDetails'
import SearchVideos from './pages/SearchVideos'



function App() {





  return (
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Home' element={<Navbar/>}/>
        <Route path='/upload-video' element={<UploadVideo/>}/>
        <Route path='/profile/:username' element={<UserProfile/>}/>
        <Route path='/uploadAvatar' element={<UploadAvatar/>}/>
        <Route path='/playvideo/:videoId' element={<PlayVideo/>}/>
        <Route path='/updateuserdetails' element={<UpdateUserDetails/>}/>
        
        <Route path='/video/:search' element={<SearchVideos/>}/>
      </Routes>


  )

}

export default App
