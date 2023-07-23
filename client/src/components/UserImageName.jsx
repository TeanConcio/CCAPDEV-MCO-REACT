/* IMPORTS */

// Modules
import { useNavigate } from "react-router-dom";

// Components
import UserImage from "./UserImage";

// Styles
import "styles/components/UserImageName.css"





/* MAIN COMPONENT */

const UserImageName = ({ image, username, userId, imageSize = "60px", fontSize = "2rem" }) => {

    const navigate = useNavigate();

    return (

        <div className="user-image-name-box" width={imageSize} height={imageSize}>
            <UserImage image={image} userId={userId} size={imageSize} />
            <div 
                className="user-name" 
                style={{ fontSize: fontSize }}
                onClick={() => navigate(`/profile/${userId}`)}>
                {username}
            </div>
        </div>
    );
};





/* EXPORT */

export default UserImageName;
