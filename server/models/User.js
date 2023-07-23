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
            defult: ""
        },
        picturePath: {
            type: String,
            default: ""
        },
        friends: {
            type: Array,
            default: []
        },
        postsNum: {
            type: Number,
            default: 0
        },
        upvotes: {
            type: Number,
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