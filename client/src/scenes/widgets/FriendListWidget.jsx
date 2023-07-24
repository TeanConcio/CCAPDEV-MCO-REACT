/* IMPORTS */

// Modules
//import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// State
import { setFriends } from "state";

// Components
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";

import "../../styles/scenes/widgets/FriendList.css";



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

            <div className="actual-container">
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

        </WidgetWrapper>

    );
};




/* EXPORT */

export default FriendListWidget;
