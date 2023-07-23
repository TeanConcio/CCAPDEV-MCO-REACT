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

// State
import { setPosts, setPost } from "state";

// Components
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";

// Style
import "../styles/components/CreateEditPostForm.css";





/* MY POST WIDGET COMPONENT */

const CreateEditPostForm = ({ postId = "", postTitle = "", postBody = "",  EditMode = false }) => {

    /* HOOKS AND STATES */
    const dispatch = useDispatch();

    // Get user and token
    const token = useSelector((state) => state.token);
    const { _id, picturePath } = useSelector((state) => state.user);

    // Get post and image data
    const [title, setTitle] = useState(postTitle);
    const [body, setBody] = useState(postBody);
    const [image, setImage] = useState(null);




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

        console.log(_id, title, body, image)
        console.log(formData)

        // Post data to server
        const response = await fetch(`http://localhost:4000/posts`, 
        {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();

        console.log(posts)

        // Update posts in state
        dispatch(setPosts({ posts }));

        // Reset data
        setImage(null);
        setTitle("");
        setBody("");
    };



    // Edit Post
    const editPost = async (e) => {

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
        const response = await fetch(`http://localhost:4000/posts/${postId}`, 
        {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();

        // Update posts in state
        dispatch(setPost({ posts }));

        // Reset data
        setImage(null);
        setTitle("");
        setBody("");
    };





    /* RENDER */

    return (

        <section className="create-edit">
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

                <button 
                    type="submit" 
                    class="submit-post-btn"
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
