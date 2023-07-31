/* IMPORTS */

import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";





/* USER WIDGET COMPONENT */

const UserWidget = ({ userId, picturePath }) => {

    /* HOOKS AND STATES */

    // Get user and token
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);

    // Get theme
    const { palette } = useTheme();
    const navigate = useNavigate();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;





    /* FUNCTIONS */

    // Get user data
    const getUser = async () => {

        // Get user data from server
        const response = await fetch(`http://localhost:4000/users/${userId}`, 
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log(data);
        setUser(data);
    };

    // Get user data on process start (ran only once)
    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // If user is not found, return null (don't render)
    if (!user) {
        return null;
    }

    // Destructure user data for easier access
    const {
        username,
        description,
        postsNum,
        upvotes,
        friends,
    } = user;





    /* RENDER */

    return (

        <WidgetWrapper>

            {/* FIRST ROW */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <Box>
                        <Typography
                        variant="h4"
                        color={dark}
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
                        <Typography color={medium}>
                            {friends.length} friends
                        </Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />

            {/* SECOND ROW */}
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{description}</Typography>
                </Box>
            </Box>

            <Divider />

            {/* THIRD ROW */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Number of Posts</Typography>
                    <Typography color={main} fontWeight="500">
                        {postsNum}
                    </Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>Total Upvote Count</Typography>
                    <Typography color={main} fontWeight="500">
                        {upvotes}
                    </Typography>
                </FlexBetween>
            </Box>

            <Divider />

            {/* FOURTH ROW */}
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                </Typography>

                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Linkedin
                            </Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
            </Box>

        </WidgetWrapper>
    );
};





/* EXPORT */

export default UserWidget;
