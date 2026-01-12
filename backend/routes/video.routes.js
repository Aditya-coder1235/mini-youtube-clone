const express=require('express');
const { createVideo, getAllVideo, getVideoById, deleteById, likeVideo,  } = require('../controllers/videoController');
const router=express.Router();
const upload=require('../middleware/upload')
const authMiddleware=require('../middleware/authMiddleware')

router.post('/create',authMiddleware,upload.fields([{name:'video',maxCount:1},{name:'image',maxCount:1}]),createVideo)
router.get('/getAll',getAllVideo)
router.get('/getById/:id',getVideoById)
router.delete('/delete/:id',authMiddleware,deleteById)
router.put('/like/:id',likeVideo)

module.exports=router