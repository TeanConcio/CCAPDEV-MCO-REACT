/* IMPORTS */

// Modules
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// State Controller
import { setLogout } from "state";

// Components
import UserImageName from "./UserImageName";

// Style
import "../styles/components/Navbar.css";





/* NAVBAR COMPONENT */

const Navbar = () => {

    /* HOOKS AND STATES */

    // Get functions
    const dispatch = useDispatch();

    // Get user
    const user = useSelector((state) => state.user);





    /* RENDER */

    return (

        <>
            <header className="navbar">

                <Link to="#/home" className="brand">Pokéhub</Link>

                <div className="search">
                    <input type="text" className="text-box" placeholder="Search" />
                    <button className="btn">Search</button>
                </div>

                <div className="menu">
                    <UserImageName 
                        picturePath={user.picturePath}
                        username={user.username} 
                        userId={user._id}
                        imageSize="45px"
                        fontSize="1.75rem"
                    />
                    <Link to="#/" className="logout" onClick={() => dispatch(setLogout())}>Logout</Link>
                </div>

            </header>

            <div className="navbar-spacer"></div>
        </>
    )
}






/* EXPORT */

export default Navbar