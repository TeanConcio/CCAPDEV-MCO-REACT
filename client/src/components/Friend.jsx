/* IMPORT */

// Modules
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin, setFriends } from "state";

// Components
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

import { API_URL } from "../App";





/* FRIEND COMPONENT */

const Friend = ({ friendId, username, userPicturePath }) => {

    /* HOOKS */

    // Get user, token, and friends
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    // Get theme
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    // Check if friend
    const isFriend = friends.find((friend) => friend._id === friendId);




    /* CONTROLLER */

    const patchFriend = async () => {

        const response = await fetch(`${API_URL}/users/${_id}/${friendId}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
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
        else
            dispatch(setFriends({ friends: data }));
    };





    /* RENDER */

    return (

        <FlexBetween>

            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                        "&:hover": {
                            color: palette.primary.light,
                            cursor: "pointer",
                        },
                        }}
                    >
                        {username}
                    </Typography>
                </Box>
            </FlexBetween>

            <IconButton
                onClick={() => patchFriend()}
                sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
                {isFriend ? (
                    <PersonRemoveOutlined sx={{ color: primaryDark }} />
                ) : (
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                )}
            </IconButton>

        </FlexBetween>

    );
};





/* EXPORT */

export default Friend;
