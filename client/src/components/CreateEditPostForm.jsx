/* IMPORTS */

import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// State
import { setPosts, setPost } from "state";

// Components
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";

// Style
import "../styles/components/CreateEditForm.css";
import { set } from "date-fns";





/* MY POST WIDGET COMPONENT */

const CreateEditPostForm = ({ postId = "", postTitle = "", postBody = "",  EditMode = false }) => {

    /* HOOKS AND STATES */
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get user and token
    const token = useSelector((state) => state.token);
    const { _id, picturePath } = useSelector((state) => state.user);

    // Get post and image data
    const [title, setTitle] = useState(postTitle);
    const [body, setBody] = useState(postBody);
    const [image, setImage] = useState(null);

    // Error
    const [error, setError] = useState(null);




    /* FUNCTIONS */

    // Create Post
    const createPost = async (e) => {

        e.preventDefault();

        // Make form from data
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("title", title);
        formData.append("body", body);

        // Add image to form if exists
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        // Post data to server
        const response = await fetch(`http://localhost:4000/posts`, 
        {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();

        // If response is valid: Update post in state
        // Else: Set the error state variable
        if (response.ok) {
            dispatch(setPosts({ posts: posts }));

            // Reset data
            setImage(null);
            setTitle("");
            setBody("");
            setError(null);
        }
        else 
            setError(posts.error)
    };



    // Edit Post
    const editPost = async (e) => {

        e.preventDefault();

        // Make form from data
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);

        // Add image to form if exists
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        // Post data to server
        const response = await fetch(`http://localhost:4000/posts/${postId}`, 
        {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();

        // If response is valid: Update post in state
        // Else: Set the error state variable
        if (response.ok) {
            dispatch(setPost({ post: posts }));

            window.location.reload();
        }
        else 
            setError(posts.error)
    };





    /* RENDER */

    return (

        <section className="create-edit">

            { !EditMode ? (
                <div className="label">
                    Create Post
                </div>
            ) : (
                <div className="label">
                    Edit Post
                </div>
            )}

            <form>

                <div className="title">
                    <UserImage picturePath={picturePath} userId={_id} size="45px" />
                    <input 
                        type="text" 
                        class="input" 
                        placeholder={(postTitle === "") ? ("Post Title") : (postTitle)} 
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required 
                    />
                </div>
                
                <div className="body">
                    <textarea 
                        class="input" 
                        placeholder={(postBody === "") ? ("Description") : (postBody)}
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    >
                    </textarea>
                </div>

                <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                >
                    {({ getRootProps, getInputProps }) => (
                        <FlexBetween>
                            <Box
                                {...getRootProps()}
                                border={`2px dashed `}
                                p="1rem"
                                width="100%"
                                sx={{ "&:hover": { cursor: "pointer" } }}
                            >
                                <input {...getInputProps()} />
                                {!image ? (
                                    <p>Add Image Here</p>
                                ) : (
                                    <FlexBetween>
                                        <Typography>{image.name}</Typography>
                                        <EditOutlined />
                                    </FlexBetween>
                                )}
                            </Box>
                            {image && (
                            <IconButton
                                onClick={() => setImage(null)}
                                sx={{ width: "15%" }}
                            >
                                <DeleteOutlined />
                            </IconButton>
                            )}
                        </FlexBetween>
                    )}
                </Dropzone>

                {
                    // Display error if there is
                    error && <div className="error" style={{marginBottom: "-10px"}}>{error}</div>
                }

                <button 
                    type="submit" 
                    class="submit btn"
                    onClick={(EditMode) ? (editPost) : (createPost)}
                >
                    Submit
                </button>

            </form>
        </section>
    );
};





/* EXPORT */

export default CreateEditPostForm;
