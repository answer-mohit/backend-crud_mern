const express=require('express');
const app=express();
const cors=require('cors');
require("./conn");
const postModel=require('./models/postmodel');
const PORT=process.env.PORT||5000;

app.use(express.json());
// app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use("/auth",require("./routers/userRouter"));
app.get("/",(req,res)=>{
    res.send('working api')
})
app.get("/read",async(req,res)=>{
    try {
        const savedData=await postModel.find();
        res.send(savedData);     
    } catch (error) {
        res.status(401).send(error);
        console.log(error);
    }
    
});


app.post("/add",async(req,res)=>{
    try {
        const{title,body}=req.body;
    // console.log( title,body);
        const savedata= new postModel({title,body});
      const postdata= await savedata.save();
        res.status(201).json(postdata);
    } catch (error) {
        res.status(401).send(error);
        console.log(error)
    }
});
app.put("/update/:id",async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    const {title,body}=req.body;
    console.log(title,body)
    try {
        const updateData= await postModel.findByIdAndUpdate(id,{title,body}) ;
        await updateData.save();
        res.status(201).send('update');    
    } catch (error) {
        res.status(401).send(error);
        console.log(error)        
    } 
    
});
app.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params;
    
    try {
        const deleteData=await postModel.findByIdAndDelete(id);
        res.status(201).send(deleteData);
        console.log('delete');
        
    } catch (error) {
        res.status(401).send(error);
        console.log(error)        
    }
    
})

app.get('/posts/:id',async(req,res)=>{
    const id=req.params.id;
    try {
        const detaildata=await postModel.findById(id);
        res.status(201).send(detaildata);
    } catch (error) {
        res.status(401).send(error);
        cconsole.log(error);
    }
});
app.listen(PORT,()=>console.log('working'));