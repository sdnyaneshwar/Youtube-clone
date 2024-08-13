import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card';
import axios from 'axios';
import Navbar from '../components/Navbar';

const SearchVideos = () => {
    const params = useParams();
    const search = params.search;
    const [videos, setVideos] = useState()
    const getSearchVideos = () => {
        console.log(search);

        axios.post(`http://localhost:8000/api/v1/videos/video/search/${search}`, {},
            {
                withCredentials: true
            }).then((response) => {
                console.log(response.data);
                setVideos(response.data.data);


            }).catch((error) => {
                console.log("Error during fetch user videos ", error.message);

            })


    }

    useEffect(() => {
        if (search) {
            getSearchVideos();
        }
    }, [search])


    return (
        <div>
            <Navbar/>

            <div className={` grid  justify-center gap-16 sm:grid-cols-2   overflow-y-auto`}>
                {
                    videos && (videos.map((video) => (
                        <Card key={video._id} video={video} />

                    )))
                }

            </div>
            {
                videos?.length <=0 && (
                    <div>No result found</div>
                )
            }
        </div>
    )
}

export default SearchVideos