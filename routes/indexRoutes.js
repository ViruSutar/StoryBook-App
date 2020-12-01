
const express=require('express');
const router=express.Router();
const index=require('../controllers/index');
const authController=require('../controllers/auth')


//@desc Route for home page
router.get('/dashboard',authController.checkAuthenticated,index.dashboard)


//@desc get routes for reg and log pages
router.get('/',index.register);
router.get('/auth/login',index.login)


 module.exports=router;