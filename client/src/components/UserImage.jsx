/* IMPORTS */

// Modules
import { useNavigate } from "react-router-dom";

// Styles
import "styles/components/UserImage.css"





/* MAIN COMPONENT */

const UserImage = ({ picturePath, userId, size = "60px" }) => {

    const navigate = useNavigate();

    return (

        <div className="user-image-box" width={size} height={size}>
            <img
                className="user-image"
                width={size}
                height={size}
                alt="user"
                src={`http://localhost:4000/assets/${picturePath}`}
                onClick={() => navigate(`/profile/${userId}`)}
            />
        </div>
    );
};





/* EXPORT */

export default UserImage;
