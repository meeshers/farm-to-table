const express = require('express');
const router = express.Router();
const functions = require('../middleware/external');
const db = require('../models');

// Home page route
router.get('/', (req, res) => {
  res.render('shop/index');
})

// View all products route
router.get('/products', async (req, res) => {
  try {
    const allProducts = await db.Products.find({});
    res.render('shop/product', { product: allProducts });
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal Server Error!" });
  }
})

// product show route
router.get('/product/:id', async (req, res) => {
  try {
    const foundProduct = await db.Products.findById(req.params.id);
    let birthDate = (foundProduct.birthDate !== null)? functions.getDate(foundProduct.birthDate, true) : '';
    let readyDate = (foundProduct.readyDate !== null)? functions.getDate(foundProduct.readyDate, true) : '';
    
    const product = {
        _id: foundProduct._id,
        name: foundProduct.name,
        description: foundProduct.description,
        price: foundProduct.price,
        birthDate: birthDate,
        readyDate: readyDate,
        available: foundProduct.available,
        growthNotes: foundProduct.growthNotes,
        img: foundProduct.img
    }
    res.render('shop/show', {product: product});
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal Server Error!" });
  }
})

// about page route
router.get('/about', (req, res) => {
  res.render('shop/about');
})

// subscribe route
router.get('/subscribe', (req, res) => {
  res.render('shop/subscribe');
})

// subscribe POST route
router.post('/', (req,res) => {
  res.render('shop/sub-post');
})

// view cart route
router.get('/cart', (req, res) => {
  res.render('shop/cart');
})

module.exports = router;