const express = require('express');
const router = express.Router();
const db = require('../models');

//root administration page
router.get('/', (req, res) => {
    res.render('admin/index');
});

//root customer administration page
router.get('/cust', (req, res) => {
    res.render('admin/cust/index');
});

//root product administration page
router.get('/product', (req, res) => {
    res.render('admin/product/index');
});

//new customer page
router.get('/cust/new', (req, res) => {
    res.render('admin/cust/new');
});

//new product page
router.get('/product/new', (req, res) => {
    res.render('admin/product/new');
});

//create customer route
router.post('/cust', (req, res) => {
    res.redirect('admin/cust');
});

//create product route
router.post('/product', (req, res) => {
    res.redirect('admin/product');
});

//create customer show page
router.get('/cust/:id', (req, res) => {
    res.render('admin/cust/show');
});

//create product show page
router.get('/product/:id', (req, res) => {
    res.render('admin/product/show');
});

module.exports = router;