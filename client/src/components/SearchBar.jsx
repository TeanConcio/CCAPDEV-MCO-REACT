/* IMPORTS */

// Modules
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow, set } from 'date-fns'

// State Controller
import { setLogin } from "state";

// Style
import "../styles/components/SearchBar.css";

import { API_URL } from "../App";





/* Search Bar COMPONENT */

const SearchBar = () => {

    /* HOOKS AND STATES */

    // Get functions
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    
    const [searchText, setSearchText] = useState("");
    const [searchMode, setSearchMode] = useState(false);
    const [searchResults, setSearchResults] = useState([]);





    /* FUNCTIONS */

    // Get Search Results
    const getSearchResults = async () => {

        if (searchText.length === 0) {

            setSearchMode(false);
            return setSearchResults([]);
        }

        setSearchMode(true);
        // Get search results from server
        const response = await fetch(`${API_URL}/posts/search?search=${searchText}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if(data.error === "no token"){
            alert("Token Expired");

            if (dispatch(setLogin({user: null, token: null}))) {

                window.localStorage.clear();
                
                if (window.localStorage.length === 0)
                    window.location = "/";
            }
        }
        else
            setSearchResults(data);
    }





    /* RENDER */

    return (

        <div className="search-bar">

            <div className="search">

                <input 
                    type="text" 
                    className="text-box" 
                    placeholder="Search" 
                    onKeyUp={(e) => setSearchText(e.target.value)}
                />

                <button className="btn" onClick={() => getSearchResults()}>Search</button>

            </div>



            {searchMode && (

                <div className="search-results">


                    {(Array.isArray(searchResults) && searchResults.length > 0) ? (

                        searchResults.map((searchResult) => (

                            <div className="search-result">

                                <Link to={`/post/${searchResult.postId}`} className="title"> {searchResult.title} </Link>

                                <div className="details">
                                    <Link to={`/profile/${searchResult.postUserId}`} className="author"> 
                                        Posted by: {searchResult.username} 
                                    </Link>
                                    <span className="create-date">
                                        Posted: {formatDistanceToNow(new Date(searchResult.createdAt), {addSuffix: true})}
                                    </span>
                                </div>

                            </div>
                        ))

                    ) : (

                        <div className="search-result">

                            <div className="title"> No Posts Found </div>

                        </div>

                    )}


                </div>

            )}

        </div>
    )
}






/* EXPORT */

export default SearchBar