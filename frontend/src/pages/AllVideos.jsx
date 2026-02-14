import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";

const AllVideos = () => {
    const [videos, setVideos] = useState([]);
    const [pending, setPending] = useState(true);
    const [error, setError] = useState(null);

    async function fecthAllVideos() {
        try {
            let res = await axios.get(
                "http://localhost:8080/api/video/getAll",
                {
                    withCredentials: true,
                }
            );
            setVideos(res.data.videos);
            console.log(res.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fecthAllVideos();
        setPending(false);
    }, []);

    if (pending) return <p>Loading....</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-wrap gap-6 justify-center pt-5 pb-10">
            {videos.map((video) => {
                return <VideoCard key={video._id} video={video} />;
            })}
        </div>
    );
};

export default AllVideos;
