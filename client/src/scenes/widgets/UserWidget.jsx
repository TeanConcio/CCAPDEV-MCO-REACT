/* IMPORTS */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setLogin } from "state";

// Components
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { format } from 'date-fns'

// CSS import
import "../../styles/scenes/widgets/UserProfile.css";

import { API_URL } from "../../App";




/* USER WIDGET COMPONENT */

const UserWidget = ({ userId }) => {

    /* HOOKS AND STATES */

    // Get user and token
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);





    /* FUNCTIONS */

    // Get user data
    const getUser = async () => {

        // Get user data from server
        const response = await fetch(`${API_URL}/users/${userId}`, 
        {
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
        else
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
        postCount,
        commentCount,
        upvoteCount,
        downvoteCount,
        friends,
    } = user;





    /* RENDER */

    return (
        
            <div className="userprofilecontainer">
                <div className="userprofileprofile-card">
                    <div className="userprofilecover-pic"> Profile
                        <div className="userprofilebasic-actions">
                        </div>
                    </div>
                    <br />

                    <UserImage
                        picturePath={user.picturePath}
                    />

                    <h1>{username}</h1>
                    <p>{description}</p>
                    <div className="userprofilefollow-btn">
                        Follow
                    </div>

                    <div className="userprofilerow">
                        <div>
                            <p>Upvotes</p>
                            <h2>{upvoteCount-downvoteCount}</h2>
                        </div>
                        <div>
                            <p>Date Joined</p>
                            <h2>{format(new Date(user.createdAt), "MMMM d Y")}</h2>
                        </div>
                        <div>
                            <p>Posts</p>
                            <h2>{postCount}</h2>
                        </div>
                    </div>
                </div>
            </div>
        
    );
};




/* EXPORT */

export default UserWidget;
