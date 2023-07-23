/* IMPORTS */

// Modules
import { useSelector } from "react-redux";

// Components
import Navbar from "components/Navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostFeed from "components/PostFeed";
import FriendListWidget from "scenes/widgets/FriendListWidget";

// Style
import "../styles/scenes/HomePage.css";





/* HOMEPAGE COMPONENT */

const HomePage = () => {

    /* CONTROLLER AND VARIABLES */

    const { _id, picturePath } = useSelector((state) => state.user);




    /* RENDER */

    return (

        <>

            <Navbar />

            <div className="page home">

                <div className="column">

                    <section className="greeting">
                        <h2>Welcome to Pokéhub Forum!</h2>
                    </section>

                    <PostFeed userId={_id} />
                    <MyPostWidget picturePath={picturePath} />

                </div>

            </div>

        </>

    );
}






/* EXPORT */

export default HomePage