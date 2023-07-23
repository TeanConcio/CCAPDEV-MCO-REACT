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
};





/* FUNCTIONS TO SET GLOBAL STATE */

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        // Toggle between light and dark mode
        setMode: (state) => {

            state.mode = state.mode === "light" ? "dark" : "light";
        },



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

            state.posts = action.payload.posts;
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

                return post._id !== action.payload.postId;
            });
            
            state.posts = undeletedPosts;
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
    setUndeletedPosts
} = authSlice.actions;
export default authSlice.reducer;