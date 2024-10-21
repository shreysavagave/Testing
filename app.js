const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const userModel = require("./models/user");
const matchModel = require("./models/match");
const contestModel = require("./models/contest");
const cookieParser = require('cookie-parser');
app.set("view engine" ,"ejs");
const crypto = require("crypto");
const path = require("path");
app.use(express.static(path.join(__dirname,"public")))

// const upload = require('./utils/multerconfig');

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',function(req,res){
  res.render("index");
})

app.get('/mymatches',function(req,res){
  res.render("mymatches");
})

app.get("/profile",function(req,res){
  res.render("profile");
})

app.listen(3000);