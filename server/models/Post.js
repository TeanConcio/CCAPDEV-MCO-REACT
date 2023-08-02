/* IMPORTS */

// Modules
import mongoose from "mongoose";





/* SCHEMA */

const postSchema = mongoose.Schema(
    {
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
        title: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        body: {
            type: String,
            min: 2,
            max: 500
        },
        picturePath: {
            type: String,
            default: ""
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
            default: [],
        }
    },
    { 
        timestamps: true,
        collection: "Posts"
    }
);





/* EXPORT */

// Export Post Schema as Model
const Post = mongoose.model("Post", postSchema);
export default Post;