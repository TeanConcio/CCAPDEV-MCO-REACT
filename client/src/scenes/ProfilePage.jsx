/* IMPORTS */

// Modules
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { setLogin } from "state";

// Components
import Navbar from "components/Navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import PostFeed from "components/PostFeed";
import UserWidget from "scenes/widgets/UserWidget";

import { API_URL } from "../App";





/* PROFILE PAGE COMPONENT */

const ProfilePage = () => {

    /* HOOKS AND STATES */

    // Get token and user id
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);

    const userId = useParams().userId;





    /* FUNCTIONS */

    // Get user
    const getUser = async () => {

        // Get user data from server
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
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
        else if (data !== user) {
            setUser(data);
        }
    };



    // Get user data on process start (ran only once)
    useEffect(() => {
        getUser();
    });



    // If user is not found, return null (don't render)
    if (!user) return null;





    /* RENDER */

    return (

        <>
            <Navbar />

            <div className="page">
                <div className="column-container" style={{marginTop: "5%", display: "flex", flexWrap: "wrap"}}>

                    <div className="user-widget-container" style={{ flex: "0 0 25%"}}>
                        <UserWidget userId={userId} />
                    </div>

                    <div className="friend-list-widget-container" style={{}}>
                        <FriendListWidget userId={userId} />
                    </div>

                    <div className="posts-widget-container" style={{ marginTop: "4%", flex: "0 0 100%" }}>
                        <PostFeed userId={userId} isProfile />
                    </div>
                </div>
            </div>
        </>

    );
}






/* EXPORT */

export default ProfilePage
