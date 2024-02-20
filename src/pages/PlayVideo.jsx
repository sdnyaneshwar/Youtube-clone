import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { login } from '../store/authSlice'

const PlayVideo = () => {
    const param = useParams()
    const _id = param.videoId;
    const [video, setVideo] = useState({})
    console.log(_id);
    console.log();
    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/videos/${_id}`, {
            withCredentials: true
        }).then((responce) => {
            console.log(responce.data);
            setVideo(responce.data.data)


        }).catch((error) => {
            console.log(error.message);
        })
    }, [])
    console.log(video.videoFile);
    return (
        <div className='w-full h-screen overflow-hidden'>
            <div className='sticky top-0 z-50 h-[15%]'>
                <Navbar />
            </div>
            <div className='flex w-[100%]'>
                <div className='w-[70%]   h-screen scroll-smooth  '>
                    <div className='h-[100%] w-[100%]  flex justify-center items-start overflow-y-auto'>
                        <div className='h-screen w-[95%] mt-[2%]flex-col space-y-4 '>
                            <div className=' h-[70%] w-[100%%]  rounded-lg '>
                                <div>{video.videoFile}
                                </div>
                                <video className='w-[100%]'controls>
                                    <source src={video.videoFile} type="video/mp4"/>
                                            Your browser does not support HTML video.
                                        </video>
                                        {/* <video className="w-full h-full rounded-lg" controls>
                                    <source src={video.videoFile} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video> */}
                                    </div>
                                    <div className='p-3 bg-yellow-300 rounded-lg mt'>
                                        video information
                                        <div>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus eveniet necessitatibus natus quia delectus asperiores, ab ut similique. Recusandae qui placeat laborum nostrum, atque sapiente facere. Dolorem natus obcaecati excepturi!
                                        </div>
                                    </div>
                                    <div className='h-full p-3 bg-green-400 rounded-lg'>
                                        commnents Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni incidunt illum iste ab reprehenderit! Autem, pariatur blanditiis adipisci cumque laboriosam deserunt provident, minus neque quis, rem dolore iste? Debitis, deserunt!
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis possimus alias dolor eos quis tempore animi suscipit? Incidunt sapiente laborum facilis nisi. Dignissimos, inventore modi necessitatibus soluta quibusdam culpa obcaecati!
                                    </div>


                            </div>


                        </div>
                    </div>
                    <div className='w-[30%] h-screen scroll-smooth bg-indigo-500 overflow-y-auto'>

                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, quibusdam suscipit porro voluptatem assumenda vel necessitatibus ipsam voluptate illum ipsum reiciendis maiores quia, animi, recusandae natus! Culpa atque quo tempora.
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt, nobis. Quisquam, labore tempora saepe, earum placeat exercitationem dolore at eos omnis quaerat nemo explicabo consectetur dolor. Corporis doloremque maxime ut!
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, quibusdam suscipit porro voluptatem assumenda vel necessitatibus ipsam voluptate illum ipsum reiciendis maiores quia, animi, recusandae natus! Culpa atque quo tempora.
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt, nobis. Quisquam, labore tempora saepe, earum placeat exercitationem dolore at eos omnis quaerat nemo explicabo consectetur dolor. Corporis doloremque maxime ut!
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, quibusdam suscipit porro voluptatem assumenda vel necessitatibus ipsam voluptate illum ipsum reiciendis maiores quia, animi, recusandae natus! Culpa atque quo tempora.
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt, nobis. Quisquam, labore tempora saepe, earum placeat exercitationem dolore at eos omnis quaerat nemo explicabo consectetur dolor. Corporis doloremque maxime ut!
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, quibusdam suscipit porro voluptatem assumenda vel necessitatibus ipsam voluptate illum ipsum reiciendis maiores quia, animi, recusandae natus! Culpa atque quo tempora.
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt, nobis. Quisquam, labore tempora saepe, earum placeat exercitationem dolore at eos omnis quaerat nemo explicabo consectetur dolor. Corporis doloremque maxime ut!

                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, quibusdam suscipit porro voluptatem assumenda vel necessitatibus ipsam voluptate illum ipsum reiciendis maiores quia, animi, recusandae natus! Culpa atque quo tempora.
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt, nobis. Quisquam, labore tempora saepe, earum placeat exercitationem dolore at eos omnis quaerat nemo explicabo consectetur dolor. Corporis doloremque maxime ut!
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, quibusdam suscipit porro voluptatem assumenda vel necessitatibus ipsam voluptate illum ipsum reiciendis maiores quia, animi, recusandae natus! Culpa atque quo tempora.
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt, nobis. Quisquam, labore tempora saepe, earum placeat exercitationem dolore at eos omnis quaerat nemo explicabo consectetur dolor. Corporis doloremque maxime ut!
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, quibusdam suscipit porro voluptatem assumenda vel necessitatibus ipsam voluptate illum ipsum reiciendis maiores quia, animi, recusandae natus! Culpa atque quo tempora.
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt, nobis. Quisquam, labore tempora saepe, earum placeat exercitationem dolore at eos omnis quaerat nemo explicabo consectetur dolor. Corporis doloremque maxime ut!


                    </div>
                </div>

            </div>

            )
}

            export default PlayVideo