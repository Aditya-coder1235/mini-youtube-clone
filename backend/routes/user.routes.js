const express=require('express');
const { SignupUser, LoginUser, Logout } = require('../controllers/userConroller');
const router=express.Router();

router.post('/signup',SignupUser)
router.post('/login',LoginUser)
router.post('/logout',Logout);


module.exports=router