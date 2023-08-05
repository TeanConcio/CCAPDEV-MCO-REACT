/* IMPORTS */

// Modules
import { useNavigate } from "react-router-dom";

// Components
import UserImage from "./UserImage";

// Styles
import "styles/components/UserImageName.css"





/* MAIN COMPONENT */

const UserImageName = ({ picturePath, username, userId, imageSize = "60px", fontSize = "2rem" }) => {

    const navigate = useNavigate();



    function changeLocation(link){
        navigate(link, { replace: true });
        window.location.reload();
    }



    return (

        <div className="user-image-name-box" width={imageSize} height={imageSize}>
            <UserImage picturePath={picturePath} userId={userId} size={imageSize} />
            <div 
                className="user-name" 
                style={{ fontSize: fontSize }}
                onClick={() => changeLocation(`/profile/${userId}`)}>
                {username}
            </div>
        </div>
    );
};





/* EXPORT */

export default UserImageName;
