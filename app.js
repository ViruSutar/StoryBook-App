const express=require('express')
const dotenv=require('dotenv');
const path=require('path');
const mongoose=require('mongoose')
const cookieParser = require('cookie-parser')
const exphbs=require('express-handlebars');
const methodOverride=require('method-override')
const globalErrorHandler=require('./controllers/errorController')
const compression=require('compression')
const connectDB=require('./config/db');
const passport = require('passport');
const session=require('express-session')
const flash=require('connect-flash');
const MongoStore=require('connect-mongo')(session)
//Load config
dotenv.config({path:'./config/config.env'})

//database
connectDB()

const app=express();

//body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser()) //use this before intializing  passport

//Method override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
})) 



//static
app.use(express.static(path.join(__dirname,'public')))


//Handlebars helpers
const {formatDate,stripTags,truncate,editIcon,select,selectClass}=require('./helpers/hbs')

//handlebars
app.engine('.hbs',exphbs(
  {helpers:{
formatDate,
stripTags,
truncate,
editIcon,
select,
},
  defaultLayout:'main',extname: '.hbs'}))
app.set('view engine','hbs')

//get Register

//sessions
app.use(session({
    secret: 'secret',
    resave: false,//this means we don't wan't to save a session if nothing is  modified
    maxAge:3600000,
    saveUninitialized: false,
    store:new MongoStore({mongooseConnection:mongoose.connection})
}))


//passport Strategies
app.use(passport.initialize());
app.use(passport.session());


//Set global var
app.use(function(req,res,next){
  res.locals.user=req.user || null //we have used this middleware to access user in our template
  next()
})


//compression
app.use(compression())

// flash
// This should be before express-session
app.use(flash());  

// Global variables
app.use((req,res,next)=>{
    res.locals.success_message=req.flash('success_message');
    res.locals.error_message=req.flash('error_message');
    res.locals.error=req.flash('error');
    next()
})



//routes
app.use('/',require('./routes/indexRoutes'))
app.use('/auth/',require('./routes/userRoutes'));
app.use('/stories',require('./routes/storyRoutes'));




app.all('*', (req, res) => {
        
  res.render('error/notFound',{
        layout:'error.hbs',
        
  })
})
  
  
  app.use(globalErrorHandler);  

const port=process.env.PORT 
app.listen(port,console.log(`Server is running on port ${port}`))