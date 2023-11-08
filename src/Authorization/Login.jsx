import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import { loginUser } from "../Redux/Auth/LoginSlice";
import { useDispatch } from "react-redux";
import './Style.css';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Redux/Auth/Register";

const Login = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState(""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegister((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try{
      await dispatch(registerUser(register));
    } catch {
      setError("Incorrect Email. Change this Email" )
    }
    
  }

  // Login 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password }));
      navigate("/"); 
      setEmail("")
      setPassword("");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      setPassword("")
    }
  };

  
  return (
    <div className="body">
      <div className={`container ${isSignup ? "right-panel-active" : ""}`}>
      <div className="form-container sign-up-container">
        <form action="" method="POST" onSubmit={handleRegister}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social">
              <FaFacebookF />
            </a>
            <a href="#" className="social">
              <FaGoogle />
            </a>
            <a href="#" className="social">
              <FaTwitter />
            </a>
          </div>
          <span>or use your email for registration</span>
          <div className="tw-flex tw-flex-col tw-gap-4">
          <TextField value={register.name} onChange={handleChange}
            id="standard-basic" label="Name" variant="standard" name="name" />
          <TextField value={register.email} onChange={handleChange}
            id="standard-basic" label="Email" variant="standard" name="email" />
          <TextField value={register.password} onChange={handleChange}
            id="standard-basic" label="Password" variant="standard" name="password" />
          <small className="tw-text-red-600"> {error} </small>

          <button className="tw-p-2">Sign Up</button>
          </div>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#" method="POST">
          <h1>Sign In</h1>
          <div className="social-container">
            <a href="#" className="social">
              <FaFacebookF />
            </a>
            <a href="#" className="social">
              <FaGoogle />
            </a>
            <a href="#" className="social">
              <FaTwitter />
            </a>
          </div>
          <span>or use your account</span>
          <div className="tw-flex tw-flex-col tw-gap-4">
          <TextField  value={email} onChange={(e) => setEmail(e.target.value)}
            id="standard-basic" label="Email" variant="standard" name="email" />
          <TextField  value={password} onChange={(e) => setPassword(e.target.value)}
            id="standard-basic" label="Password" variant="standard" name="password" />
            <small className="tw-text-red-600"> {error} </small>
          <a href="#">Forgot Your Password</a>
          <button className="tw-p-2" onClick={handleLogin}>Sign In</button>
          </div>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button className="ghost tw-p-2 tw-mt-3" onClick={toggleForm} >
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your details and start the journey with us</p>
            <button className="ghost tw-p-2 tw-mt-3" onClick={toggleForm}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;