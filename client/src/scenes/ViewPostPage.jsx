/* IMPORTS */

// Modules
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
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

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get post id and token
    const { postId } = useParams();
    const token = useSelector((state) => state.token);

    // Set post state
    const [post, setPost] = useState(null);
    const [nextPostId, setNextPostId] = useState(null);
    const [prevPostId, setPrevPostId] = useState(null);





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



    // Get next and previous post ids
    const getNextPrevPostIds = async () => {

        // Get post data from server
        const response = await fetch(`${API_URL}/posts/${postId}/next-prev-ids`, {
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
            setNextPostId(data.nextPostId);
            setPrevPostId(data.prevPostId);
        }
    }



    // Get post data on process start (ran only once)
    useEffect(() => {
        getNextPrevPostIds();
        getPost();
    }, []);



    function changeLocation(link){
        navigate(link, { replace: true });
        window.location.reload();
    }


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

                            {(prevPostId !== null) ? (

                                <button 
                                    class="go-prev"
                                    onClick={() => changeLocation(`/post/${prevPostId}`)}
                                >
                                    <a>Prev</a>
                                    <a>←</a>
                                </button>

                            ) : (

                                <button 
                                    class="go-prev"
                                    onClick={() => navigate(`/home`)}
                                >
                                    <a>Home</a>
                                </button>

                            )}
                            

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

                            {(nextPostId !== null) ? (

                                <button 
                                    class="go-next"
                                    onClick={() => changeLocation(`/post/${nextPostId}`)}
                                >
                                    <a>Next</a>
                                    <a>→</a>
                                </button>

                            ) : (

                                <button 
                                    class="go-next"
                                    onClick={() => navigate(`/home`)}
                                >
                                    <a>Home</a>
                                </button>

                            )}
                        
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