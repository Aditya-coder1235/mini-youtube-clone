const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl:{
        type:String,
        required:true
    },
    thumbnailUrl: {
        type: String,
        required:true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    comments:
        [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
            }
        ]
})

const Video = mongoose.model('Video', videoSchema);

module.exports = Video