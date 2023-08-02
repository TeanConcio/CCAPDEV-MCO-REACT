/* IMPORTS */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

// CSS import
import "../../styles/scenes/widgets/UserProfile.css";




/* USER WIDGET COMPONENT */

const UserWidget = ({ userId }) => {

    /* HOOKS AND STATES */

    // Get user and token
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);





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
                            <h2>{upvotes}</h2>
                        </div>
                        <div>
                            <p>Date Joined</p>
                            <h2>October 25, 2019</h2>
                        </div>
                        <div>
                            <p>Posts</p>
                            <h2>{postsNum}</h2>
                        </div>
                    </div>
                </div>
            </div>
        
    );
};




/* EXPORT */

export default UserWidget;
