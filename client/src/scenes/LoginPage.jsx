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

            <Box
                width="100%"
                backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center"
            >
                <Typography fontWeight="bold" fontSize="32px" color="primary">
                    Pokehub
                </Typography>
            </Box>

            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    Welcome to Pokehub, a Forum for Pokemon Enthusiasts!
                </Typography>
                <LoginForm />
            </Box>

        </Box>
    )
}






/* EXPORT */

export default LoginPage