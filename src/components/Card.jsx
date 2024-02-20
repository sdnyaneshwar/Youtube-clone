import React from 'react'
import { Link } from 'react-router-dom';

const Card = (props) => {


    return (
        <div className=' w-[250px] h-[250px] hover:border p-[10px] flex flex-col justify-center items-center rounded-xl m-3 hover:shadow-md ' >
            <Link to={`/playvideo/${props.video._id}`}>
                <div>
                    <img src={props.video.thumbnail} alt="coverImage" className='w-[220px] h-[130px] rounded-2xl' />
                </div>
                <div className='w-[200px]'>
                    <div>
                        <div>
                            avatar
                        </div>
                        <div>
                            {props.video.title}
                        </div>
                    </div>
                    <span>channel Nama</span>
                    <div>
                        <span>view</span>
                        <span>{props.video.createsAt}</span>
                    </div>
                </div>

            </Link>
        </div>
    )
}

export default Card