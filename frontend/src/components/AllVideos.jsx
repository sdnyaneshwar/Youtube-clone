import React from 'react'
import Card from './Card'
import { useSelector } from 'react-redux'


const AllVideos = () => {
    const menuIcon = useSelector((state) => state.nav.menuState)
    const getVideo = useSelector((state) => state.video.allVideo)
    const userstatus = useSelector((state) => state.auth.status)
    if (!Array.isArray(getVideo)) {
        // If getVideo is not an array, render a message or handle it in another way
        return <div>No videos available</div>;
    }
    return (
        <div className={` grid  justify-center gap-16 sm:grid-cols-2  ${menuIcon ? `w-[70%] md:grid-cols-3 gap-16 sm:grid-cols-1` : `w-[100%] md:grid-cols-4`}  overflow-y-auto`}>
            {
             userstatus &&   getVideo.map((video) => (
                <Card key={video._id} video={video} />

            ))
            }
        </div>

    )
}

export default AllVideos