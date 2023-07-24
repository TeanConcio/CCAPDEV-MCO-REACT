/* IMPORTS */

// Modules
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Components
import Navbar from "components/Navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostFeed";
import UserWidget from "scenes/widgets/UserWidget";





/* PROFILE PAGE COMPONENT */

const ProfilePage = () => {

    /* HOOKS AND STATES */

    // Get token and user id
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);


    /* FUNCTIONS */

    // Get user
    const getUser = async () => {

        // Get user data from server
        const response = await fetch(`http://localhost:4000/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };


    // Get user data on process start (ran only once)
    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    // If user is not found, return null (don't render)
    if (!user) return null;





    /* RENDER */

    return (

        <Box>

            <Navbar />

            <div className="page" style={{display: "flex"}}>

            <div className="user-widget-container" style={{ flex: "0 0 25%", marginRight: "1rem" }}>
                    <UserWidget userId={userId} picturePath={user.picturePath} />
            </div>
                <div className="column-container" style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                    <div className="friend-list-widget-container" style={{ marginBottom: "1rem" }}>
                        <FriendListWidget userId={userId} />
                    </div>
                    <div className="posts-widget-container">
                        <PostsWidget userId={userId} isProfile />
                    </div>
                </div>
            </div>
        

            

            {/*<Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                        <FriendListWidget userId={userId} />
                    </Box>
                    <Box
                        flexBasis={isNonMobileScreens ? "42%" : undefined}
                        mt={isNonMobileScreens ? undefined : "2rem"}
                    >
                        <MyPostWidget picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    <PostsWidget userId={userId} isProfile />
                </Box>
         </Box> */}

        </Box>

    );
}






/* EXPORT */

export default ProfilePage
