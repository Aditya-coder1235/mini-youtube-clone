const express=require('express');
const app=express()
require('dotenv').config()
const port=process.env.PORT;
const mongoose=require('mongoose');
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));



const userRouter=require('./routes/user.routes');
const videoRouter=require('./routes/video.routes')
const commentRouter=require('./routes/comment.routes')

const cors=require('cors')
const cookieParser=require('cookie-parser');

async function main(){
    await mongoose.connect(process.env.MONGO_URI);
}
main().then(()=>console.log("Connect to db"))
.catch((err)=>console.error(err));

app.use(express.json())
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
    .split(",")
    .map(o => o.trim());

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("Hi am Root");
    console.log(req.user)
})

app.use('/api/auth',userRouter)
app.use('/api/video',videoRouter)
app.use('/api/comment', commentRouter)


app.listen(port,()=>{
    console.log(`server start at ${port} port`);
});