const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../models');
const functions = require('../middleware/external');

const router = express.Router();

//login page
router.get('/login', (req,res) => {
    res.render('admin/login');
});

router.post('/login', async (req,res) => {
    try {
        const farm = await db.Farms.findOne({name: functions.getFarmName()});
        
        if(farm.username !== req.body.username)
        {
            return res.send({message: "Password or Email incorrect!"});
        }

        const match = await bcrypt.compare(req.body.password, farm.password);
        
        if(!match)
        {
            return res.send({message: "Password or Email incorrect!"});
        }

        //if match then create the session
        req.session.currentUser = {
            id: farm._id,
            username: farm.username
        }

        res.redirect('/admin');
    }
    catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error!"});
    }
});

module.exports = router;