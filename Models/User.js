const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs')


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please tell us your name!'],
        minlength:[2,'Name can\'t be smaller than 2 characters'],
        maxlength:[64,'Name can\'t be greater than 64 characters']
    },
    email:{
        type:String,
        lowercase:true,
        required: [true, 'Please provide your email'],
        
        maxlength:[128,'Email can\'t be greater than 128 characters ' ],
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:8,
        
    },
    ConfirmPassword:{
        type:String,
        required:[true,'Please confirm your password'],
        validate:{
            //This  only works on create and save
            validator:function(el){
                return el === this.password
            },
            message:'Passwords are not same'
        }
    }
})

userSchema.pre('save', async function(next){
    //hash the password with the cost of 12
    this.password=await bcrypt.hash(this.password,12);

    //Delete ConfirmPassword Field
    this.ConfirmPassword=undefined;
    next()
})

//Comparing pass
userSchema.methods.correctPassword=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}



const User=mongoose.model('User',userSchema);
module.exports=User;