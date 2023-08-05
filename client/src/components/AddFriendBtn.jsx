/* IMPORT */

// Modules
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setFriends } from "state";

import "../styles/components/AddFriendBtn.css";

import { API_URL } from "../App";





/* FRIEND COMPONENT */

const AddFriendBtn = ({ friendId }) => {

    /* HOOKS */

    // Get user, token, and friends
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    // Check if friend
    const isFriend = Boolean(Array.isArray(friends) && friends.find((friend) => friend._id === friendId));




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

        <div className="add-friend-spacer">

            {friendId !== _id ? (

                isFriend ? (

                    <div 
                        className="remove-friend-btn"
                        onClick={() => patchFriend()}
                    >
                        Remove Friend
                    </div>

                ) : (

                    <div 
                        className="add-friend-btn"
                        onClick={() => patchFriend()}
                    >
                        Add Friend
                    </div>

                )

            ) : (

                <div 
                    className="add-friend-btn"
                >
                    Me, Myself, and I
                </div>

            )}

        </div>

    );
};





/* EXPORT */

export default AddFriendBtn;
