const express = require('express');
const router = express.Router();
const db = require('../models');

// Home page route
router.get('/', (req,res)=>{
  res.render('shop/index');
})

// View all products route
router.get('/products', (req,res)=>{
  db.Products.find({}, function(error, allProducts){
    if(error){
      console.log(error);
    } else {
      const context = {products: allProducts};
      res.render('shop/product', {product: allProducts})
    }
  })
/*   try{
    const foundProduct = await db.Products.find({});
    res.render('shop/product', {product: foundProduct});
  } catch(error) {
    console.log(error);
    res.send({message: "Internal Server Error!"});
  }
 */
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

// subscribe route
router.get('/subscribe', (req,res)=>{
  res.render('shop/subscribe');
})

// log in route
router.get('/login', (req,res)=>{
  res.render('shop/login');
})

// view cart route
router.get('/cart', (req,res)=>{
  res.render('shop/cart');
})

// user page route
router.get('/user', (req,res)=>{
  res.render('shop/user');
})

module.exports = router;