import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { login } from '../store/authSlice'
import SidebarVideos from '../components/SidebarVideos'
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import CommentForm from '../components/CommentForm'
import CommentBox from '../components/CommentBox'


const PlayVideo = () => {
    const param = useParams()
    let _id = param.videoId;
    const [video, setVideo] = useState({})
    const [key, setkey] = useState(0)
    const [owner, setOwner] = useState({})
    const [description, setDescription] = useState(false)
    const [like, setLike] = useState();

    const likeHandle = () => {
        if (_id) {
            axios.get(`http://localhost:8000/api/v1/like/c/${_id}`, {
                withCredentials: true
            }).then((response) => {
                setLike(prev => !prev)
            }).catch((error) => {
                console.log(error.message);
            })
        }
    }

    const subscribeHandle = () => {
        console.log(owner._id);
        const channelId = owner._id;
        if (owner) {
            axios.post(`http://localhost:8000/api/v1/subscribe/c/${channelId}`, null,
                {
                    withCredentials: true
                }).then((response) => {
                    console.log(response.data);
                    getUserProfile()
                }).catch((error) => {
                    console.log(error.message);
                })
        }
    }


    const getUserProfile = () => {
        if (video.owner) {
            const ownerId = video.owner;
            console.log(ownerId);
            axios.get(`http://localhost:8000/api/v1/users/c/${ownerId}`, {
                withCredentials: true
            })
                .then((response) => {
                    const data = response.data.data;
                    setOwner(data);
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
        setLike(video.isLiked)
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/videos/${_id}`, {
            withCredentials: true
        }).then((responce) => {
            console.log(responce.data.data[0]);

            setVideo(responce.data.data[0]);
            setkey(prev => prev + 1)


        }).catch((error) => {
            console.log(error.message);
        })

        getUserProfile()
    }, [_id])


    useEffect(() => {
        if (video.owner) {
            getUserProfile();
        }
    }, [video.owner])


    return (
        <div key={key} className='w-full h-full overflow-hidden'>
            <div className='sticky top-0 z-50 h-[15%]'>
                <Navbar />
            </div>
            <div className='flex w-[100%]'>
                <div className='w-[75%]   h-screen scroll-smooth  '>
                    <div className='h-[100%] w-[100%]  flex justify-center items-start overflow-y-auto'>
                        <div className='h-screen w-[95%] mt-[2%]flex-col space-y-4'>
                            <div className='  w-[100%%]  rounded-lg '>
                                {video.videoFile &&
                                    <video className='w-[100%]' controls>
                                        <source src={video.videoFile} type="video/mp4" />
                                        Your browser does not support HTML video.
                                    </video>
                                }  {/* <video className="w-full h-full rounded-lg" controls>
                                    <source src={video.videoFile} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video> */}
                            </div>
                            <div className='p-3 bg-indigo-100 rounded-lg mt'>
                                <div className='w-[100%]  items-center'>
                                    <div className='px-8 py-3'>
                                        <h1 className='items-center font-bold'>{video.title}</h1>

                                    </div>
                                    <Link to={`/profile/${owner.username}`} >
                                    <div className='flex gap-2'>
                                        <img className="w-10 h-10 rounded-full" src={owner.avatar} alt="Rounded avatar"></img>
                                        <div>{owner.username}</div>
                                    </div>
                                    </Link>
                                </div>
                                <div className='w-[100%] flex gap-4 items-center justify-between'>
                                    <div>
                                        <nav>viwes {video.views}</nav>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <div onClick={likeHandle}>
                                            <AiOutlineLike className={`text-xl  ${like ? "hidden" : "visible"}`} />
                                            <AiFillLike className={`text-xl ${like ? "visible" : "hidden"}`} />
                                            <nav>{video.videoLikedCount}</nav>
                                        </div>
                                        <div className={`p-2 text-white rounded-full cursor-pointer ${owner.isSubscribed ? "bg-indigo-950" : "bg-indigo-500"}`} onClick={subscribeHandle}>
                                            Subscriber  {owner.subscriberCounts}
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[100%] flex gap-4 items-center'>
                                    <div>

                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>

                            <div className='p-3 bg-indigo-100 rounded-lg mt'>
                                <div className={`${description ? "bg-slate-400 p-3" : "p-3 bg-slate-400  w-fit"}`} onClick={() => setDescription(prev => !prev)}>
                                    <button className=''>
                                        description
                                    </button>
                                </div>
                                <div className={`${description ? "visible" : "hidden "}`}>
                                    commnents Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni incidunt illum iste ab reprehenderit! Autem, pariatur blanditiis adipisci cumque laboriosam deserunt provident, minus neque quis, rem dolore iste? Debitis, deserunt!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis possimus alias dolor eos quis tempore animi suscipit? Incidunt sapiente laborum facilis nisi. Dignissimos, inventore modi necessitatibus soluta quibusdam culpa obcaecati!

                                </div>
                            </div>
                            { video && <div className='w-full bg-white rounded-lg '>
                                <div>
                                <CommentForm video={video._id}/>
                                </div>
                                <div>
                                    <CommentBox video={video._id}/>
                                </div>
                            </div>}


                        </div>


                    </div>
                </div>
                <div className='w-[25%] h-screen scroll-smooth bg-white flex justify-center overflow-y-auto'>

                    <SidebarVideos />
                </div>
            </div>

        </div>

    )
}

export default PlayVideo