/* IMPORT */

// Modules
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import "../styles/components/LoginForm.css";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";

import { API_URL } from "../App";





/* FORM VALIDATION SCHEMA */

// Register
const registerSchema = yup.object().shape({
    username: 
        yup.string()
        .min(2, "Min 2 Characters")
        .max(25, "Max 25 Characters")
        .required("Required"),
    email: 
        yup.string()
        .email("Please enter valid email")
        .required("Required"),
    password: 
        yup.string()
        .min(8, "Min 8 Characters")
        .required("Required"),
    picture: 
        yup.string()
});

// Login
const loginSchema = yup.object().shape({
    email: 
        yup.string()
        .email("Please enter valid email")
        .required("Required"),
    password: 
        yup.string()
        .required("Required"),
});





/* FORM INITIAL VALUES */

// Register
const initialValuesRegister = {
    email: "",
    password: "",
    username: "",
    picture: "",
};

// Login
const initialValuesLogin = {
    email: "",
    password: "",
    rememberMe: false, // Set a default value for the checkbox
};





/* FORM COMPONENT */

const LoginForm = () => {

    /* HOOKS */
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pageType, setPageType] = useState("login");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const { palette } = useTheme();
    const [rememberMe, setrememberMe] = useState(false);

    // Error handling
    const [loginErrorMsg, setLoginErrorMsg] = useState("");
    const [registerErrorMsg, setRegisterErrorMsg] = useState("");

    const handleFormSwitch = (type) => {
        setPageType(type);
      };
   




    /* CONTROLLERS */

    // Register
    const register = async (values, onSubmitProps) => {

        // Get form data
        const formData = new FormData();
        for (let value in values)
            formData.append(value, values[value]);
            
        if (values.picture.name)
            formData.append("picturePath", values.picture.name);
        else
            formData.append("picturePath", "no_picture.png");


        // Send request to server
        const savedUserResponse = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            body: formData,
        });
        const savedUser = await savedUserResponse.json();

        if (savedUser.msg === "email taken") {
            setRegisterErrorMsg("Email already taken");
            document.getElementById("registerError").removeAttribute("hidden"); 
        }
        else if (savedUser.msg === "username taken") {
            setRegisterErrorMsg("Username already taken");
            document.getElementById("registerError").removeAttribute("hidden"); 
        }
        else if (savedUser.success) {
            // If user saved, set login state
            onSubmitProps.resetForm();
            if (savedUser) {
                setPageType("login");
            }
        }
        else {

            // If register failed, display the error message by removing hidden attribute in div
            setRegisterErrorMsg("Can't register");
            document.getElementById("registerError").removeAttribute("hidden"); 
        }

        
    };



    // Login
    const login = async (values, onSubmitProps) => {

        // Send request to server
        const loggedInResponse = await fetch(
            `${API_URL}/auth/login`, 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await loggedInResponse.json();

        // If user logged in, set login state
        
        if (loggedIn.success) {
            onSubmitProps.resetForm();
            dispatch(
                setLogin({
                user: loggedIn.user,
                token: loggedIn.token,
                })
            );
            
            navigate("/home");
        } else{
            // If login failed, display the error message by removing hidden attribute in div
            setLoginErrorMsg("Invalid email or password");
            document.getElementById("loginError").removeAttribute("hidden"); 
        }
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
      <div className="account-background">
        <div style={{fontFamily: "VT323", fontSize: "20px", color: "white", textAlign: "center"}}>
        <div className="form-container">
        <div className="welcome">Welcome to The Pokéhub!</div>
        <div className="button-container">
          <div id="button" style={{ left: pageType === "login" ? "0px" : "100px" }}></div>
          <button
            type="button"
            className={`toggle-button ${pageType === "login" ? "active" : ""}`}
            onClick={() => handleFormSwitch("login")}
          >
            <b>Login</b> 
          </button>
          <button
            type="button"
            className={`toggle-button ${pageType === "register" ? "active" : ""}`}
            onClick={() => handleFormSwitch("register")}
          >
            
            <b>Register</b>
          </button>
        </div>
  
        {pageType === "login" && (
                <Formik
                    initialValues={initialValuesLogin}
                    validationSchema={loginSchema}
                    onSubmit={handleFormSubmit}
                > 
                    {({ values, handleChange, handleSubmit, errors, touched}) => (
                        <Form className="input-group">
                            <Field
                                type="email"
                                className="input-field"
                                placeholder="Email"
                                name="email"
                                required
                            />
                            {errors.email && touched.email ? (
                                <div className="passwordError" name="passwordError">
                                    {errors.email}
                                </div>
                            ) : (null)}
                            <Field
                                type="password"
                                className="input-field"
                                placeholder="Password"
                                name="password"
                                required
                            />
                            <Field
                                type="checkbox"
                                className="check-box"
                                id="rememberMe"
                                name="rememberMe"
                                checked= {rememberMe}
                                onChange={() => {
                                     setrememberMe(!rememberMe);
                                     values.rememberMe = !rememberMe;
                                    }
                                }
                                
                            />
                            <label htmlFor="rememberMe">Keep Me Logged In</label>
                            <div className="passwordError" name="passwordError" id="loginError" hidden>
                                {loginErrorMsg}
                            </div>
                            <button
                                type="submit"
                                className="submit-button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}
                            >
                                <b>Login</b>
                            </button>
                        </Form>
                    )}
                </Formik>
            )}

            {pageType === "register" && (
                <Formik
                    initialValues={initialValuesRegister}
                    validationSchema={registerSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({ values, handleChange, handleSubmit, setFieldValue, errors, touched}) => (
                        <Form className="input-group">
                            <Field
                                type="text"
                                className="input-field"
                                placeholder="Username"
                                name="username"
                                required
                            />
                            {errors.username && touched.username ? (
                                <div className="passwordError" name="passwordError">
                                    {errors.username}
                                </div>
                            ) : (null)}
                            <Field
                                type="email"
                                className="input-field"
                                placeholder="Email"
                                name="email"
                                required
                            />
                            {errors.email && touched.email ? (
                                <div className="passwordError" name="passwordError">
                                    {errors.email}
                                </div>
                            ) : (null)}
                            <Field
                                type="password"
                                className="input-field"
                                placeholder="Enter Password"
                                name="password"
                                required
                            />
                            {errors.password && touched.password ? (
                                <div className="passwordError" name="passwordError">
                                    {errors.password}
                                </div>
                            ) : (null)}
                            <Dropzone
                                acceptedFiles=".jpg,.jpeg,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) => {
                                    // Set the selected file to formik values
                                    setFieldValue("picture", acceptedFiles[0]);
                                }}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        border={`2px dashed ${palette.primary.main}`}
                                        margin={"20px -50px 5px 50px"}
                                        p=" 1rem 3rem"
                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!values.picture ? (
                                             <Typography
                                             sx={{
                                                 display: "flex",
                                                 alignItems: "center",
                                                 justifyContent: "center",
                                                 height: "100%",
                                                 color: "white",
                                                 fontSize: "14px",
                                                 font: "VT323"
                                                
                                             }}
                                         >
                                             Insert Profile Picture Here
                                         </Typography>
                                        ) : (
                                            <Box alignItems="center">
                                                <Typography>{values.picture.name}</Typography>
                                                <EditOutlinedIcon />
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                            <br></br>
                            <div className="passwordError" name="passwordError" id="registerError" hidden>
                                {registerErrorMsg}
                            </div>
                            <button
                                type="submit"
                                className="submit-button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}
                            >
                                <b>Register</b>
                            </button>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
        </div>
        </div>
      );
    };
    
/* EXPORT */

export default LoginForm;

