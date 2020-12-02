const mongoose=require('mongoose');

require('dotenv').config({ path: 'config.env' });


const DB="mongodb+srv://Viraj:viraj2402@cluster0.aq7jg.mongodb.net/Blog?retryWrites=true&w=majority"

const connectDB=async() =>{
    try{
        const conn=await mongoose.connect(DB,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log(`mongoDB connected:${conn.connection.host}`);

    }catch(err){
        console.error(err);
        process.exit(1);
    }
}

module.exports=connectDB;