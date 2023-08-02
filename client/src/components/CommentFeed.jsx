/* IMPORTS */

// Modules
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// State
import { useState } from "react";
import { setComments } from "state";

// Components
import Comment from "./Comment";





/* POSTS WIDGET COMPONENT */

const CommentFeed = ({ parentId, replyMode = false }) => {

    /* HOOKS AND STATES */

    // Get comment and token
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const comments = useSelector((state) => state.comments);

    const [replies, setReplies] = useState(null);





    /* FUNCTIONS */

    // Get post comments
    const getParentComments = async () => {

        // Get post comments from server
        const response = await fetch(`http://localhost:4000/comments/${parentId}/comments`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        }
        );
        const data = await response.json();

        if(data.error == "no token"){
            alert("Token Expired");
            window.location = "/";
        }
        else
            if (!replyMode)
                dispatch(setComments({ comments: data }));
            else
                setReplies(data);
    };



    // Get comments on process start (ran only once)
    useEffect(() => {

        getParentComments()

    }, []); // eslint-disable-line react-hooks/exhaustive-deps





    /* RENDER */

    return (

        <section>

            {!replyMode ? (

                Array.isArray(comments) && comments.length > 0 ? (
                    comments.map(({
                        _id, 
                        userId, 
                        username, 
                        createdAt, 
                        message,
                        upvotes,
                        downvotes,
                        commentCount
                    }) => (
                    <Comment
                        key={_id}
                        commentId = {_id}
                        commentUserId = {userId}
                        username = {username}
                        createdAt = {createdAt}
                        message = {message}
                        upvotes = {upvotes}
                        downvotes = {downvotes}
                        commentCount = {commentCount}
                    />
                    ))
                ) : (
                    <p>No comments found</p>
                )

            ) : (

                Array.isArray(replies) && replies.length > 0 ? (
                    replies.map(({
                        _id, 
                        userId, 
                        username, 
                        createdAt, 
                        message,
                        upvotes,
                        downvotes,
                        commentCount
                    }) => (
                    <Comment
                        key={_id}
                        commentId = {_id}
                        commentUserId = {userId}
                        username = {username}
                        createdAt = {createdAt}
                        message = {message}
                        upvotes = {upvotes}
                        downvotes = {downvotes}
                        commentCount = {commentCount}
                    />
                    ))
                ) : (
                    <p>No replies found</p>
                )

            )}

        </section>
    );
};





/* EXPORT */

export default CommentFeed;
