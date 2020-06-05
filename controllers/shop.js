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

//ajax call from shopping cart to add items to the shopping cart
router.post('/checkout', async (req,res) => {
  try {
    const cust = await db.Customers.findById({_id: req.body.userId});

    if(cust !== null)
    {
      //if there are more than one items then ajax sends that data as an array and
      //you can access it as such.  If only one item then it sends it as a single item
      if(req.body.itemCount > 1)
      {
        for(let i = 0; i < req.body['ids[]'].length; i++)
        {
          const lineItem = {
            product: req.body['ids[]'][i],
            qty: req.body['qty[]'][i],
            price: req.body['price[]'][i]
          }

          const item = await db.Lineitems.create(lineItem);
          cust.lineitems.push(item);
        }
      }
      else
      {
        const lineItem = {
          product: req.body['ids[]'],
          qty: req.body['qty[]'],
          price: req.body['price[]']
        }

        const item = await db.Lineitems.create(lineItem);
        cust.lineitems.push(item);
      }

      cust.save();
      const confirmNum = Math.floor(Math.random() * 100000);
      res.json({success: true, confirm: confirmNum});
    }
    else
      res.json({err: error});
  }
  catch (error) {
    console.log(error);
    res.json({err: error});
  }
})

// product show route
router.get('/product/:id', async (req, res) => {
  try {
    const foundProduct = await db.Products.findById(req.params.id);
    let birthDate = (foundProduct.birthDate !== null) ? functions.getDate(foundProduct.birthDate, true) : '';
    let readyDate = (foundProduct.readyDate !== null) ? functions.getDate(foundProduct.readyDate, true) : '';

    const product = {
      _id: foundProduct._id,
      name: foundProduct.name,
      description: foundProduct.description,
      price: foundProduct.price,
      birthDate: birthDate,
      readyDate: readyDate,
      available: foundProduct.available,
      growthNotes: foundProduct.growthNotes,
      img: foundProduct.img,
      farmID: foundProduct.farmID
    }
    res.render('shop/show', { product: product });
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
router.post('/', (req, res) => {
  res.render('shop/sub-post');
})

// view cart route
router.get('/cart', (req, res) => {
  res.render('shop/cart');
})

module.exports = router;