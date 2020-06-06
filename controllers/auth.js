const express = require("express");
const functions = require('../middleware/external');

const router = express.Router();
const bcrypt = require("bcryptjs");

const db = require("../models");

// register route
router.get('/register', (req, res) => {
  res.render('shop/auth/register');
})

// register post route
router.post('/register', async (req, res) => {
  try {
    const foundUser = await db.Customers.findOne({ email: req.body.email });
    if (foundUser) {
      return res.send({ message: "Account is already registered. Please log in" });
    }

    //get the farmID so that the new customer can be added to it
    const farm = await db.Farms.findOne({ name: functions.getFarmName() });
    req.body.farmID = farm._id;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const newUser = await db.Customers.create(req.body);

    farm.customers.push(newUser);
    farm.save();
    res.render('shop/auth/post-reg');

  } catch (err) {
    console.log(err);
    res.send({ message: "Internal server error", error: err })
  }
})

// log in route
router.get('/login', (req, res) => {
  const invalid = {
    username: '',
    valid: true
  }

  res.render('shop/auth/login', { invalid: invalid });
})

// login POST route
router.post('/login', async (req, res) => {
  try {
    const farm = await db.Farms.findOne({name: functions.getFarmName()});
    //make sure the user exists and they have an account with the farm
    const foundUser = await db.Customers.findOne({ $and: [ {email: req.body.email}, {farmID: farm._id}, {deleted: false} ]});
    if (!foundUser) {

      const invalid = {
        email: req.body.email,
        valid: false
      }

      return res.render('shop/auth/login', { invalid: invalid });
    }

    const match = await bcrypt.compare(req.body.password, foundUser.password);
    if (!match) {

      const invalid = {
        email: req.body.email,
        valid: false
      }

      return res.render('shop/auth/login', { invalid: invalid });
    }

    req.session.currentUser = {
      id: foundUser._id,
      name: foundUser.name
    }
    res.redirect("/user");
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal server error" });
  }
})

// logout (delete)
router.delete("/logout", async (req, res) => {
  await req.session.destroy();
  res.redirect("/");
})

// user page route
router.get('/user', async (req, res) => {
  try {
    const foundUser = await db.Customers.findById(req.session.currentUser.id);
    res.render('shop/auth/user', { user: foundUser })
  } catch (err) {
    res.redirect('/login');
  }
})

// edit user route
router.get('/user/edit', async (req, res) => {
  const foundUser = await db.Customers.findById(req.session.currentUser.id);
  res.render('shop/auth/edit', { user: foundUser });
})

// edit user PUT route
router.put('/user/:id', async (req, res) => {
  try {

    await db.Customers.findByIdAndUpdate(req.session.currentUser.id, req.body, { new: true });

    res.redirect('/user');
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal server error" });
  }
})

module.exports = router;