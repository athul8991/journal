//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ =require('lodash')
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const posts =[];
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

mongoose.connect("mongodb+srv://athuls8991:tlHFPOJBAVvNb6A5@cluster0.ityc9mx.mongodb.net/journalDb",{useNewUrlParser:true},(err)=>{
  if(err){
    console.log("Error Connect : "+err);
  }else{
    console.log("Connected");
  }
})

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose schema

const postSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  content:String

})

// mongoose model


const Post = mongoose.model("Post",postSchema)



app.get("/",(req,res)=>{

  Post.find({},(err,result)=>{
    if(err){
      console.log("Find Error : "+err);
    }else{
      if(result == 0){
        console.log("Empty");
        res.render("home",{
          homeContent:homeStartingContent,
          posts:result
      
        })
      }else{
        console.log(result);
        res.render("home",{
          homeContent:homeStartingContent,
          posts:result
      
        })

      }
    }
  })
  
 
})

app.get("/about",(req,res)=>{
  res.render("about",{aboutContent:aboutContent})
})

app.get("/contact",(req,res)=>{
  res.render("contact",{contactContent:contactContent})
})

app.get("/compose",(req,res)=>{
  res.render("compose")
})


//compose Post

app.post("/compose",(req,res)=>{
  
    const postTitle=req.body.postTitle
    const postContent=req.body.postBody

  const post =new Post({
    title:postTitle,
    content:postContent

  });
  post.save((err)=>{
    if(err){
      console.log("Save error : "+err)
    }else{
      console.log("Saved");
      res.redirect("/");
    }
  })
  
  
})






app.get("/post/:postName",(req,res)=>{

  const postId = req.params.postName;
  console.log("post id : "+postId);

  // if(posts.length ===0){
  //   console.log("No posts Found");
  // }

//   posts.forEach((data)=>{
//     if(_.lowerCase(data.postTitle) === _.lowerCase(req.params.postName)){
//       res.render('post',{cont:data});
//       res.end();

//     }
  
// })

Post.findOne({_id:postId},(err,result)=>{
  if(err){
    console.log("Find post Error : "+err);
  }else{
    res.render("post",{post:result});
  }
})
  
})













app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
