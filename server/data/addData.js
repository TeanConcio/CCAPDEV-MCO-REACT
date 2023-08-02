import mongoose from "mongoose";
import fs from 'fs'

import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

// import JSON data
// const users = JSON.parse(fs.readFileSync('./Users.json'));
// const posts = JSON.parse(fs.readFileSync('./Posts.json'));
// const comments = JSON.parse(fs.readFileSync('./Comments.json'));





export const addData = async () => {

    try {

        await User.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});
        console.log("Deleted all users, posts, and comments");

        await User.insertMany(users);
        await Post.insertMany(posts);
        await Comment.insertMany(comments);
        console.log("Added all users and posts");

    } catch (err) {
        console.log(err);
    }
}