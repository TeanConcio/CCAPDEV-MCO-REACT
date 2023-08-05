/* IMPORTS */

// Modules
//import { Box, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// State
import { setLogin } from "state";

// Components
import UserImageName from "components/UserImageName";
import AddFriendBtn from "components/AddFriendBtn";

import "../../styles/scenes/widgets/FriendList.css";

import { API_URL } from "../../App";



/* FRIEND LIST WIDGET COMPONENT */

const FriendListWidget = ({ userId }) => {

    /* HOOKS AND STATES */

    // Get token and friends from state
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    const [friends, setFriends] = useState(null);





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

            if (dispatch(setLogin({user: null, token: null}))) {

                window.localStorage.clear();
                
                if (window.localStorage.length === 0)
                    window.location = "/";
            }
        }
        else
            setFriends(data);
    };

    // Get friends data on process start (ran only once)
    useEffect(() => {
        getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps




    /* RENDER */

    return (

        <div className="friendlistactual-container">

            <div className="cont-header">
                <div className="heading">Friend List</div>
            </div>

            <div className="cont-body">

                {(Array.isArray(friends) && friends.length > 0) ? (
                    
                    friends.map((friend) => (

                        <div key={friend._id} className="friend-row">

                            <UserImageName 
                                picturePath={friend.picturePath}
                                username={friend.username}
                                userId={friend._id}
                                fontSize="1.5rem"
                                imageSize="35px"
                            />

                            <AddFriendBtn 
                                friendId={friend._id}
                            />

                        </div>
                    
                    ))
                ) : (

                    <div className="friend-row" style={{"margin":"0px"}}>
                        No friends found
                    </div>
                )}

            </div>

        </div>

    );
};




/* EXPORT */

export default FriendListWidget;
