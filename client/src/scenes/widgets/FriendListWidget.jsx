/* IMPORTS */

// Modules
//import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// State
import { setLogout, setFriends } from "state";

// Components
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";

import "../../styles/scenes/widgets/FriendList.css";

import { API_URL } from "../../App";



/* FRIEND LIST WIDGET COMPONENT */

const FriendListWidget = ({ userId }) => {

    /* HOOKS AND STATES */

    // Get token and friends from state
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    // Get theme
    //const { palette } = useTheme();




    /* FUNCTIONS */

    // Get friends data
    const getFriends = async () => {

        // Get friends data from server
        const response = await fetch(`${API_URL}/users/${userId}/friends`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        }
        );
        const data = await response.json();

        if (data.error === "no token"){
            alert("Token Expired");

            const [user, token] = dispatch(setLogout({ user: null, token: null }));

            if (user === null &&
                token === null)
                window.location = "/";
        }
        else
            dispatch(setFriends({ friends: data }));
    };

    // Get friends data on process start (ran only once)
    useEffect(() => {
        getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps




    /* RENDER */

    return (

            <div className="friendlistactual-container">
                <div className="cont-header">
                    <div className="heading">Follower List</div>
                </div>
                <div className="cont-body">
                    {friends.map((friend) => (
                        <div key={friend._id} className="user-row">
                            <div className="user-info">
                                <img src={friend.picturePath} alt={friend.username} />
                                <span>{friend.username}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

    );
};




/* EXPORT */

export default FriendListWidget;
