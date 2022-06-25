const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Post = require('../models/Post')

//@route POST api/post
// @desc Create post
// @access Private
router.post('/', verifyToken, async (req, res) => {
    const {title, description, url, status} = req.body
    console.log(req.body)
    //simple validation
    if(!title)
        return res.status(400).json({success: false, message: 'Title is required'})

    try {
        const newPost = new Post({
            title, 
            description, 
            url: (url.startsWith('https://')) ? url: `https://${url}`, 
            status: status || 'TO LEARN',
            user: req.userId
        })

        await newPost.save()

        res.json({success: true, message: 'Happy learning!', post: newPost})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, massage: 'Internet server error'})
    }
})

//@route GET api/post
// @desc Get post
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({user: req.userId}).populate('user', ['username'])
        res.json({success: true, posts})

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, massage: 'Internet server error'})
    }
})

//@route PUT api/post
// @desc Update post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const {title, description, url, status} = req.body

    //simple validation
    if(!title)
        return res.status(400).json({success: false, message: 'Title is required'})

    try {
        let updatedPost = {
            title, 
            description: description || '', 
            url: ((url.startsWith('https://')) ? url: `https://${url}` ) || '', 
            status: status || 'TO LEARN'
        }
        const postUpdateCondition = {_id: req.params.id, user: req.userId} // Dieu kien id cua post va user tao phai dung

        updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, {new: true}) //postUpdateCondition: Dieu kien check, updatedPost: Du lieu update, {new: true}: tra ve du lieu moi duoc update

        //User not authorised to update post or post no found
        if(!updatedPost)
            return res.status(401).json({success: false, message: 'Post not found'})


        res.json({success: true, message: 'Updated success!', post: updatedPost})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, massage: 'Internet server error'})
    }
})


//@route GET api/post
// @desc Get post
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({user: req.userId}).populate('user', ['username'])
        res.json({success: true, posts})

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, massage: 'Internet server error'})
    }
})

//@route DELETE api/post
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = {_id: req.params.id, user: req.userId} // Dieu kien id cua post va user tao phai dung
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition) //postUpdateCondition: Dieu kien check, updatedPost: Du lieu update, {new: true}: tra ve du lieu moi duoc update

        //User not authorised to update post or post no found
        if(!deletedPost)
            return res.status(401).json({success: false, message: 'Post not found'})

        res.json({success: true, message: 'Deleted success!', post: deletedPost})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, massage: 'Internet server error'})
    }
})

module.exports = router