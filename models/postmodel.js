const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:false
    },
    body:{
        type:String,
        required:false
    }
});

const postModel=mongoose.model("crud",postSchema);
module.exports=postModel;