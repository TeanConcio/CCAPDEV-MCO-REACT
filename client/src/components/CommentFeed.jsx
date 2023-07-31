/* IMPORTS */

// Modules
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// State
import { setComments } from "state";

// Components
import Comment from "./Comment";





/* POSTS WIDGET COMPONENT */

const CommentFeed = ({ parentId }) => {

    /* HOOKS AND STATES */

    // Get comment and token
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments);
    const token = useSelector((state) => state.token);





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
            dispatch(setComments({ comments: data }));
    };



    // Get comments on process start (ran only once)
    useEffect(() => {

        getParentComments()

    }, []); // eslint-disable-line react-hooks/exhaustive-deps





    /* RENDER */

    return (

        <section>

            {Array.isArray(comments) && comments.length > 0 ? (
                comments.map(({
                    _id, 
                    userId, 
                    username, 
                    createdAt, 
                    message,
                    upvotes,
                    downvotes,
                    comments
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
                    comments = {comments}
                />
                ))
            ) : (
                <p>No comments found</p>
            )}
        </section>
    );
};





/* EXPORT */

export default CommentFeed;
