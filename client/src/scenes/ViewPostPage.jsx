/* IMPORTS */

// Modules
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Components
import Navbar from "components/Navbar";
import Post from "components/Post";
import CreateEditCommentForm from "components/CreateEditCommentForm";
import CommentFeed from "components/CommentFeed";

// Style
import "../styles/scenes/ViewPostPage.css";





/* VIEW POST PAGE */

const ViewPostPage = () => {

    /* HOOKS AND STATES */

    // Get post id and token
    const { postId } = useParams();
    const token = useSelector((state) => state.token);

    // Set post state
    const [post, setPost] = useState(null);





    /* FUNCTIONS */

    // Get post
    const getPost = async () => {

        // Get post data from server
        const response = await fetch(`http://localhost:4000/posts/view/${postId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        setPost(data);
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
                                commentCount={post.comments.length}
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