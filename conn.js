require('dotenv').config()
const mongoose=require('mongoose');
mongoose.connect(process.env.DB_URL,
    {
        useCreateIndex:true,
        useFindAndModify:false,
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log('connnect')).catch((err)=>console.log(err));