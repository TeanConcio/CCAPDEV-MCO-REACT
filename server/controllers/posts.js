/* IMPORTS */

// Modules
import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";





/* MIDDLEWARE */

export const validatePostId = (req, res, next) => {

    // Get postId from request parameters
    const postId = req.params.postId

    // If postId is not a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId))
        // Send error as response
        return res.status(400).json({error: "Invalid post ID"})
    
    // Continue to next middleware
    next()
}





/* CREATE POST */

export const createPost = async (req, res) => {

    try {

        // Get post information and user id from request body
        const { 
            userId, 
            title, 
            body, 
            picturePath 
        } = req.body;
        const user = await User.findById(userId);

        // If there are empty required fields
        if (title === "")
            // Send error as response
            return res.status(400).json({error: "Please fill in a title"})

        // Create new post and save to database
        const newPost = new Post({
            userId,
            username: user.username,
            title, 
            body, 
            picturePath,
            upvotes: {
                [userId]: true
            },
            downvotes: {},
            comments: [],
        });
        await newPost.save();

        //increment post count by 1
        user.postsNum += 1;
        await user.save();

        // Respond with all posts from database to update feed
        const post = await Post.find();
        res.status(201).json(post);
    } 
    catch (err) {

        // Respond with error
        res.status(409).json({ message: err.message });
    }
};





/* UPDATE POST */

export const updatePost = async (req, res) => {

    // Get post and user information from request body and parameters
    const { postId } = req.params;
    const { 
        title, 
        body, 
        picturePath 
    } = req.body;

    // If there are empty required fields
    if (title === "")
        // Send error as response
        return res.status(400).json({error: "Please fill in a title"})

    // Update post from db by postId (asynchronous)
    const post = await Post.findByIdAndUpdate(postId, {
        title: title,
        body: body,
        picturePath: picturePath,
    })

    // If post not found
    if (!post)
        // Send error as response
        return res.status(404).json({error: "Post not found"})

    // Send post data as response
    res.status(200).json(post)
}





/* GET SPECIFIC POST */

export const getPost = async (req, res) => {

    try {

        // Get post id from request parameters and find in database
        const { postId } = req.params;
        const post = await Post.findById(postId);

        // Respond with post
        res.status(200).json(post);
    } 
    catch (err) {

        // Respond with error
        res.status(404).json({ message: err.message });
        console.log(err)
    }
};





/* GET ALL POSTS */

export const getFeedPosts = async (req, res) => {

    try {

        // Respond with all posts from database
        const post = await Post.find().sort({createdAt: -1});
        res.status(200).json(post);
    } 
    catch (err) {

        // Respond with error
        res.status(404).json({ message: err.message });
    }
};





/* GET USER POSTS */

export const getUserPosts = async (req, res) => {

    try {

        // Get user id from request parameters and find their posts in database
        const { userId } = req.params;
        const post = await Post.find({ userId }).sort({createdAt: -1});

        // Respond with all of user's posts
        res.status(200).json(post);
    } 
    catch (err) {

        // Respond with error
        res.status(404).json({ message: err.message });
    }
};





/* UPVOTE POST */

export const upvotePost = async (req, res) => {

    try {

        // Get post and user id from request parameters
        const { postId } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(postId);

        // If user has already upvoted post: remove upvote
        // Else: add upvote and remove downvote if user has downvoted post
        const isUpvoted = post.upvotes.get(userId);
        if (isUpvoted)
            post.upvotes.delete(userId);
        else {
            post.upvotes.set(userId, true);
            post.downvotes.delete(userId);
        }
        
        // Update post in database and respond with updated post
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { upvotes: post.upvotes, downvotes: post.downvotes },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } 
    catch (err) {

        // Respond with error
        res.status(404).json({ message: err.message });
    }
};





/* DOWNVOTE POST */

export const downvotePost = async (req, res) => {

    try {

        // Get post and user id from request parameters
        const { postId } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(postId);

        // If user has already downvoted post: remove downvote
        // Else: add downvote and remove upvote if user has upvoted post
        const isDownvoted = post.downvotes.get(userId);
        if (isDownvoted){
            post.downvotes.delete(userId);
        }
        else {
            post.downvotes.set(userId, true);
            post.upvotes.delete(userId);
        }
      
        
        // Update post in database and respond with updated post
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { upvotes: post.upvotes, downvotes: post.downvotes },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } 
    catch (err) {

        // Respond with error
        res.status(404).json({ message: err.message });
    }
};





/* DELETE POST */

export const deletePost = async (req, res) => {

    // Get postId from request parameters
    const postId = req.params.postId

    // Delete post from db by postId (asynchronous)
    const post = await Post.findByIdAndDelete(postId)

    // If post not found
    if (!post)
        // Send error as response
        return res.status(404).json({error: "Post not found"})

    // Send post data as response
    res.status(200).json(post)
}