const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const model = require('../models/User');

const JWT_secret = "ayushisagoodboy$";

//ROUTE 1 : endpoint to create a user using POST request '/api/auth/createuser'
router.post('/createuser', [
    body('name', 'name length is less than 3').isLength({ min: 3 }),
    body('email', 'invalid email').isEmail(),
    body('password', 'it must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    //if errors exists then this will be called.
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ success,error: errors.array() })
    }

    //finding for duplicate keys
    const duplicateemail = await model.findOne({ email: req.body.email })
    console.log(duplicateemail);
    if (duplicateemail) {
        return res.status(404).json({ success,error: "this email is already registered with the site" })
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        const user = await model.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken =jwt.sign(data, JWT_secret);
        success = true;
        res.json({success , authtoken: authtoken })
    } catch (err) {
        res.json({ success,error: 'some error occured' })
    }
})

//ROUTE 2 : authenticate a user using post request '/api/auth/login'
router.post('/login', [
    body('email', 'invalid email').isEmail(),
    body('password', 'password cannot be blank').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({success : success, errors: errors.array() })
    }

    
    try {
        const user = await model.findOne({ email: req.body.email });
        if (!user) {
            return res.json({success : success, error: 'please try to login with correct credentials' })
        }


        const passwordcompare = await bcrypt.compare(req.body.password, user.password);
        if (!passwordcompare) {
            return res.json({success : success, error: 'please try to login with correct credentials' })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_secret);
        success = true;
        res.json({success : success, authtoken: authtoken });
    } catch (err) {
        res.json({ success : success,error: 'some error occured at server side' })
    }

})

//ROUTE 3 : get login user details using POST : "/api/auth/getuser", login required
router.post('/getuser', fetchuser,async(req, res) => {
    let success = false;
    try {
        userID = req.user.id;
        const user = await model.findById(userID).select('-password')
        res.send(user);

    } catch (err) {
        res.json({success, error: 'some error occured in fetching data' });
    }
})



module.exports = router;