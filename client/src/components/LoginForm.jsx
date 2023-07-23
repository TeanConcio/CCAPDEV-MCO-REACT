/* IMPORT */

// Modules
import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";

// Components
import FlexBetween from "components/FlexBetween";
import { CheckBox } from "@mui/icons-material";



/* FORM VALIDATION SCHEMA */

// Register
const registerSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    username: yup.string().required("required"),
    picture: yup.string()
});

// Login
const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
});





/* FORM INITIAL VALUES */

// Register
const initialValuesRegister = {
    email: "",
    password: "",
    username: "",
    picture: ""
};

// Login
const initialValuesLogin = {
    email: "",
    password: ""
};





/* FORM COMPONENT */

const LoginForm = () => {

    /* HOOKS */
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pageType, setPageType] = useState("login");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    // theme
    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");





    /* CONTROLLERS */

    // Register
    const register = async (values, onSubmitProps) => {
        
        // Get form data
        const formData = new FormData();
        for (let value in values)
            formData.append(value, values[value]);
        formData.append("picturePath", values.picture.name);

        // Send request to server
        const savedUserResponse = await fetch(
            "http://localhost:4000/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        
        // If user saved, set login state
        onSubmitProps.resetForm();
        if (savedUser) {
            setPageType("login");
        }

        console.log(savedUser)
    };



    // Login
    const login = async (values, onSubmitProps) => {

        // Send request to server
        const loggedInResponse = await fetch(
            "http://localhost:4000/auth/login", 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await loggedInResponse.json();

        // If user logged in, set login state
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                user: loggedIn.user,
                token: loggedIn.token,
                })
            );
            navigate("/home");
        }

        console.log(loggedIn)
    };



    // Handle Form Submit
    const handleFormSubmit = async (values, onSubmitProps) => {

        if (isLogin) 
            await login(values, onSubmitProps);

        if (isRegister) 
            await register(values, onSubmitProps);
    };





    /* RENDER */

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />

                        {/* {isLogin && (
                            <>

                            </>
                        )} */}

                        {isRegister && (
                        <>
                            <TextField
                                label="Username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name="username"
                                error={
                                    Boolean(touched.username) && Boolean(errors.username)
                                }
                                helperText={touched.username && errors.username}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <Box
                                gridColumn="span 4"
                                border={`1px solid ${palette.neutral.medium}`}
                                borderRadius="5px"
                                p="1rem"
                            >
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) =>
                                    setFieldValue("picture", acceptedFiles[0])
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                                <p>Add Picture Here</p>
                                                ) : (
                                                <FlexBetween>
                                                    <Typography>{values.picture.name}</Typography>
                                                    <EditOutlinedIcon />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>
                        </>
                        )}
                    </Box>

                    {/* BUTTONS */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                        {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                cursor: "pointer",
                                color: palette.primary.light,
                                },
                            }}
                        >
                        {isLogin
                            ? "Don't have an account? Sign Up here."
                            : "Already have an account? Login here."}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    );
};





/* EXPORT */

export default LoginForm;
