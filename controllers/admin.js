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


module.exports = router;