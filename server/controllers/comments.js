/* IMPORTS */

// Modules
import mongoose from "mongoose";
import Post from "../models/Post.js";
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
            message
        } = req.body;
    
        // If there are empty required fields
        if (message === "")
            // Send error as response
            return res.status(400).json({error: "Please fill in a message"})
    
        // Find parent and increment commentCount
        const { parentId } = req.params;
        let parent = await Post.findById(parentId);
        if (!parent) {
            parent = await Comment.findById(parentId);
            if (!parent)
                return res.status(404).json({error: "Parent not found"})
        }
        parent.commentCount += 1;
        await parent.save();

        // Find user and increment commentCount
        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({error: "User not found"})
        user.commentCount += 1;
        user.upvoteCount += 1;
        await user.save();
    
        // Create new comment object
        const newComment = new Comment({
            parentId: parentId,
            userId: userId,
            username: user.username,
            message: message,
            upvotes: {
                [userId]: true
            },
            downvotes: {},
            commentCount: 0
        });
        await newComment.save();
    
        // Respond with all comments from database to update feed
        const comments = await Comment.find();
        res.status(201).json(comments);
    } 
    catch (err) {
    
        // Respond with error
        res.status(409).json({ message: err.message });
        console.log(err)
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





// /* GET SPECIFIC COMMENT */

// export const getComment = async (req, res) => {

//     try {

//         // Get comment id from request parameters and find in database
//         const { commentId } = req.params;
//         const comment = await Comment.findById(commentId);

//         // Respond with comment
//         res.status(200).json(comment);
//     } 
//     catch (err) {

//         // Respond with error
//         res.status(404).json({ message: err.message });
//         console.log(err)
//     }
// };





/* GET PARENT COMMENTS */

export const getParentComments = async (req, res) => {

    try {

        // Get parentId from request parameters and find in database
        const { parentId } = req.params;

        // Get parent from database
        let parent = await Post.findById(parentId);
        if (!parent) {
            parent = await Comment.findById(parentId);
            if (!parent)
                return res.status(404).json({error: "Parent not found"})
        }

        // Get all comments with parentId from database
        const comments = await Comment.find({ parentId: parentId }).sort({ createdAt: -1 });

        // Respond with all of post's comments
        res.status(200).json(comments); // Return only the comments array
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
        if (!comment)
            return res.status(404).json({error: "Comment not found"})

        // Get user from database
        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({error: "User not found"})

        // If user has already upvoted comment: remove upvote
        // Else: add upvote and remove downvote if user has downvoted comment
        const isUpvoted = comment.upvotes.get(userId);
        if (isUpvoted) {
            comment.upvotes.delete(userId);
            user.upvoteCount -= 1;
        }
        else {
            comment.upvotes.set(userId, true);
            user.upvoteCount += 1;

            if (comment.downvotes.get(userId)) {
                comment.downvotes.delete(userId);
                user.downvoteCount -= 1;
            }
        }
        user.save();
        
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
        if (!comment)
            return res.status(404).json({error: "Comment not found"})

        // Get user from database
        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({error: "User not found"})

        // If user has already downvoted comment: remove downvote
        // Else: add downvote and remove upvote if user has upvoted comment
        const isDownvoted = comment.downvotes.get(userId);
        if (isDownvoted) {
            comment.downvotes.delete(userId);
            user.downvoteCount -= 1;
        }
        else {
            comment.downvotes.set(userId, true);
            user.downvoteCount += 1;

            if (comment.upvotes.get(userId)) {
                comment.upvotes.delete(userId);
                user.upvoteCount -= 1;
            }
        }
        user.save();
        
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
    
    // Find parent and decrement comment count
    let parent = await Post.findById(comment.parentId);
    if (!parent) {
        parent = await Comment.findById(comment.parentId);
        if (!parent)
            return res.status(404).json({error: "Parent not found"})
    }
    parent.commentCount -= 1;
    await parent.save();

    // Find user
    const user = await User.findById(comment.userId);
    if (!user)
        // Send error as response
        return res.status(404).json({error: "User not found"})

    // Decrement user's commentCount
    user.commentCount -= 1;

    // Decrement user's upvoteCount and downvoteCount
    if (comment.upvotes.get(user._id))
        user.upvoteCount -= 1;
    else {
        if (comment.downvotes.get(user._id))
            user.downvoteCount -= 1;
    }

    await user.save();

    deleteCommentsRecursive(commentId);

    // Send comment data as response
    res.status(200).json(comment)
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