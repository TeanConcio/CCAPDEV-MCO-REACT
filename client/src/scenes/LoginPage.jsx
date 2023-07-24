/* IMPORTS */

// Modules
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

// Components
import LoginForm from "../components/LoginForm";





/* LOGIN COMPONENT */

const LoginPage = () => {

    /* CONTROLLER AND VARIABLES */

    // Use theme
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");




    
    /* RENDER */

    return (
        <Box>
            {/* Parent Box with background image */}
            <Box
                sx={{
                    backgroundImage: `url("https://chuanfawu.com/wp-content/uploads/2023/06/PokemonCenter.jpg")`,
                    backgroundSize: "cover",
                    height: "100vh", // Set the height to cover the whole screen
                }}
            >
                {/* Header */}
                <Box
                    width="100%"
                    backgroundColor="black"
                    p="1rem 6%"
                    textAlign="center"
                >
                </Box>
                
                {/* Login Form */}
                <Box 
                    width={isNonMobileScreens ? "50%" : "100%"}
                    p="2rem"
                    m="2rem auto"
                    borderRadius="1.5rem"
                >
                    <LoginForm />
                </Box>
            </Box>
        </Box>
    )
}






/* EXPORT */

export default LoginPage