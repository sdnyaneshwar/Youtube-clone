import React from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';

const AllVideos = () => {
    const menuIcon = useSelector((state) => state.nav.menuState);
    const getVideo = useSelector((state) => state.video.allVideo);
    const userstatus = useSelector((state) => state.auth.status);

    if (!Array.isArray(getVideo)) {
        return <div className="text-center text-gray-600 mt-10">No videos available</div>;
    }

    return (
        <div className={`grid gap-8 ${menuIcon ? 'sm:grid-cols-2 md:grid-cols-3' : 'sm:grid-cols-2 md:grid-cols-4'} transition-all duration-300`}>
            {userstatus && getVideo.map((video) => (
                <Card key={video._id} video={video} />
            ))}
        </div>
    );
};

export default AllVideos;