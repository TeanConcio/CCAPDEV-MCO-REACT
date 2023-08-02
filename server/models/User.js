/* IMPORTS */

// Modules
import mongoose from "mongoose"





/* SCHEMA */

// Make User Schema
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 5
        },
        username: {
            type: String,
            required: true,
            min: 2,
            max: 20
        },
        description: {
            type: String,
            max: 50,
            default: ""
        },
        picturePath: {
            type: String,
            default: "no_picture.png"
        },
        friends: {
            type: Array,
            default: []
        },
        postCount: {
            type: Number,
            required: true,
            default: 0
        },
        commentCount: {
            type: Number,
            required: true,
            default: 0
        },
        upvoteCount: {
            type: Number,
            required: true,
            default: 0
        },
        downvoteCount: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { 
        timestamps: true,
        collection: "Users"
    }
)





/* EXPORT */

// Export User Schema as Model
const User = mongoose.model("User", UserSchema)
export default User