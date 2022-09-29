const express = require('express');
const joi = require('joi');
const User = require('../models/User');
const Card = require('../models/Card');
const_ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

const registerSchema = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().min(6).email(),
    password: joi.string().required().min(8),
    biz:joi.boolean().required(),
});


router.post('/', async (req, res) => {
    try {
        //joi validation
        const { error } = registerSchema.validate(req.body)
        if (error) return res.status(400).send(error.message)

        //check for existing user
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('user already exist')
        //add new user
        user = new User(req.body);
        //encrypt password with bcrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        //create token
        const genToken = jwt.sign({ _id: user._id, biz: user.biz }, process.env.secretKey);


        await user.save();
        res.status(201).send({token:genToken});
    } catch (error) {
        res.status(400).send('error in register'+error);
    }
});
module.exports = router;