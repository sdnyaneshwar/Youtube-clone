import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
    const { thumbnail, title, views, createdAt, _id } = props.video;

    return (
        <div className="w-[260px] h-auto bg-zinc-100 shadow-md border-b rounded-2xl  hover:shadow-lg hover:border-indigo-400 transition-all duration-300 m-3">
            <Link to={`/playvideo/${_id}`} className="block p-3">
                <div className="mb-3">
                    <img
                        src={thumbnail}
                        alt="coverImage"
                        className="w-full h-[140px] object-cover rounded-xl"
                    />
                </div>
                <div className="flex flex-col gap-1 text-sm text-gray-800">
                    {/* <div className="text-xs text-gray-500 font-medium">User</div> */}
                    <div className="text-base font-semibold line-clamp-2">{title}</div>
                    {/* <div className="text-xs text-gray-500 mt-1">Channel Name</div> */}
                    <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                        <span>{views} views</span>
                        <span>{new Date(createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Card;
