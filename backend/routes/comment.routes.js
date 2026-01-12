const express=require('express');
const { createComment, deleteComment } = require('../controllers/commentController');
const router=express.Router()
const authMiddleware=require('../middleware/authMiddleware')

router.post('/create/:id',authMiddleware,createComment);
router.delete('/delete',deleteComment);

module.exports=router