/* IMPORTS */

// Modules
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// State
import { setPosts } from "state";

// Components
import Post from "../../components/Post";




/* POSTS WIDGET COMPONENT */

const PostFeed = ({ userId, isProfile = false }) => {

    /* HOOKS AND STATES */

    // Get posts and token
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);





    /* FUNCTIONS */

    // Get posts
    const getPosts = async () => {

        // Get posts from server
        const response = await fetch("http://localhost:4000/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        dispatch(setPosts({ posts: data }));
    };



    // Get user posts
    const getUserPosts = async () => {

        // Get user posts from server
        const response = await fetch(`http://localhost:4000/posts/${userId}/posts`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };



    // Get posts on process start (ran only once)
    useEffect(() => {

        if (isProfile)
            getUserPosts();
        else
            getPosts();

    }, []); // eslint-disable-line react-hooks/exhaustive-deps





    /* RENDER */

    return (

        <section>
            {
                posts.map(
                    ({
                        _id,
                        userId,
                        username,
                        title,
                        createdAt,
                        body,
                        picturePath,
                        userPicturePath,
                        upvotes,
                        comments,
                        downvotes,
                    }) => (
                        <Post
                            key={_id}
                            postId={_id}
                            postUserId={userId}
                            username={username}
                            title={title}
                            createdAt={createdAt}
                            body={body}
                            picturePath={picturePath}
                            userPicturePath={userPicturePath}
                            upvotes={upvotes}
                            downvotes={downvotes}
                            commentCount={comments.length}
                        />
                    )
                )
            }

        </section>

    );
};





/* EXPORT */

export default PostFeed;
