import { useState, useEffect } from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import { loginUser } from "../Redux/Auth/LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import './Style.css';
import Register from "./Register";

const Login = () => {
  const navigate = useNavigate();
  const initialIsSignup = localStorage.getItem('isSignup') === 'true';
  const [isSignup, setIsSignup] = useState(initialIsSignup);

  // Update localStorage when the state changes
  useEffect(() => {
    localStorage.setItem('isSignup', String(isSignup));
  }, [isSignup]);

  const toggleForm = () => {
    setIsSignup(!isSignup);
    const newRoute = isSignup ? "/signin" : "/signup";
    navigate(newRoute);
  };

  // Login 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const {errorLogin, message} = useSelector((state) => state.Login);
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result)=> {
      if (result.payload.token) {
        navigate("/")
      }
    });
      
  };
  
  return (
    <div className="body">
      <div className={`container ${isSignup ? "right-panel-active" : ""}`}>
        <Register />
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

          <div className="tw-flex tw-flex-col tw-gap-4 tw-w-full tw-px-20">
          <TextField  value={email} onChange={(e) => setEmail(e.target.value)}
            id="standard-basic" label="Email" variant="standard" name="email" required />
            <small className="tw-text-red-600"> {errorLogin?.email} </small>

          <TextField  value={password} onChange={(e) => setPassword(e.target.value)}
            id="standard-basic" label="Password" variant="standard" name="password" required />
            <small className="tw-text-red-600"> {errorLogin?.password} </small>
            <p className="tw-text-red-600"> {Array.isArray(message) && message} </p>
          <a >Forgot Your Password</a>
          <div className="tw-flex tw-justify-center">
            <button className="tw-p-3 tw-max-w-[150px] hover:tw-bg-red-500 hover:tw-text-white tw-rounded-xl tw-border tw-border-red-500" onClick={handleLogin}>Sign In</button>
          </div>
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
            <button className="button ghost tw-p-2 tw-mt-3" onClick={toggleForm} >
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your details and start the journey with us</p>
            <button className="button ghost tw-p-2 tw-mt-3" onClick={toggleForm}>
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