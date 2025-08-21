const mongoose = require('mongoose');

require('dotenv').config()

const connectToMongoDB = () =>{
    try{
        mongoose.connect(process.env.MONGO_DB_URL);
        console.log('MongoDB connected successfully!!!');
        
    } catch(e){
        console.log(e.message);
        
    }
   
}

module.exports = {connectToMongoDB};