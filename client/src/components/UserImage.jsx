/* IMPORTS */

// Modules
import { useNavigate } from "react-router-dom";

// Styles
import "styles/components/UserImage.css"

import { API_URL } from "../App";





/* MAIN COMPONENT */

const UserImage = ({ picturePath, userId = "", size = "60px" }) => {

    const navigate = useNavigate();

    return (

        <div className="user-image-box" width={size} height={size}>

            {(userId === "") ? (
                <img
                    className="user-image"
                    width={size}
                    height={size}
                    alt="user"
                    src={`${API_URL}/assets/${picturePath}`}
                />
            ) : (
                <img
                    className="user-image"
                    width={size}
                    height={size}
                    alt="user"
                    src={`${API_URL}/assets/${picturePath}`}
                    onClick={() => navigate(`/profile/${userId}`)}
                />
            )}

        </div>
    );
};





/* EXPORT */

export default UserImage;
