/* IMPORTS */

// Modules
import mongoose from "mongoose";





/* SCHEMA */

const commentSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
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
        },
        downvotes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: []
        }
    },
    { 
        timestamps: true,
        collection: "Comments"
    }
);





/* EXPORT */

// Export Comment Schema as Model
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;