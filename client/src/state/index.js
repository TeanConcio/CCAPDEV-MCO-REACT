/* IMPORTS */

// Modules
import { createSlice } from "@reduxjs/toolkit";






/* GLOBAL INITIAL STATE */
    // Accessible from anywhere in the app

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    comments: []
};





/* FUNCTIONS TO SET GLOBAL STATE */

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        
        
        // Login user and set token
        setLogin: (state, action) => {

            state.user = action.payload.user;
            state.token = action.payload.token;
        },



        // Logout user and remove token
        setLogout: (state) => {

            state.user = null;
            state.token = null;
        },



        // Set friends
        setFriends: (state, action) => {

            if (state.user)
                state.user.friends = action.payload.friends;
            else {
                console.error("user friends non-existent :(");
            }
        },



        // Set posts as all posts
        setPosts: (state, action) => {

            // Sort posts by date
            state.posts = action.payload.posts.sort((a, b) => {
                
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        },



        // Set a single post
        setPost: (state, action) => {

            const updatedPosts = state.posts.map((post) => {

                if (post._id === action.payload.post._id) 
                    return action.payload.post;
                    
                return post;
            });
            state.posts = updatedPosts;
        },



        // Set undeleted posts
        setUndeletedPosts: (state, action) => {

            const undeletedPosts = state.posts.filter((post) => {

                return post._id !== action.payload.post._id;
            });
            
            state.posts = undeletedPosts;
        },



        // Set comments as all comments
        setComments: (state, action) => {

            // Sort comments by date
            state.comments = action.payload.comments.sort((a, b) => {
                
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        },



        // Set a single comment
        setComment: (state, action) => {

            const updatedComments = state.comments.map((comment) => {

                if (comment._id === action.payload.comment._id) 
                    return action.payload.comment;
                    
                return comment;
            });
            state.comments = updatedComments;
        },



        // Set undeleted comments
        setUndeletedComments: (state, action) => {

            const undeletedComments = state.comments.filter((comment) => {

                return comment._id !== action.payload.comment._id;
            });
            
            state.comments = undeletedComments;
        }
    },
});





/* EXPORTS */

export const { 
    setMode, 
    setLogin, 
    setLogout, 
    setFriends, 
    setPosts, 
    setPost,
    setUndeletedPosts,
    setComments,
    setComment,
    setUndeletedComments
} = authSlice.actions;
export default authSlice.reducer;