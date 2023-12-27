import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { loginUser } from "../Redux/Auth/LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import './Style.css';
import Register from "./Register";
import Icons from "./Icons";

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
      if (result.payload.message) {
        setEmail("");
        setPassword("");
        
      }
    });
      
  };
  
  return (
    <div className="body">
      <div className={`container ${isSignup ? "right-panel-active" : ""}`}>
        <Register />
      <div className="form-container sign-in-container">
        <form action="#" method="POST">
          <h1 className="tw-text-3xl tw-font-bold"> Sign In </h1>
            <Icons />
          <p> or use your Account </p>

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
            <h1 className="tw-font-bold tw-text-3xl"> Hello, Friend! </h1>
            <p> Enter your details and start the journey with us </p>
            <button className="tw-p-2 tw-max-w-[150px] hover:tw-bg-white hover:tw-text-red-500 tw-rounded-xl tw-border tw-border-white tw-font-bold tw-mt-5" onClick={toggleForm}> Sign In </button>
          </div>

          <div className="overlay-panel overlay-right">
            <h1 className="tw-font-bold tw-text-3xl"> Welcome Back! </h1>
            <p> To keep connected with us please login with your personal info </p>
            <button className="tw-p-2 tw-max-w-[150px] hover:tw-bg-white hover:tw-text-red-500 tw-rounded-xl tw-border tw-border-white tw-font-bold tw-mt-5" onClick={toggleForm}> Sign Up </button>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;