const { findOneAndUpdate } = require('../Models/Story');
const Story=require('../Models/Story');
const router = require('../routes/indexRoutes');


//@desc show  add  story page
exports.addStories=(req,res)=>{
    res.render('stories/add')
}


//@desc to create stories 
exports.createStories=async(req,res)=>{
    try{
        req.body.user=req.user.id //This is to store objectID in DB
        const story=await Story.create(req.body)
        
        res.redirect('/dashboard')
    }catch(err){
        // console.log(err);

    }
   
    
}

//@desc Show public stories 
exports.PublicStories=async(req,res)=>{
    try{
        const stories=await Story.find({status:'public'})
        .populate('user')
        .sort({createdAt:'desc'})
        .lean()
        res.render('stories/pStories',{
            stories
        })
       

    }catch(err){
        console.log(err)
    }
}

//@desc Show full story 
exports.ShowStory=async(req,res)=>{
    try {
        let story=await Story.findById(req.params.id).populate('user').lean()

        if(!story){
            return console.log('No Story')
        }
        res.render('stories/show',{
            story
        })
    } catch (err) {
        // console.error(err)
    }
}


//@desc Show edit page
exports.editPage=async(req,res)=>{
    try{ 
        const story=await Story.findOne ({
        _id:req.params.id
    }).lean()

   
    if(!story){
        return  console.log(err)//Come here again //
    }
    //check if the owner of the story is editing the story or not
    const storyuser=story.user.toString();
    const requser=req.user.id.toString();
    if(storyuser !== requser){
        // console.log(storyuser )
        // console.log( requser)
        res.redirect('/stories')
    }
    else{
       
    res.render('stories/edit',{
        story
    })
    }}
   catch(err){
    //   console.log(err)
   }

}

//@desc Update story
exports.UpdateStory=async(req,res)=>{
    let story=await Story.findById(req.params.id).lean()

    if(!story){
        return console.log("error")
    }
    const storyuser=story.user.toString();
    const requser=req.user.id.toString();
    if(storyuser !== requser){    
        res.redirect('/stories')
    }
    else{
        story=await Story.findOneAndUpdate({_id:req.params.id},req.body,{
            new:true ,//If story doesant exist then it will create a new
            runValidators:true //This will check all the validators which we have set in the mongoose field
        })
        res.redirect('/dashboard')
    }


}

//@desc User stories
exports.UserStories=async(req,res)=>{
try {
    const stories=await Story.find({
        user:req.params.userId, //we want to get only the user is equal to req.params .userId
        status:'public'
    }).populate('user').lean()
    res.render('stories/pStories',{
        stories
    })
} catch (err) {
    // console.error(err)
}
}

//@desc Delete story
exports.DeleteStories=async(req,res)=>{
    try {
        await Story.remove({_id:req.params.id})
        res.redirect('/dashboard')
    } catch (err) {
        // console.error(err)
    }
}