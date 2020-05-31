const express = require('express');
const functions = require('../middleware/external');
const router = express.Router();
const db = require('../models');

const farmName = "Pieces of Ate";
const adminUser = "admin";
const adminPass = "admin1";

//root administration page
router.get('/', async (req, res) => {
    try {
        const foundFarm = await db.Farms.findOne({name: farmName});

        res.render('admin/index', {farm: foundFarm});

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
router.get('/product', async (req, res) => {
    try {
        const allProducts = await db.Products.find({});
        res.render('admin/product', {products: allProducts});
    }
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"})
    }
});

//New farm page
router.get('/newFarm', (req, res) => {
    const context = {
        name: farmName,
        username: adminUser,
        password: adminPass
    }

    res.render('admin/newFarm', context);
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
    res.redirect('/admin/cust');
});

//CREATE product route
router.post('/product', async (req, res) => {
    try {
        req.body.available = (req.body.available)? true : false; 
        req.body.price = functions.formatPrice(functions.stripDollar(req.body.price));
        
        await db.Products.create(req.body);
        res.redirect('/admin/product');
    } catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
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
router.get('/product/:id/edit', async (req, res) => {
    try {
        const foundProduct = await db.Products.findById(req.params.id);
        let price = (foundProduct.price)? functions.stripDollar(foundProduct.price) : '';
        let birthDate = (foundProduct.birthDate !== null)? functions.getDate(foundProduct.birthDate) : '';
        let readyDate = (foundProduct.readyDate !== null)? functions.getDate(foundProduct.readyDate) : '';
        
        const product = {
            _id: foundProduct._id,
            name: foundProduct.name,
            description: foundProduct.description,
            price: price,
            birthDate: birthDate,
            readyDate: readyDate,
            available: foundProduct.available,
            growthNotes: foundProduct.growthNotes,
            img: foundProduct.img
        }
        res.render('admin/product/edit', {product: product});
    } 
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"})
    }
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
router.put('/product/:id', async (req, res) => {
    try {
        req.body.available = (req.body.available)? true : false;
        req.body.price = functions.formatPrice(functions.stripDollar(req.body.price));

        console.log(req.body);
        
        await db.Products.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.redirect(`/admin/product/${req.params.id}`);
    }
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"})
    }
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