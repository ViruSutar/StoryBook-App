const Story=require('../Models/Story')




exports.Getlogin=(req,res)=>{
    res.render('login')
}

//@desc  Dashboard route
//@get req to get dashboard page
exports.dashboard=async(req, res) => {
    try {
        const stories= await Story.find({user:req.user._id}).lean() //to use data in template we are using lean 
        res.render('dashboard',{
            name:req.user.name,
            stories         
      });
    } catch (error) {
        console.log(error)
        
    }
   
}



//@desc  Register route
// @get req to get registerpage 
exports.register=(req,res)=>{
    res.render('index',{
        layout:'index.hbs'
    })
}


//@desc get login
exports.login=(req,res)=>{
    res.render('login',{
        layout:'login.hbs'
    })
}