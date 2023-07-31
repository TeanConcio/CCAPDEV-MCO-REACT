import mongoose from "mongoose";
import User from "../models/User.js";
import Post from "../models/Post.js";



const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];



const users = [
    {
        _id: userIds[0],
        username: "123",
        email: "aaaaaaa@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p11.jpeg",
        friends: [],
        viewedProfile: 14561,
        createdAt: 1115211422,
        updatedAt: 1115211422,
        __v: 0,
    },
    {
        _id: userIds[1],
        username: "456",
        email: "thataaa@gmail.com",
        password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p3.jpeg",
        friends: [],
        viewedProfile: 12351,
        createdAt: 1595589072,
        updatedAt: 1595589072,
        __v: 0,
    },
    {
        _id: userIds[2],
        username: "789",
        email: "someguy@gmail.com",
        password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
        picturePath: "p4.jpeg",
        friends: [],
        viewedProfile: 45468,
        createdAt: 1288090662,
        updatedAt: 1288090662,
        __v: 0,
    },
    {
        _id: userIds[3],
        username: "101112",
        email: "whatchadoing@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p6.jpeg",
        friends: [],
        viewedProfile: 41024,
        createdAt: 1219214568,
        updatedAt: 1219214568,
        __v: 0,
    },
    {
        _id: userIds[4],
        username: "131415",
        email: "janedoe@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p5.jpeg",
        friends: [],
        viewedProfile: 40212,
        createdAt: 1493463661,
        updatedAt: 1493463661,
        __v: 0,
    },
    {
        _id: userIds[5],
        username: "161718",
        email: "harveydunn@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p7.jpeg",
        friends: [],
        viewedProfile: 976,
        createdAt: 1381326073,
        updatedAt: 1381326073,
        __v: 0,
    },
    {
        _id: userIds[6],
        username: "192021",
        email: "carlyvowel@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p8.jpeg",
        friends: [],
        viewedProfile: 1510,
        createdAt: 1714704324,
        updatedAt: 1642716557,
        __v: 0,
    },
    {
        _id: userIds[7],
        username: "222324",
        email: "jessicadunn@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p9.jpeg",
        friends: [],
        viewedProfile: 19420,
        createdAt: 1369908044,
        updatedAt: 1359322268,
        __v: 0,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        username: "fucker",
        email: "tean@gmail.com",
        password: "$2b$10$v1yTVBa.c23gXeYaLl8Sbu/KZiA4Vb5k5khKTsAlVx2Xv7XxTaNKq",
        picturePath: "OVPIA Director for HR.png",
        friends: [],
        viewedProfile: 19420,
        createdAt: 1369908044,
        updatedAt: 1359322268,
        __v: 0,
    },
];



const posts = [
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[1],
        username: "456",
        title: "Some really long random description",
        picturePath: "post1.jpeg",
        userPicturePath: "p3.jpeg",
        upvotes: new Map([
        [userIds[0], true],
        [userIds[2], true],
        [userIds[3], true],
        [userIds[4], true],
        ]),
        downvotes: new Map(),
        comments: [],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[3],
        username: "101112",
        title:
        "Another really long random description. This one is longer than the previous one.",
        picturePath: "post2.jpeg",
        userPicturePath: "p6.jpeg",
        upvotes: new Map([
        [userIds[7], true],
        [userIds[4], true],
        [userIds[1], true],
        [userIds[2], true],
        ]),
        downvotes: new Map(),
        comments: [],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[4],
        username: "131415",
        title:
        "This is the last really long random description. This one is longer than the previous one.",
        picturePath: "post3.jpeg",
        userPicturePath: "p5.jpeg",
        upvotes: new Map([
        [userIds[1], true],
        [userIds[6], true],
        [userIds[3], true],
        [userIds[5], true],
        ]),
        downvotes: new Map(),
        comments: [],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[5],
        username: "161718",
        title:
        "This is the last really long random description. This one is longer than the previous one. Man I'm bored. I'm going to keep typing until I run out of things to say.",
        picturePath: "post4.jpeg",
        userPicturePath: "p7.jpeg",
        upvotes: new Map([
        [userIds[1], true],
        [userIds[6], true],
        [userIds[3], true],
        ]),
        downvotes: new Map(),
        comments: [],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[6],
        username: "192021",
        title:
        "Just a short description. I'm tired of typing. I'm going to play video games now.",
        picturePath: "post5.jpeg",
        userPicturePath: "p8.jpeg",
        upvotes: new Map([
        [userIds[1], true],
        [userIds[3], true],
        [userIds[5], true],
        [userIds[7], true],
        ]),
        downvotes: new Map(),
        comments: [],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[7],
        username: "222324",
        title:
        "For the last time, I'm going to play video games now. I'm tired of typing. I'm going to play video games now.",
        picturePath: "post6.jpeg",
        userPicturePath: "p9.jpeg",
        upvotes: new Map([
        [userIds[1], true],
        [userIds[2], true],
        ]),
        downvotes: new Map(),
        comments: [],
    },
];



export const addData = async () => {
    try {
        await User.deleteMany({});
        await Post.deleteMany({});
        console.log("Deleted all users and posts");

        await User.insertMany(users);
        await Post.insertMany(posts);
        console.log("Added all users and posts");
    } catch (err) {
        console.log(err);
    }
}