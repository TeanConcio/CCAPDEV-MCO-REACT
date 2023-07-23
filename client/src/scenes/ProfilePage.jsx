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
import PostsWidget from "components/PostFeed";
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

        <>

            <Navbar />

            <div className="page" style={{display: "flex"}}>

                <div className="column">

                    <UserWidget userId={userId} picturePath={user.picturePath} />

                    <FriendListWidget userId={userId} />

                </div>

                <div className="column">

                    <MyPostWidget picturePath={user.picturePath} />

                    <PostsWidget userId={userId} isProfile />

                </div>

            </div>

            {/* <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    
                    <Box m="2rem 0" />
                        
                    </Box>
                    <Box
                        flexBasis={isNonMobileScreens ? "42%" : undefined}
                        mt={isNonMobileScreens ? undefined : "2rem"}
                    >
                        
                    <Box m="2rem 0" />
                    
                </Box>
            </Box> */}

        </>

    );
}






/* EXPORT */

export default ProfilePage
