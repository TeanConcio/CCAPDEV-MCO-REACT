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
    email: yup.string().email("invalid username").required("required"),
    password: yup.string().required("required"),
});





/* FORM INITIAL VALUES */

// Register
const initialValuesRegister = {
    email: "",
    password: "",
    username: "",
    picture: null,
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
      formData.append("picturePath", values.picture.name);


      // Send request to server
      const savedUserResponse = await fetch("http://localhost:4000/auth/register", {
          method: "POST",
          body: formData,
      });
      const savedUser = await savedUserResponse.json();

      // If user saved, set login state
      onSubmitProps.resetForm();
      if (savedUser) {
          setPageType("login");
      }

      console.log(savedUser);
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
            const passwordError = document.getElementById("passwordError");
            passwordError.removeAttribute("hidden");
            console.log("Failed to Log In");
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
                    {({ values, handleChange, handleSubmit}) => (
                        <Form className="input-group">
                            <Field
                                type="text"
                                className="input-field"
                                placeholder="Email"
                                name="email"
                                required
                            />
                            <Field
                                type="password"
                                className="input-field"
                                placeholder="Password"
                                name="password"
                                required
                            />
                            <div className="passwordError" name="passwordError" id="passwordError" hidden>
                                Invalid Username or Password
                            </div>
                            <Field
                                type="checkbox"
                                className="check-box"
                                id="rememberMe"
                                name="rememberMe"
                                checked= {values.rememberMe}
                                onChange={handleChange}
                            />
                            <label htmlFor="rememberMe">Keep Me Logged In</label>
                           
                            
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
                    {({ values, handleChange, handleSubmit, setFieldValue}) => (
                        <Form className="input-group">
                            <Field
                                type="text"
                                className="input-field"
                                placeholder="Username"
                                name="username"
                                required
                            />
                            <Field
                                type="email"
                                className="input-field"
                                placeholder="Email"
                                name="email"
                                required
                            />
                            <Field
                                type="password"
                                className="input-field"
                                placeholder="Enter Password"
                                name="password"
                                required
                            />
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

