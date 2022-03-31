const mongoose = require('mongoose');


const connectDB =  () => {
   mongoose.connect(process.env.MONGODB_URI, {

    useNewUrlParser: true, 
    
    useUnifiedTopology: true 
    
    }, (err) => {
   
      if(err){
        throw new err;
      }

    console.log('Connected to MongoDB!')
    });
  

};

module.exports = connectDB; 




