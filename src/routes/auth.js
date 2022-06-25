const express = require('express')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const verifyToken = require('../middleware/auth')

const router = express.Router()

//router.get('/', (req, res) => res.send('Hello! Auth'))

// @route POST api/auth/register
// @desc Register user
// @access public
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    //Simple validation
    if( !username || !password )
        return res.status(400).json({success: false, message: 'Missing username or password'})

    try {
        //check for existing user
        const user = await User.findOne({username})
        if(user)
            return res.status(400).json({success: false, message: 'Username already taken'})

        // All ok
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({username, password: hashedPassword})
        await newUser.save()

        //return token
        const accressToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)

        res.json({success: true, message: 'Ok', accressToken})

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, massage: 'Internet server error'})
    }
})

// @route POST api/auth/login
// @desc Login user
// @access public
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    //Simple validation
    if( !username || !password )
        return res.status(400).json({success: false, message: 'Missing username or password'})

    try {
        // check for existing user
        const user = await User.findOne({username})
        if(!user)
            return res.status(400).json({success: false, message: 'Incorrect username or password'})
        
        // Username found
        const passwordValid = await argon2.verify(user.password, password)
        if(!passwordValid)
            return res.status(400).json({success: false, message: 'Incorrect username or password'})

        // all ok
        //return token
        const accressToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)

        res.json({success: true, message: 'Login success', accressToken})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, massage: 'Internet server error'})
    }
})

// @route GET api/auth/login
// @desc Check if user is logged in
// @access public
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if(!user)
            return res.status(400).json({success: false, message: 'User not found'})
        
        res.status(200).json({success: true, message: 'Login success', user})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, massage: 'Internet server error'})
    }
})

module.exports = router