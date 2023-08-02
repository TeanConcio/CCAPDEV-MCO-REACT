/* IMPORTS */

// Modules
import mongoose from "mongoose";





/* SCHEMA */

const commentSchema = mongoose.Schema(
    {
        parentId: {
            type: String,
            required: true,
            ref: "Post"
        },
        userId: {
            type: String,
            required: true,
            ref: "User"
        },
        username: {
            type: String,
            required: true,
            min: 2,
            max: 20
        },
        message: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        upvotes: {
            type: Map,
            of: Boolean,
            default: {},
        },
        downvotes: {
            type: Map,
            of: Boolean,
            default: {},
        },
        commentCount: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { 
        timestamps: true,
        collection: "Comments"
    }
);





/* EXPORT */

// Export Post Schema as Model
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;