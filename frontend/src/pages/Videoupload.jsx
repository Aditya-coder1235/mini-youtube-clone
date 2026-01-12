import { useState } from "react";
import axios from "axios";

const Videoupload = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const[video,setVideo]=useState(null)

    
    async function uploadVideo() {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("video", video);


        let res = await axios.post(
            "http://localhost:8080/api/video/create",
            formData,
            {withCredentials:true}
        );
        alert('video upload');
        setTitle('')
        setDescription('')
        console.log(res.data)
            
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        uploadVideo()
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-md rounded-xl shadow-md p-6 space-y-5"
            >
                <h2 className="text-xl font-semibold text-gray-800 text-center">
                    Upload Video
                </h2>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        placeholder="Add a title that describes your video"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Description
                    </label>
                    <input
                        type="text"
                        placeholder="Tell viewers about your video"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Thumbnail
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-red-50 file:text-red-600
                hover:file:bg-red-100"
                required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Choose Video
                    </label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideo(e.target.files[0])}
                        className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-red-50 file:text-red-600
                hover:file:bg-red-100"
                required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 rounded-md font-medium hover:bg-red-700 transition"
                >
                    Upload Video
                </button>
            </form>
        </div>
    );
};

export default Videoupload;
