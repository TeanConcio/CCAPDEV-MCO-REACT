/* IMPORTS */

// Modules
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setLogin } from "state";

// Components
import Navbar from "components/Navbar";
import Post from "components/Post";
import CreateEditCommentForm from "components/CreateEditCommentForm";
import CommentFeed from "components/CommentFeed";

// Style
import "../styles/scenes/ViewPostPage.css";

import { API_URL } from "../App";





/* VIEW POST PAGE */

const ViewPostPage = () => {

    /* HOOKS AND STATES */

    // Get post id and token
    const dispatch = useDispatch();
    const { postId } = useParams();
    const token = useSelector((state) => state.token);

    // Set post state
    const [post, setPost] = useState(null);





    /* FUNCTIONS */

    // Get post
    const getPost = async () => {

        // Get post data from server
        const response = await fetch(`${API_URL}/posts/view/${postId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
       
        const data = await response.json();

        if (data.error === "no token"){
            alert("Token Expired");

            if (dispatch(setLogin({user: null, token: null}))) {

                window.localStorage.clear();
                
                if (window.localStorage.length === 0)
                    window.location = "/";
            }
        }
        else{
            setPost(data);
        }
    };


    // Get post data on process start (ran only once)
    useEffect(() => {
        getPost();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    // If post is not found, return null (don't render)
    if (!post) return null;





    /* RENDER */

    return (

        <>

            <Navbar />

            <div className="page">

                <div className="column-container">

                    <div className="column">

                        <section class="post-container">
                            
                            <button class="go-prev">
                                <a>←</a>
                            </button>

                            <Post
                                key={post._id}
                                postId={post._id}
                                postUserId={post.userId}
                                username={post.username}
                                title={post.title}
                                createdAt={post.createdAt}
                                updatedAt={post.updatedAt}
                                body={post.body}
                                picturePath={post.picturePath}
                                userPicturePath={post.userPicturePath}
                                upvotes={post.upvotes}
                                downvotes={post.downvotes}
                                commentCount={post.commentCount}
                                ViewPost
                            />

                            <button class="go-next">
                                <a>→</a>
                            </button>
                        
                        </section>

                        <CreateEditCommentForm parentId={postId} />

                        <section>

                            <CommentFeed parentId={postId} />

                        </section>

                    </div>
                    
                </div>

            </div>

        </>

    );
}






/* EXPORT */

export default ViewPostPage