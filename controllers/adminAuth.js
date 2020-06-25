const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../models');
const functions = require('../middleware/external');

const router = express.Router();

//login page
router.get('/login', (req,res) => {

    const invalid = {
        username: "",
        valid: true
    }

    res.render('admin/login', {invalid: invalid});
});

router.post('/login', async (req,res) => {
    try {
        const farm = await db.Farms.findOne({name: functions.getFarmName()});
        const match = await bcrypt.compare(req.body.password, farm.password);

        if(farm.username !== req.body.username || !match)
        {
            const invalid = {
                username: req.body.username,
                valid: false
            }

            return res.render('admin/login', {invalid: invalid});
        }

        //if match then create the session
        req.session.currentUser = {
            id: farm._id,
            username: farm.username,
            admin: true
        }

        res.redirect('/admin');
    }
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

//logout delete <- destroy session
router.delete('/logout', async (req,res) => {
    await req.session.destroy();
    res.redirect('/admin/login');
});

module.exports = router;