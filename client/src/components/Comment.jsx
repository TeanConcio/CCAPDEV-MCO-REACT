/* IMPORTS */

// Modules
import { useState } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from 'date-fns'

// State
import { 
    setComment, 
    setUndeletedComments 
} from "state";

// Components
import CreateEditCommentForm from './CreateEditCommentForm';
import CommentFeed from "components/CommentFeed";

// Styles
import "styles/components/Comment.css"





/* POST WIDGET COMPONENT */

const Comment = ({
    commentId,
    commentUserId,
    username,
    createdAt,
    message,
    upvotes,
    downvotes,
    commentCount
}) => {

    /* HOOKS AND STATES */
    const [error, setError] = useState(null)

    // Get token and user data
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);

    // Get upvote and downvote data
    const isUpvoted = Boolean(upvotes[loggedInUserId]);
    const isDownvoted = Boolean(downvotes[loggedInUserId]);
    const baseUpvoteCount = Object.keys(upvotes).length;
    const baseDownvoteCount = Object.keys(downvotes).length;
    const [voteCount, setVoteCount] = useState(baseUpvoteCount - baseDownvoteCount)
    
    // Modes
    const [replyMode, setReplyMode] = useState(false)
    const [editMode, setEditMode] = useState(false)

    // Style variables
    const width = "100%"
    const margin = "0px 20px"





    /* FUNCTIONS */

    // Update comments upvote map
    const patchUpvote = async (e) => {

        // Prevent page refresh upon click
        e.preventDefault()

        // Send request to server
        const response = await fetch(`http://localhost:4000/comments/${commentId}/upvote`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedComment = await response.json();

        // If response is valid: Update comment in state
        // Else: Set the error state variable
        if (response.ok) {
            dispatch(setComment({ comment: updatedComment }));
            setError(null)
            setVoteCount(Object.keys(updatedComment.upvotes).length - Object.keys(updatedComment.downvotes).length)
        }
        else 
            setError(updatedComment.error)
    };



    // Update comments downvote map
    const patchDownvote = async (e) => {

        // Prevent page refresh upon click
        e.preventDefault()

        // Send request to server
        const response = await fetch(`http://localhost:4000/comments/${commentId}/downvote`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedComment = await response.json();

        // If response is valid: Update comment in state
        // Else: Set the error state variable
        if (response.ok) {
            dispatch(setComment({ comment: updatedComment }));
            setError(null)
            setVoteCount(Object.keys(updatedComment.upvotes).length - Object.keys(updatedComment.downvotes).length)
        }
        else 
            setError(updatedComment.error)
    };


    // Delete Comment click handler
    const deleteComment = async (e) => {

        // Prevent page refresh upon click
        e.preventDefault()

        // Delete selected comment prom backend REST API server port with method DELETE (asynchronous)
        const response = await fetch(`http://localhost:4000/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const deletedComment = await response.json()

        // If response is valid: Delete selected comment from comments state context variable
        // Else: Set the error state variable
        if (response.ok) {
            dispatch(setUndeletedComments({ comment: deletedComment }))
            window.location.reload();
        }
            
        else {}
            setError(deletedComment.error)
    }





    /* RENDER */

    return (

        <div 
            className="comment-component" 
            style={{width: "100%"}}
        >

            <div className="comment" style={{width: width, margin: margin, border: "var(--color-2) solid 1px"}}>

                <div className="details">
                    <Link to={`/profile/${commentUserId}`} className="author"> Commented by: {username} </Link>
                    <span className="create-date">
                        Commented on: {formatDistanceToNow(new Date(createdAt), {addSuffix: true})}
                    </span>
                </div>

                <p className="message">{message}</p>

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
                            <button 
                                className="comment-btn" 
                                onClick={() => setReplyMode(!replyMode)}
                            > 💭 </button>
                            
                        </div>
                    </div>

                    { (commentUserId === loggedInUserId) && (

                        <div className="modify">
                            <button
                                className="edit btn"
                                onClick={() => setEditMode(!editMode)}
                            > ✏ </button>
                            <button className="delete btn" onClick={deleteComment}> 🗑 </button>
                        </div>
                    )}

                </div>

                {
                    // Display error if there is
                    error && <div className="error">{error}</div>
                }

            </div>


            
            { (commentUserId === loggedInUserId) && editMode && (

                <CreateEditCommentForm 
                    parentId = {commentId}
                    commentMessage = {message}
                    EditMode
                />
            )}



            { replyMode && (

                <div 
                    className="reply"
                    style={{paddingLeft: "50px"}}
                >

                    <CreateEditCommentForm
                        parentId = {commentId}
                    />

                    <CommentFeed 
                        parentId = {commentId}
                        replyMode
                    />

                </div>

            )}

        </div>
    );
};





/* IMPORT */
export default Comment;