const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const db = require("../models");

// register route
router.get('/register', (req,res) => {
  res.render('shop/auth/register');
})

// register post route
router.post('/register', async (req,res)=>{
  try{
    const foundUser = await db.Customers.findOne({ email: req.body.email });
    if(foundUser){
      return res.send({ message: "Account is already registered. Please log in"});
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const newUser = await db.Customers.create(req.body);
    res.redirect("/login");
  } catch(err) {
    console.log(err);
    res.send({message: "Internal server error", error: err})
  }
})

// log in route
router.get('/login', (req, res) => {
  res.render('shop/auth/login');
})

// login POST route
router.post('/login', async (req,res)=>{
  try{

  } catch(error) {
    console.log(error);
    res.send({message: "Internal server error"});
  }
  res.render('shop/auth/user');
})

// logout (delete)

// user page route
router.get('/user', (req, res) => {
  res.render('shop/user');
})

module.exports = router;