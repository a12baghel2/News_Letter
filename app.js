const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

//Created App
const app = express();

//To use static pages
app.use(express.static("public"));

//To use bodyparser
app.use(bodyParser.urlencoded({ extended: true }));

//To post signup page
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

//Post data from the site
app.post("/", function (req, res) {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname,
        },
      },
    ],
  };

  //To convert objects into JSON
  const jsonData = JSON.stringify(data);

  //URL end point
  const url = "https://us6.api.mailchimp.com/3.0/lists/2522500ad9";
  const options = {
    method: "POST",
    auth: process.env.API_KEY,
  };
  //HTTPS Request
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

//Post request for Failure
app.post("/failure", function (req, res) {
  res.redirect("/");
});

//Binding and Providing PORT
app.listen(process.env.PORT || 3500, function () {
  console.log("Server is running");
});

/*const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
require('dotenv/config');

const app =express();

app.use(express.static("public"));  //to acces all the static files 
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  try {
    res.sendFile(__dirname + "/signup.html");
  } catch (error) {
    console.log(error);
  }
});

app.post("/",function(req,res){
 const firstName = req.body.fname;
 const lastName = req.body.lname;
 const mail = req.body.mail;

 var data = {
   members: [
     {
      email_address: mail,
      status : "subscribed",
      merge_fields : {
          FNAME: firstName,
          LNAME: lastName
      }
     }
    ]
}

const jsonData = JSON.stringify(data);
 //console.log(firstName , lastName , mail);
 const url = "https://us6.api.mailchimp.com/3.0/lists/2522500ad9";
 const options = {
   method : "POST",
   auth : process.env.API_KEY
 }
 const request = https.request(url,options,function(response){

if(response.statusCode===200){
  res.sendFile(__dirname+"/success.html");
}
else{
  res.sendFile(__dirname+"/failure.html");
}

   response.on("data" ,function(data){
     console.log(JSON.parse(data));
   })
 })

 request.write(jsonData);
 request.end();


});

app.post("/failure" ,function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 8000 ,function(){
  console.log("server 8000 OK ");
});
*/

//API key
//cf9fd9a14e7a2a96fec6bc1e001b645a-us6
//audience id
