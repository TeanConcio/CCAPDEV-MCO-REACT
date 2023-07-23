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
import { setPosts } from "state";

// Components
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";





/* MY POST WIDGET COMPONENT */

const MyPostWidget = ({ picturePath }) => {

    /* HOOKS AND STATES */
    const dispatch = useDispatch();

    // Get user and token
    const token = useSelector((state) => state.token);
    const { _id } = useSelector((state) => state.user);

    // Get post and image data
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);

    // Get theme
    const { palette } = useTheme();
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");




    /* FUNCTIONS */

    // Post data to server
    const handlePost = async () => {

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

        // Update posts in state
        dispatch(setPosts({ posts }));

        // Reset data
        setImage(null);
        setTitle("");
        setBody("");
    };




    /* RENDER */

    return (

        <WidgetWrapper>

            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetween>
            <InputBase
                placeholder="Body"
                onChange={(e) => setBody(e.target.value)}
                value={body}
                sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "2rem",
                    padding: "1rem 2rem",
                }}
            />

            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
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
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobileScreens ? (
                <>
                    <FlexBetween gap="0.25rem">
                    <GifBoxOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Clip</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.25rem">
                    <AttachFileOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Attachment</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.25rem">
                    <MicOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Audio</Typography>
                    </FlexBetween>
                </>
                ) : (
                <FlexBetween gap="0.25rem">
                    <MoreHorizOutlined sx={{ color: mediumMain }} />
                </FlexBetween>
                )}

                <Button
                    disabled={!title}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexBetween>

        </WidgetWrapper>

    );
};





/* EXPORT */

export default MyPostWidget;
