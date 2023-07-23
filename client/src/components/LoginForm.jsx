/* IMPORT */

// Modules
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import "../styles/components/LoginForm.css";

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


    // Handle Login Form Submit
    const handleLogin = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData);
        login(values, {
            resetForm: () => event.target.reset(),
        });
    };

    // Handle Register Form Submit
    const handleRegister = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData);

    // Handle the picture file separately and append it to the form data
    const pictureInput = event.target.querySelector('input[type="file"]');
    const pictureFile = pictureInput.files[0];
    formData.append("picture", pictureFile);

        register(values, {
            resetForm: () => event.target.reset(),
        });
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
          <div className="form-container">
            <div className="welcome">Welcome to The Pokéhub!</div>
            <div className="button-container">
              <div id="button"></div>
              <button
                type="button"
                className="toggle-button"
                onClick={() => setPageType("login")}
              >
                <b>Login</b>
              </button>
              <button
                type="button"
                className="toggle-button"
                onClick={() => setPageType("register")}
              >
                <b>Register</b>
              </button>
            </div>
    
            {pageType === "login" && (
              <form className="input-group" onSubmit={handleLogin}>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Username"
                  name="username"
                  required
                />
                <input
                  type="password"
                  className="input-field"
                  placeholder="Password"
                  name="password"
                  required
                />
                <div className="passwordError" hidden>
                  Invalid Username or Password
                </div>
                <input type="checkbox" className="check-box" id="rememberMe" />
                <button type="submit" className="submit-button">
                  <b>Login</b>
                </button>
              </form>
            )}
    
            {pageType === "register" && (
              <form className="input-group" onSubmit={handleRegister}>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Username"
                  required
                />
                <input
                  type="email"
                  className="input-field"
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  className="input-field"
                  placeholder="Enter Password"
                  required
                />
                 <input
                    type="file" // Set the type to "file" for the picture input
                    accept="image/*" // Specify the allowed file types (images)
                    name="picture" // Set the name to "picture" to match the FormData key
                    required
                />

                <button type="submit" className="submit-button">
                  <b>Register</b>
                </button>
              </form>
            )}
          </div>
      );
    };
    





/* EXPORT */

export default LoginForm;

