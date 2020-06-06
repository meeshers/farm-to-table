const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../models');
const functions = require('../middleware/external');

const router = express.Router();

const adminUser = "admin";
const adminPass = "admin1";

//root administration page
router.get('/', async (req, res) => {
    try {
        const foundFarm = await db.Farms.findOne({name: functions.getFarmName()});

        res.render('admin/index', {farm: foundFarm});

    } 
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

//ROOT customer administration page
router.get('/cust', async (req, res) => {
    try {
        const farmCustomers = await db.Farms.findOne({name: functions.getFarmName()}).populate('customers');
        
        res.render('admin/cust', {customers: farmCustomers.customers});
    }
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
    //res.render('admin/cust/index');
});

//ROOT product administration page
router.get('/product', async (req, res) => {
    try {
        const farmProducts = await db.Farms.findOne({name: functions.getFarmName()}).populate('products');

        res.render('admin/product', {products: farmProducts.products}); 
    }
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

//New farm page
router.get('/newFarm', (req, res) => {
    const context = {
        name: functions.getFarmName(),
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
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(req.body.password, salt);

        req.body.password = hash;

        const createFarm = await db.Farms.create(req.body);

        res.redirect('/admin');
    } catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

//CREATE customer route
router.post('/cust', async (req, res) => {
    try {

        const farm = await db.Farms.findOne({name: functions.getFarmName()});
        req.body.farmID = farm._id;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(req.body.password, salt);

        req.body.password = hash;

        const newCust = await db.Customers.create(req.body);

        farm.customers.push(newCust);
        farm.save();
        
        res.redirect('/admin/cust'); 

    } catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

//CREATE product route
router.post('/product', async (req, res) => {
    try {

        const farm = await db.Farms.findOne({name: functions.getFarmName()});
        req.body.price = functions.formatPrice(functions.stripDollar(req.body.price));
        req.body.farmID = farm._id;
        
        const newProduct = await db.Products.create(req.body);

        farm.products.push(newProduct);
        farm.save();
        
        res.redirect('/admin/product');

    } catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

//SHOW customer show page
router.get('/cust/:id', async (req, res) => {
    try {
        //const customer = await db.Customers.findById(req.params.id).populate('lineitems');

        const customer = await db.Customers.findById(req.params.id).populate({path: 'lineitems', populate: {path: 'product', model: 'Product'}});
        // if(customer.lineitems.length > 0)//check for lineitems (order history)
        //     console.log(customer.lineitems[0].product.name);
        // else
        //     console.log(customer.lineitems);//[0].product.name);

        res.render('admin/cust/show', {customer: customer});
    } 
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

//SHOW product show page
router.get('/product/:id', async (req, res) => {
    try {
        const foundProduct = await db.Products.findById(req.params.id);
        //let price = (foundProduct.price)? functions.stripDollar(foundProduct.price) : '';
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
        res.render('admin/product/show', {product: product});
    }
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

//EDIT farm page
router.get('/:id/edit', async (req, res) => {
    try {
        const farm = await db.Farms.findById(req.params.id);
    
        res.render('admin/editFarm', {farm: farm});
    }
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

//EDIT customer page
router.get('/cust/:id/edit', async (req, res) => {
    try {
        const customer = await db.Customers.findById(req.params.id);

        res.render('admin/cust/edit', {customer: customer});
    }
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

//EDIT product page
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
            img: foundProduct.img,
            farmID: foundProduct.farmID
        }
        res.render('admin/product/edit', {product: product});
    } 
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

//UPDATE farm route
router.put('/:id', async (req, res) => {
    try {
        
        let farmUpdate;
        if(req.body.passUpdated === 'true')
        {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(req.body.password, salt);

            farmUpdate = {
                name: req.body.name,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                phone: req.body.phone,
                email: req.body.email,
                username: req.body.username,
                password: hash
            }
        }
        else
        {
            farmUpdate = {
                name: req.body.name,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                phone: req.body.phone,
                email: req.body.email,
                username: req.body.username
            }
        }
        
        await db.Farms.findByIdAndUpdate(req.params.id, farmUpdate, {new:true});
        
        res.redirect('/admin');
    }
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

//UPDATE customer route
router.put('/cust/:id', async (req, res) => {
    try {

        let custUpdate;
        if(req.body.passUpdated === 'true')
        {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(req.body.password, salt);

            custUpdate = {
                name: req.body.name,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                phone: req.body.phone,
                email: req.body.email,
                password: hash
            }
        }
        else
        {
            custUpdate = {
                name: req.body.name,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                phone: req.body.phone,
                email: req.body.email
            }
        }
        await db.Customers.findByIdAndUpdate(req.params.id, custUpdate, {new:true});

        res.redirect(`/admin/cust/${req.params.id}`);
    }
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

//UPDATE product route
router.put('/product/:id', async (req, res) => {
    try {
        req.body.price = functions.formatPrice(functions.stripDollar(req.body.price));
        
        await db.Products.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.redirect(`/admin/product/${req.params.id}`);
    }
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

//DELETE customer route
router.delete('/cust/:id', async (req, res) => {
    try {
        const delCust = await db.Customers.findByIdAndDelete(req.params.id);
        const farm = await db.Farms.findOne({name: functions.getFarmName()});

        farm.customers.remove(delCust);
        farm.save();

        res.redirect('/admin/cust');
    }
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

//DELETE product route
router.delete('/product/:id', async (req, res) => {
    try {
        const delProduct = await db.Products.findByIdAndDelete(req.params.id);
        const farm = await db.Farms.findOne({name: functions.getFarmName()});

        farm.products.remove(delProduct);
        farm.save();

        res.redirect('/admin/product');
    }
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

module.exports = router;