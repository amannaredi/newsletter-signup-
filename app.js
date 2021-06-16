const express = require("express");
const bodyParser = require("body-parser");
const https = require("https") ;
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){

   const fname = req.body.firstname;
   const lname = req.body.lastname;
   const email = req.body.email;
   console.log(fname , lname , email);

   const data = {
        members:[
          {
            email_address:email,
            status:"subscribed",
            merge_fields:{
              FNAME:fname,
              LNAME:lname,
            }
          }
        ]
   }

   const jsonData = JSON.stringify(data);

   const url = "https://us1.api.mailchimp.com/3.0/lists/391d75b280";
   const options={
     method:"POST",
     auth:"aman:0ba43b7b071ebae32b73c5d632cc4c37-us"
   }
   const request = https.request(url, options, function(response){

     if (response.statusCode===200){
       res.sendFile(__dirname + "/success.html")
     } else{
       res.sendFile(__dirname + "/failure.html")
     }

     response.on("data",function(data){
        console.log(JSON.parse(data));
     })
   })
    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req,res){
  res.redirect("/");
});


app.listen("3000",function(req,res){
  console.log("server at port 3000");
})

// apikey
// 0ba43b7b071ebae32b73c5d632cc4c37-us1

// ID
// 391d75b280
