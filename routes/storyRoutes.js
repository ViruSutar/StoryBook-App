const express=require('express');
const router=express.Router()
const stories=require('../controllers/stories')
const authController=require('../controllers/auth');
const { route } = require('./indexRoutes');

//get route to show add page
router.get('/add',authController.checkAuthenticated,stories.addStories)

//post route to create stories
router.post('/',authController.checkAuthenticated,stories.createStories);

//read full story
router.get('/:id',authController.checkAuthenticated,stories.ShowStory)

//to show all public stories
router.get('/',authController.checkAuthenticated,stories.PublicStories)

//edit story page
router.get('/edit/:id',authController.checkAuthenticated,stories.editPage)

//User stories
router.get('/user/:userId',authController.checkAuthenticated,stories.UserStories);

//Update story
router.put('/:id',authController.checkAuthenticated,stories.UpdateStory)

//Delete story
router.delete('/:id',authController.checkAuthenticated,stories.DeleteStories)
module.exports=router;