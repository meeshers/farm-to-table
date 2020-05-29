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

module.exports = router;