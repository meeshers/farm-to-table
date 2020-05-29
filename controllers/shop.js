const express = require('express');
const router = express.Router();
const db = require('../models');

// Home page route
router.get('/', (req,res)=>{
  res.render('shop/index');
})

// View all products route
router.get('/products', (req,res)=>{
  res.render('shop/product');
})

// product show route
router.get('/product/:id', (req,res)=>{
  //const context = req.params.id;
  res.render('shop/show');
})

// about page route
router.get('/about', (req,res)=>{
  res.render('shop/about');
})

router.get('/subscribe', (req,res)=>{
  res.render('shop/subscribe');
})

module.exports = router;