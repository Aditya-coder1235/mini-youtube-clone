import { Eye, ThumbsUp } from "lucide-react";
import {useParams,useNavigate} from 'react-router'

const VideoCard = ({ video }) => {
    const navigate=useNavigate()
    

    return (
        <div
            className="w-96 bg-white rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer "
            onClick={() => navigate(`/video/${video._id}`)}
        >
            <div className="relative">
                <img
                    src={`http://localhost:8080${video.thumbnailUrl}`}
                    alt={video.title}
                    className="w-full h-60 rounded-2xl"
                />
            </div>

            <div className="p-3 space-y-2">
                <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {video.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">
                    {video.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    {/* <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span>{video.views} views</span>
                    </div> */}

                    <div className="flex items-center gap-1">
                        Likes <ThumbsUp size={16} />
                        <span>{video.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
