/* IMPORTS */

// Modules
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// State
import { setFriends } from "state";

// Components
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";




/* FRIEND LIST WIDGET COMPONENT */

const FriendListWidget = ({ userId }) => {

    /* HOOKS AND STATES */

    // Get token and friends from state
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    // Get theme
    const { palette } = useTheme();




    /* FUNCTIONS */

    // Get friends data
    const getFriends = async () => {

        // Get friends data from server
        const response = await fetch(`http://localhost:4000/users/${userId}/friends`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    // Get friends data on process start (ran only once)
    useEffect(() => {
        getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps




    /* RENDER */

    return (

        <WidgetWrapper>

            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>

            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        username={friend.username}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>

        </WidgetWrapper>

    );
};




/* EXPORT */

export default FriendListWidget;
