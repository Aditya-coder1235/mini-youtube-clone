const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        text:{
            type:String
        }
});


const Comment=mongoose.model('Comment',commentSchema)

module.exports=Comment;