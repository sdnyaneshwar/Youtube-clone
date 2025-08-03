import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';

const Reels = () => {
    const videoRefs = useRef([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.post('/api/v1/videos/gelAllVideos', { isVideo: false }, {
                    withCredentials: true
                });
                setVideos(response.data.data); // Adjust based on actual response structure
            } catch (error) {
                console.error('Error fetching videos:', error.message);
            }
        };

        fetchVideos();
    }, []);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    setCurrentVideoIndex(videoRefs.current.indexOf(video));
                    if (video.paused) {
                        video.play().catch((error) => console.error('Playback error:', error));
                    }
                } else {
                    if (!video.paused) {
                        video.pause();
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        videoRefs.current.forEach((video) => {
            if (video) {
                observer.observe(video);
            }
        });

        return () => {
            videoRefs.current.forEach((video) => {
                if (video) {
                    observer.unobserve(video);
                }
            });
        };
    }, [videos]);

    const handlePlayPause = () => {
        if (currentVideoIndex !== null && videoRefs.current[currentVideoIndex]) {
            const video = videoRefs.current[currentVideoIndex];
            if (video.paused) {
                video.play().catch((error) => console.error('Playback error:', error));
                setIsPlaying(true);
            } else {
                video.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleMuteUnmute = () => {
        if (currentVideoIndex !== null && videoRefs.current[currentVideoIndex]) {
            const video = videoRefs.current[currentVideoIndex];
            video.muted = !video.muted;
        }
    };

    const handleSeek = (event) => {
        if (currentVideoIndex !== null && videoRefs.current[currentVideoIndex]) {
            const video = videoRefs.current[currentVideoIndex];
            video.currentTime = (event.target.value / 100) * video.duration;
        }
    };

    const updateSlider = () => {
        if (currentVideoIndex !== null && videoRefs.current[currentVideoIndex]) {
            const video = videoRefs.current[currentVideoIndex];
            setCurrentTime(video.currentTime);
            setDuration(video.duration);
        }
    };

    useEffect(() => {
        const video = videoRefs.current[currentVideoIndex];
        if (video) {
            video.addEventListener('timeupdate', updateSlider);
            return () => {
                video.removeEventListener('timeupdate', updateSlider);
            };
        }
    }, [currentVideoIndex]);

    if (videos.length === 0) {
        return <div>Loading...</div>;
    }

    const handleBack = ()=>{
        navigate('/')
        console.log("I runs");
        
    }
    return (
        <div className='m-0 p-0 bg-sky-600 w-full h-screen flex justify-center items-center'>
            <button
                className='absolute top-5 left-5 p-2 bg-white rounded-full z-10'
                onClick={handleBack}
            >
                <IoArrowBackSharp />
            </button>
            <div className='relative w-full h-full flex justify-center'>
                <div className='flex flex-col gap-3 h-[90vh] w-[24vw] mt-[4vh] overflow-auto snap-y snap-mandatory scrollbar-hidden'>
                    {videos.map((video, index) => (
                        <div key={index} className='min-h-[90vh] min-w-[24vw] bg-yellow-400 snap-start' onClick={handlePlayPause}>
                            <video
                                ref={(el) => (videoRefs.current[index] = el)}
                                className='w-full h-full'
                                 // For debugging purposes
                            >
                                <source src={video.videoFile} type="video/mp4" />
                                Your browser does not support HTML video.
                            </video>
                            <input
                            type="range"
                            min="0"
                            max="100"
                            value={(currentTime / duration) * 100 || 0}
                            onChange={handleSeek}
                            className="slider z-10 absolute bottom-8 w-[24vw] "
                        />
                        </div>
                    ))}
                </div>
                {currentVideoIndex !== null && (
                    <div className="custom-controls absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col gap-4">
                        <div className="flex gap-4 hidden">
                            <button onClick={handlePlayPause} className="control-button">
                                {isPlaying ? 'Pause' : 'Play'}
                            </button>
                            <button onClick={handleMuteUnmute} className="control-button">
                                Mute/Unmute
                            </button>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={(currentTime / duration) * 100 || 0}
                            onChange={handleSeek}
                            className="slider hidden"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reels;
