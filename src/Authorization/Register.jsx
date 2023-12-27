import { useState } from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import { registerUser } from "../Redux/Auth/Register";
import { useDispatch, useSelector } from "react-redux";
import './Style.css';
import Icons from "./Icons";



const Register = () => {
    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
      })
      const dispatch = useDispatch();
      const {error} = useSelector((state) => state.Register);     
    
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
          setRegister({
            name: "",
            email: "",
            password: "",
          });
          console.log("Something went wrong");
        }
      }

  return (
    <>
    <div className="form-container sign-up-container">
        <form action="" method="POST" onSubmit={handleRegister}>
          <h1> Create Account </h1>
            <Icons />
          <span>or use your email for registration</span>
          <div className="tw-flex tw-flex-col tw-gap-4 tw-w-full tw-px-20">

          <TextField value={register.name} onChange={handleChange}
            id="standard-basic" label="Name" variant="standard" name="name" required />

          <TextField value={register.email} onChange={handleChange}
            id="standard-basic" label="Email" variant="standard" name="email" required />

          <TextField value={register.password} onChange={handleChange}
            id="standard-basic" label="Password" variant="standard" name="password" required />

          <small className="tw-text-red-600"> {error} </small>

          <div className="tw-flex tw-justify-center">
            <button className="tw-p-3 tw-max-w-[150px] hover:tw-bg-red-500 hover:tw-text-white tw-rounded-xl tw-border tw-border-red-500" onClick={handleRegister}>Sign Up </button>
          </div>
          
          </div>
        </form>
      </div>
    </>
  )
}

export default Register