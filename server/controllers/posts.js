/* IMPORTS */

// Modules
import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";





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
        
        // If there are empty required fields
        if (title === "")
        // Send error as response
        return res.status(400).json({error: "Please fill in a title"})
        
        // Find user and increment postCount
        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({error: "User not found"})
        user.postCount += 1;
        user.upvoteCount += 1;
        await user.save();

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
            commentCount: 0
        });
        await newPost.save();

        await user.save();

        // Respond with all posts from database to update feed
        const post = await Post.find();
        res.status(201).json(post);
    } 
    catch (err) {

        // Respond with error
        res.status(409).json({ message: err.message });
        console.log(err)
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
        const currUserId = req.params.userId;

        const post = await Post.find({userId: currUserId}).sort({createdAt: -1});

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

        if (!post)
            return res.status(404).json({error: "Post not found"})

        // Get user from database
        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({error: "User not found"})

        // If user has already upvoted post: remove upvote
        // Else: add upvote and remove downvote if user has downvoted post
        const isUpvoted = post.upvotes.get(userId);
        if (isUpvoted) {
            post.upvotes.delete(userId);
            user.upvoteCount -= 1;
        }
        else {
            post.upvotes.set(userId, true);
            user.upvoteCount += 1;

            if (post.downvotes.get(userId)) {
                post.downvotes.delete(userId);
                user.downvoteCount -= 1;
            }
        }
        user.save();
        
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
        if (!post) 
            return res.status(404).json({error: "Post not found"})

        // Get user from database
        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({error: "User not found"})

        // If user has already downvoted post: remove downvote
        // Else: add downvote and remove upvote if user has upvoted post
        const isDownvoted = post.downvotes.get(userId);
        if (isDownvoted){
            post.downvotes.delete(userId);
            user.downvoteCount -= 1;
        }
        else {
            post.downvotes.set(userId, true);
            user.downvoteCount += 1;

            if (post.upvotes.get(userId)) {
                post.upvotes.delete(userId);
                user.upvoteCount -= 1;
            }
        }
        user.save();

        
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
    if (!post)
        // Send error as response
        return res.status(404).json({error: "Post not found"})
    
    // Find user
    const user = await User.findById(post.userId);
    if (!user)
        // Send error as response
        return res.status(404).json({error: "User not found"})

    // Decrement user's postCount
    user.postCount -= 1;

    // Decrement user's upvoteCount and downvoteCount
    if (post.upvotes.get(user._id))
        user.upvoteCount -= 1;
    else {
        if (post.downvotes.get(user._id))
            user.downvoteCount -= 1;
    }

    await user.save();

    await deleteCommentsRecursive(postId)

    // Send post data as response
    res.status(200).json(post)
}



const deleteCommentsRecursive = async (parentId) => {

    const toDelete = await Comment.find({parentId: parentId})

    console.log(toDelete)

    for (let i = 0; i < toDelete.length; i++) {

        // Find user
        const user = await User.findById(toDelete[i].userId);
        if (!user)
            // Send error as response
            return res.status(404).json({error: "User not found"})

        // Decrement user's commentCount
        user.commentCount -= 1;

        // Decrement user's upvoteCount and downvoteCount
        if (toDelete[i].upvotes.get(user._id))
            user.upvoteCount -= 1;
        else {
            if (toDelete[i].downvotes.get(user._id))
                user.downvoteCount -= 1;
        }

        await user.save();

        await deleteCommentsRecursive(toDelete[i]._id)

        await Comment.findByIdAndDelete(toDelete[i]._id)
    }
}