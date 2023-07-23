/* IMPORTS */

// Modules
import { useState } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow, set } from 'date-fns'

// State
import { setPost } from "state";

// Components

// Styles
import "styles/components/Post.css"





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

    // Get token, user, and post data
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isUpvoted = Boolean(upvotes[loggedInUserId]);
    const upvoteCount = Object.keys(upvotes).length;
    const isDownvoted = Boolean(downvotes[loggedInUserId]);
    const downvoteCount = Object.keys(downvotes).length;






    /* FUNCTIONS */

    // Update posts upvote map
    const patchUpvote = async (e) => {

        // Prevent page refresh upon click
        e.preventDefault()

        // Send request to server
        const response = await fetch(`http://localhost:4000/posts/${postId}/upvote`, {
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
        }
        else 
            setError(updatedPost.error)
    };



    // Update posts downvote map
    const patchDownvote = async (e) => {

        // Prevent page refresh upon click
        e.preventDefault()

        // Send request to server
        const response = await fetch(`http://localhost:4000/posts/${postId}/downvote`, {
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
        }
        else 
            setError(updatedPost.error)
    };


    // Delete Post click handler
    const deletePost = async (e) => {

        // Prevent page refresh upon click
        e.preventDefault()

        // Delete selected post prom backend REST API server port with method DELETE (asynchronous)
        const response = await fetch(`http://localhost:4000/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const deletedPost = await response.json()

        // If response is valid: Delete selected post from posts state context variable
        // Else: Set the error state variable
        if (response.ok)
            dispatch(setUndeletedPosts({ post: deletedPost }))
        else 
            setError(json.error)
    }





    /* RENDER */

    return (

        <div className="post">

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
                <img
                    className='image'
                    alt="post"
                    src={`http://localhost:4000/assets/${picturePath}`}
                />
            )}

            <div className="actions">

                <div className="main">
                    <div className="vote">
                        {isUpvoted ? (
                            <button className="upvote btn active" onClick={patchUpvote}> ⬆ </button>
                        ) : (
                            <button className="upvote btn" onClick={patchUpvote}> ⬆ </button>
                        )}
                        <div className="count"> {upvoteCount - downvoteCount} </div> 
                        {isDownvoted ? (
                            <button className="downvote btn active" onClick={patchDownvote}> ⬇ </button>
                        ) : (
                            <button className="downvote btn" onClick={patchDownvote}> ⬇ </button>
                        )}
                    </div>

                    <div className="comment">
                        <div className="count"> {commentCount} </div> 
                        <button className="comment-btn"> 💭 </button>
                    </div>
                </div>


                { ViewPost && (postUserId === loggedInUserId) && (

                    <div className="modify">
                        <button className="edit btn"> ✏ </button>
                        <button className="delete btn" onClick={handleDeletePostClick}> 🗑 </button>
                    </div>
                )}

            </div>

            {
                // Display error if there is
                error && <div className="error">{error}</div>
            }

        </div>
    );
};





/* IMPORT */
export default Post;