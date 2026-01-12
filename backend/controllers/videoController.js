const Video=require('../models/videoSchema');


exports.createVideo=async(req,res)=>{
    try{
        let { title, description, views, likes } =req.body
        // console.log(req.user)
        let {id}=req.user

        const imageFile = req.files.image[0];
        const videoFile = req.files.video[0];

        const imageUrl = `/uploads/image/${imageFile.filename}`;
        const videoUrl = `/uploads/video/${videoFile.filename}`;


        if (!imageUrl) {
            return res.status(400).json({ message: "Image required" })
        }


        let newVideo = new Video({ title, description, views, likes, thumbnailUrl: imageUrl, videoUrl: videoUrl,creator:id});

        await newVideo.save();

        res.status(200).json({message:"video create successfully",video:newVideo})

    }catch(err){
        res.status(400).json({message:"Errorduring creating video"})
        console.error(err)
    }
}

exports.getAllVideo = async(req, res) => {
    try {
        let allVideo=await Video.find()

        res.status(200).json({message:"all video fetch successfully",videos:allVideo})

    } catch (err) {
        res.status(400).json({ message: "Errorduring creating video" })
        console.error(err)
    }
}

exports.getVideoById = async(req, res) => {
    try {
        let {id}=req.params;

        let video = await Video.findById(id).populate('comments')

        res.status(200).json({message:"video fetched by id successfully",video:video})

    } catch (err) {
        res.status(400).json({ message: "Errorduring creating video" })
        console.error(err)
    }
}

exports.deleteById = async(req, res) => {
    try {
        let {id}=req.params;

        let deletedVideo=await Video.findByIdAndDelete(id);

        res.status(200).json({message:"video delete successfully"})

    } catch (err) {
        res.status(400).json({ message: "Errorduring creating video" })
        console.error(err)
    }
}



exports.likeVideo = async (req, res) => {
    try {
        const { id } = req.params;

        const video = await Video.findById(id);
        if (!video) return res.status(404).json({ message: "Video not found" });

        video.likes += 1;
        await video.save();

        res.status(200).json({ likesCount: video.likes });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
