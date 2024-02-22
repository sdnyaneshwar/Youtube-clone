import React from 'react'
import Card from './Card'
import { useSelector } from 'react-redux'


const SidebarVideos = () => {
    const menuIcon = useSelector((state) => state.nav.menuState)
    const getVideo = useSelector((state) => state.video.allVideo)
    const userstatus = useSelector((state) => state.auth.status)
    if (!Array.isArray(getVideo)) {
        // If getVideo is not an array, render a message or handle it in another way
        return <div>No videos available</div>;
    }
    return (
        <div className={` grid  justify-center gap-5 grid-cols-1 `}>
            {
             userstatus &&   getVideo.map((video) => (
                <Card key={video._id} video={video} />

            ))
            }
            



        </div>

    )
}

export default SidebarVideos