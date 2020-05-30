const express = require('express');
const router = express.Router();
const db = require('../models');

const farmName = "Pieces of Ate";
const adminUser = "admin";
const adminPass = "admin1";

//root administration page
router.get('/', async (req, res) => {
    try {
        const foundFarm = await db.Farms.find({name: farmName});
        //const context = {farm: foundFarm[0]}; //find returns an array even if it is just one element
        res.render('admin/index', {farm: foundFarm[0]});
    } 
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"})
    }
});

//ROOT customer administration page
router.get('/cust', (req, res) => {
    res.render('admin/cust/index');
});

//ROOT product administration page
router.get('/product', (req, res) => {
    res.render('admin/product/index');
});

//New farm page
router.get('/newFarm', (req, res) => {
    res.render('admin/newFarm');
});

//NEW customer page
router.get('/cust/new', (req, res) => {
    res.render('admin/cust/new');
});

//NEW product page
router.get('/product/new', (req, res) => {
    res.render('admin/product/new');
});

//CREATE farm route
router.post('/', async (req, res) => {
    try {
        const createFarm = await db.Farms.create(req.body);
        res.redirect('admin/');
    } catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

//CREATE customer route
router.post('/cust', (req, res) => {
    res.redirect('admin/cust');
});

//CREATE product route
router.post('/product', (req, res) => {
    res.redirect('admin/product');
});

//SHOW customer show page
router.get('/cust/:id', (req, res) => {
    res.render('admin/cust/show');
});

//SHOW product show page
router.get('/product/:id', (req, res) => {
    res.render('admin/product/show');
});

//EDIT customer show page
router.get('/cust/:id/edit', (req, res) => {
    res.render('admin/cust/edit');
});

//EDIT product show page
router.get('/product/:id/edit', (req, res) => {
    res.render('admin/product/edit');
});

//UPDATE farm route
router.put('/:id', (req, res) => {
    res.redirect(`admin/index${req.params.id}`);
});

//UPDATE customer route
router.put('/cust/:id', (req, res) => {
    res.redirect(`admin/cust/${req.params.id}`);
});

//UPDATE product route
router.put('/product/:id', (req, res) => {
    res.redirect(`admin/product/${req.params.id}`);
});

//DELETE customer route
router.delete('/cust/:id', (req, res) => {
    res.redirect('admin/cust');
});

//DELETE product route
router.delete('/product/:id', (req, res) => {
    res.redirect('admin/product');
});

module.exports = router;