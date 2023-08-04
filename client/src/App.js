/* IMPORTS */

// Modules
import { HashRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";

// Scenes
import HomePage from "scenes/HomePage";
import LoginPage from "scenes/LoginPage";
import ProfilePage from "scenes/ProfilePage";
import ViewPostPage from "scenes/ViewPostPage";

// Theme & Styles
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";



export const API_URL = process.env.REACT_APP_API_URL;





/* APP COMPONENT */

function App() {

    /* HOOKS */

    // Get theme mode and create theme
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    // Get auth state
    const isAuth = Boolean(useSelector((state) => state.token));






  /* COMPONENT */

    return (

        <div className="app">

        <HashRouter>

            <ThemeProvider theme={theme}>
            <CssBaseline />

            <Routes>

                <Route 
                    path="/" element={isAuth ? <Navigate to="/home" /> : <LoginPage />}
                />
                <Route
                    path="/home"
                    element={isAuth ? <HomePage /> : <Navigate to="/" />}
                />
                <Route
                    path="/post/:postId"
                    element={isAuth ? <ViewPostPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/profile/:userId"
                    element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
                />

            </Routes>
            
            </ThemeProvider>

        </HashRouter>

        </div>

    );
}





/* EXPORT */

export default App;