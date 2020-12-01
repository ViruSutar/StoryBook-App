const User=require('../Models/User');
const passport=require('passport');
require('../config/passport')(passport);



exports.register=async(req,res,next)=>{  
  try{
  const user=await User.create(req.body)

      passport.authenticate('local', {
                  failureRedirect: '/',
                  successRedirect: '/dashboard'
                })(req, res, next)
              }catch(err){
                res.render('index',{
                  layout:'index.hbs',
                  message:err
                })
              }
              
      }
             
              




//@desc  Loin user
exports.login=async(req,res,next)=>{
  let { email, name, password, confirmpassword } = req.body;
  let err;
  if(!email ||!password ){
    err="Please fill all the Fields"
   return res.render('login',{
      layout:'login.hbs',
      message:err
    })

  }
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    err="Incorrect email or password"
    return res.render('login',{
      layout:'login.hbs',
      message:err
    })
  }
    try{ 
      passport.authenticate('local', {
      failureRedirect: '/auth/login',
      successRedirect: '/dashboard',
      failureFlash: true,
      
  })(req, res, next);
}catch(err){
  res.render('login',{
    layout:'login.hbs',
    message:err
  })
}
   

}

//@desc  to check if logged in 
exports .checkAuthenticated =  (req, res, next)=> {
  if (req.isAuthenticated()) {
      res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
      return next();
  } else {
      res.redirect('/');
  }
}

//@desc  
exports.ensureGuest=(req,res,next)=>{
  if(req.isAuthenticated()){
    res.redirect('/')
  }else{
    return next()
  }
}

//@desc  logout route 
exports.logout=(req,res)=>{
req.logout();
res.redirect('/')
}

