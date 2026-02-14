import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useState } from "react";

const VideoById = () => {
    let { id } = useParams();
    const [video, setVideo] = useState(null);
    const [text, setText] = useState("");
    const [likesCount, setLikesCount] = useState(0);

    async function fetchVideoById() {
        try {
            let res = await axios.get(
                `http://localhost:8080/api/video/getById/${id}`,
                {
                    withCredentials: true,
                }
            );
            setVideo(res.data.video);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchVideoById();
    }, []);

    async function addComment() {
        try {
            let res = await axios.post(
                `http://localhost:8080/api/comment/create/${id}`,
                { text },
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    const handleCommentForm = (e) => {
        e.preventDefault();
        addComment();
    };

    const handleLike = async () => {
        try {
            const res = await axios.put(
                `http://localhost:8080/api/video/like/${id}`,
                {},
                { withCredentials: true }
            );
            setLikesCount(res.data.likesCount);
        } catch (error) {
            console.error("Error liking video:", error);
        }
    };

    return (
        <div className="bg--100 min-h-screen p-6 flex justify-center">
            <div className="w-full max-w-5xl flex flex-col gap-6">
                {video && (
                    <div className="bg- rounded-xl shadow-md overflow-hidden">
                        <video
                            src={`http://localhost:8080${video.videoUrl}`}
                            controls
                            className="w-full h-96 object-cover rounded-md bg-"
                        />

                        <div className="p-5 space-y-3">
                            <h1 className="text-xl font-semibold text--900">
                                {video.title}
                            </h1>

                            <div className="flex items-center gap-4 text-sm text--600">
                                <span>•</span>
                                <span>{likesCount} likes</span>

                                <button
                                    onClick={handleLike}
                                    className="ml-4 px-3 py-1 bg-blue-500 text- rounded hover:bg-blue-600 transition"
                                >
                                 Like
                                </button>
                            </div>

                            <hr />

                            <p className="text--700 leading-relaxed">
                                {video.description}
                            </p>
                        </div>
                    </div>
                )}

                <div className="bg- rounded-xl shadow-md p-5 space-y-4">
                    <h2 className="text-lg font-semibold text--800">
                        Comments
                    </h2>

                    <form onSubmit={handleCommentForm} className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="flex-1 border-b border--300 focus:outline-none focus:border-gray-600 py-2"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text- px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Comment
                        </button>
                    </form>

                    <div className="space-y-4 mt-4">
                        {video?.comments?.length > 0 ? (
                            video.comments.map((comment) => (
                                <div key={comment._id} className="flex gap-3">
                                    <div >
                                        comment:-
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-800">
                                            {comment.text}
                                        </p>
                                        
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">
                                No comments yet
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoById;
