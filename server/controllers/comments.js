/* IMPORTS */

// Modules
import mongoose from "mongoose";
import Comment from "../models/Comment.js";
import User from "../models/User.js";





/* MIDDLEWARE */

export const validateCommentId = (req, res, next) => {

    // Get commentId from request parameters
    const commentId = req.params.commentId

    // If commentId is not a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(commentId))
        // Send error as response
        return res.status(400).json({error: "Invalid comment ID"})
    
    // Continue to next middleware
    next()
}





/* CREATE COMMENT */

export const createComment = async (req, res) => {

    try {

        // Get comment information and user id from request body
        const { 
            userId, 
            message,
        } = req.body;
        const user = await User.findById(userId);

        // If there are empty required fields
        if (message === "")
            // Send error as response
            return res.status(400).json({error: "Please fill in a message"})

        // Create new comment and save to database
        const newComment = new Comment({
            userId,
            username: user.username,
            message,
            upvotes: {
                [userId]: true
            },
            downvotes: {},
            comments: [],
        });
        await newComment.save();

        // Respond with all comments from database to update feed
        const comment = await Comment.find();
        res.status(201).json(comment);
    } 
    catch (err) {

        // Respond with error
        res.status(409).json({ message: err.message });
    }
};





/* UPDATE COMMENT */

export const updateComment = async (req, res) => {

    // Get comment and user information from request body and parameters
    const { commentId } = req.params;
    const { 
        message
    } = req.body;

    // If there are empty required fields
    if (message === "")
        // Send error as response
        return res.status(400).json({error: "Please fill in a message"})

    // Update comment from db by commentId (asynchronous)
    const comment = await Comment.findByIdAndUpdate(commentId, {
        message: message
    })

    // If comment not found
    if (!comment)
        // Send error as response
        return res.status(404).json({error: "Comment not found"})

    // Send comment data as response
    res.status(200).json(comment)
}





/* GET SPECIFIC COMMENT */

export const getComment = async (req, res) => {

    try {

        // Get comment id from request parameters and find in database
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);

        // Respond with comment
        res.status(200).json(comment);
    } 
    catch (err) {

        // Respond with error
        res.status(404).json({ message: err.message });
        console.log(err)
    }
};





/* GET POST COMMENTS */

export const getPostComments = async (req, res) => {

    try {

        // Get post id from request parameters and find their comments in database
        const { postId } = req.params;
        const post = await Post.findById(postId).populate("comments"); // Use await and assign result to post

        if (!post) {
            return res.status(404).json({ message: "Post not found" }); // Handle post not found
        }

        // Sort the comments by date in descending order
        post.comments.sort((a, b) => b.createdAt - a.createdAt); // Use a custom function to sort by createdAt

        // Respond with all of post's comments
        res.status(200).json(post.comments); // Return only the comments array
    } 
    catch (err) {

        // Respond with error
        res.status(400).json({ error: err.message });
    }
};





/* UPVOTE COMMENT */

export const upvoteComment = async (req, res) => {

    try {

        // Get comment and user id from request parameters
        const { commentId } = req.params;
        const { userId } = req.body;
        const comment = await Comment.findById(commentId);

        // If user has already upvoted comment: remove upvote
        // Else: add upvote and remove downvote if user has downvoted comment
        const isUpvoted = comment.upvotes.get(userId);
        if (isUpvoted)
            comment.upvotes.delete(userId);
        else {
            comment.upvotes.set(userId, true);
            comment.downvotes.delete(userId);
        }
        
        // Update comment in database and respond with updated comment
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { upvotes: comment.upvotes, downvotes: comment.downvotes },
            { new: true }
        );
        res.status(200).json(updatedComment);
    } 
    catch (err) {

        // Respond with error
        res.status(404).json({ message: err.message });
    }
};





/* DOWNVOTE COMMENT */

export const downvoteComment = async (req, res) => {

    try {

        // Get comment and user id from request parameters
        const { commentId } = req.params;
        const { userId } = req.body;
        const comment = await Comment.findById(commentId);

        // If user has already downvoted comment: remove downvote
        // Else: add downvote and remove upvote if user has upvoted comment
        const isDownvoted = comment.downvotes.get(userId);
        if (isDownvoted)
            comment.downvotes.delete(userId);
        else {
            comment.downvotes.set(userId, true);
            comment.upvotes.delete(userId);
        }
        
        // Update comment in database and respond with updated comment
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { upvotes: comment.upvotes, downvotes: comment.downvotes },
            { new: true }
        );
        res.status(200).json(updatedComment);
    } 
    catch (err) {

        // Respond with error
        res.status(404).json({ message: err.message });
    }
};





/* DELETE COMMENT */

export const deleteComment = async (req, res) => {

    // Get commentId from request parameters
    const commentId = req.params.commentId

    // Delete comment from db by commentId (asynchronous)
    const comment = await Comment.findByIdAndDelete(commentId)

    // If comment not found
    if (!comment)
        // Send error as response
        return res.status(404).json({error: "Comment not found"})

    // Send comment data as response
    res.status(200).json(comment)
}