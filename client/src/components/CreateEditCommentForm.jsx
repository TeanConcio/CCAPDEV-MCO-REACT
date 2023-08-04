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
import { setComments, setComment } from "state";

// Components
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";

// Style
import "../styles/components/CreateEditForm.css";

import { API_URL } from "../App";





/* CREATE-EDIT COMMENT WIDGET COMPONENT */

const CreateEditCommentForm = ({  parentId, commentMessage = "",  EditMode = false }) => {

    /* HOOKS AND STATES */
    const dispatch = useDispatch();

    // Get user and token
    const token = useSelector((state) => state.token);
    const { _id, picturePath } = useSelector((state) => state.user);

    // Get comment and image data
    const [message, setMessage] = useState(commentMessage);

    // Error
    const [error, setError] = useState(null);




    /* FUNCTIONS */

    // Create Comment
    const createComment = async (e) => {

        e.preventDefault();

        // Make form from data
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("message", message);

        // Comment data to server
        const response = await fetch(`${API_URL}/comments/${parentId}`, 
        {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const comments = await response.json();

        console.log(comments)

        // If response is valid: Update comment in state
        // Else: Set the error state variable
        if (response.ok) {
            dispatch(setComments({ comments: comments }));

            // Reset data
            setMessage("");
            setError(null);

            window.location.reload();
        }
        else 
            setError(comments.error)
    };



    // Edit Comment
    const editComment = async (e) => {

        e.preventDefault();

        // Make form from data
        const formData = new FormData();
        formData.append("message", message);

        // Comment data to server
        const response = await fetch(`${API_URL}/comments/${parentId}`, 
        {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const comments = await response.json();

        // If response is valid: Update comment in state
        // Else: Set the error state variable
        if (response.ok) {
            dispatch(setComment({ comment: comments }));

            //window.location.reload();
        }
        else 
            setError(comments.error)
    };





    /* RENDER */

    return (

        <section className="create-edit">

            { !EditMode ? (
                <div className="label">
                    Create Comment
                </div>
            ) : (
                <div className="label">
                    Edit Comment
                </div>
            )}
            <form>

                <div className="message">
                    <UserImage picturePath={picturePath} userId={_id} size="45px" />
                    <textarea 
                        class="input" 
                        placeholder={(commentMessage === "") ? ("Message") : (commentMessage)}
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    >
                    </textarea>
                </div>

                {
                    // Display error if there is
                    error && <div className="error" style={{marginBottom: "-10px"}}>{error}</div>
                }

                <button 
                    type="submit" 
                    class="submit btn"
                    onClick={(EditMode) ? (editComment) : (createComment)}
                >
                    Submit
                </button>

            </form>
        </section>
    );
};





/* EXPORT */

export default CreateEditCommentForm;
