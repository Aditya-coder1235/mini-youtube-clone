const Comment = require('../models/commentSchema')
const Video = require('../models/videoSchema')

exports.createComment = async (req, res) => {
    try {
        let { text } = req.body;
        let { id } = req.params
        let userId=req.user
        let newComment = new Comment({ text ,userId:userId.idnpm })


        let video = await Video.findByIdAndUpdate(id, { comments: newComment.id })

        await newComment.save()

        res.status(200).json({ message: "Comment successfully", comment: newComment })

    } catch (error) {
        res.status(400).json({ message: "Error during create comment" });
        console.error(error)
    }
}



exports.deleteComment = async (req, res) => {
    try {
        let { id } = req.params;

        await Comment.findByIdAndDelete(id)

        res.status(200).json({ message: "Comment delete successfully" });

    } catch (error) {
        res.status(400).json({ message: "Error during Deleting comment" });
        console.error(error)
    }
}