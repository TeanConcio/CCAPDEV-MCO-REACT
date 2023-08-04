/* IMPORTS */

// Modules
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from 'date-fns'

// State
import { 
    setPost, 
    setUndeletedPosts 
} from "state";

// Components
import CreateEditPostForm from './CreateEditPostForm';

// Styles
import "styles/components/Post.css"

import { API_URL } from "../App";





/* POST WIDGET COMPONENT */

const Post = ({
    postId,
    postUserId,
    username,
    createdAt,
    title,
    body,
    picturePath,
    userPicturePath,
    upvotes,
    downvotes,
    commentCount,
    ViewPost = false
}) => {

    /* HOOKS AND STATES */
    const [error, setError] = useState(null)


    // Get token and user data
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);

    // Get upvote and downvote data
    const isUpvoted = Boolean(upvotes[loggedInUserId]);
    const isDownvoted = Boolean(downvotes[loggedInUserId]);
    const baseUpvoteCount = Object.keys(upvotes).length;
    const baseDownvoteCount = Object.keys(downvotes).length;
    const [voteCount, setVoteCount] = useState(baseUpvoteCount - baseDownvoteCount)
    
    // Edit
    const [editMode, setEditMode] = useState(false)

    // Style variables
    const width = ViewPost ? "100%" : "auto"
    const margin = ViewPost ? "0px 20px" : "20px"





    /* FUNCTIONS */

    // Update posts upvote map
    const patchUpvote = async (e) => {

        // Prevent page refresh upon click
        e.preventDefault()

        // Send request to server
        const response = await fetch(`${API_URL}/posts/${postId}/upvote`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();

        // If response is valid: Update post in state
        // Else: Set the error state variable
        if (response.ok) {
            dispatch(setPost({ post: updatedPost }));
            setError(null)
            setVoteCount(Object.keys(updatedPost.upvotes).length - Object.keys(updatedPost.downvotes).length)
        }
        else 
            setError(updatedPost.error)
    };



    // Update posts downvote map
    const patchDownvote = async (e) => {

        // Prevent page refresh upon click
        e.preventDefault()

        // Send request to server
        const response = await fetch(`${API_URL}/posts/${postId}/downvote`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();

        // If response is valid: Update post in state
        // Else: Set the error state variable
        if (response.ok) {
            dispatch(setPost({ post: updatedPost }));
            setError(null)
            setVoteCount(Object.keys(updatedPost.upvotes).length - Object.keys(updatedPost.downvotes).length)
        }
        else 
            setError(updatedPost.error)
    };


    // Delete Post click handler
    const deletePost = async (e) => {

        // Prevent page refresh upon click
        e.preventDefault()

        // Delete selected post prom backend REST API server port with method DELETE (asynchronous)
        const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const deletedPost = await response.json()

        // If response is valid: Delete selected post from posts state context variable
        // Else: Set the error state variable
        if (response.ok) {
            dispatch(setUndeletedPosts({ post: deletedPost }))
            navigate(`/home`)
        }
            
        else {}
            setError(deletedPost.error)
    }





    /* RENDER */

    return (

        <div className="post-component" 
            style={ViewPost ? (
                {display: "flex", width: "75%", flexDirection: "column", flexWrap: "wrap", alignContent: "center", justifyContent: "center"}) : ({width: "100%"})}
        >

            <div className="post" style={{width: width, margin: margin}}>

                { ViewPost ? (
                    <h2 className="title"> {title} </h2>
                ) : (
                    <Link to={`/post/${postId}`} className="title"> {title} </Link>
                )}

                <div className="details">
                    <Link to={`/profile/${postUserId}`} className="author"> Posted by: {username} </Link>
                    <span className="create-date">
                        Posted on: {formatDistanceToNow(new Date(createdAt), {addSuffix: true})}
                    </span>
                </div>

                <p className="body">{body}</p>

                {picturePath && (
                    <div
                        className='image-container'>
                        <img
                            className='image'
                            alt="post"
                            src={`${API_URL}/assets/${picturePath}`}
                        />
                    </div>
                )}

                <div className="actions">

                    <div className="main">
                        <div className="vote">
                            {isUpvoted ? (
                                <button className="upvote btn active" onClick={patchUpvote}> ⬆ </button>
                            ) : (
                                <button className="upvote btn" onClick={patchUpvote}> ⬆ </button>
                            )}
                            <div className="count"> {voteCount} </div> 
                            {isDownvoted ? (
                                <button className="downvote btn active" onClick={patchDownvote}> ⬇ </button>
                            ) : (
                                <button className="downvote btn" onClick={patchDownvote}> ⬇ </button>
                            )}
                        </div>

                        <div className="comment">
                            <div className="count"> {commentCount} </div> 
                            { !ViewPost ? (
                                <button className="comment-btn" onClick={() => navigate("/post/" + postId)}> 💭 </button>
                            ) : (
                                <button className="comment-btn"> 💭 </button>
                            )}
                            
                        </div>
                    </div>


                    { ViewPost && (postUserId === loggedInUserId) && (

                        <div className="modify">
                            <button className="edit btn" onClick={() => setEditMode(!editMode)}> ✏ </button>
                            <button className="delete btn" onClick={deletePost}> 🗑 </button>
                        </div>
                    )}

                </div>

                {
                    // Display error if there is
                    error && <div className="error">{error}</div>
                }

            </div>


            
            { ViewPost && (postUserId === loggedInUserId) && editMode && (

                <CreateEditPostForm 
                    postId = {postId}
                    postTitle = {title}
                    postBody = {body}
                    EditMode
                />
            )}

        </div>
    );
};





/* IMPORT */
export default Post;
