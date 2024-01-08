import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { clearError, registerUser } from "../Redux/Auth/Register";
import { useDispatch, useSelector } from "react-redux";
import './Style.css';
import Icons from "./Icons";

const Register = () => {
const [message, setMessage] = useState(null);
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
      await dispatch(registerUser(register)).then((result)=> {
        if (result.payload.token) {
          register.name = "";
          register.email = "";
          register.password = "";
          dispatch(clearError());
          setMessage(result.payload.message);
        }
      });
    } catch {
      setRegister({
        name: "",
        email: "",
        password: "",
      });
      console.log("Something went wrong");
    }
  }
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <>
    <div className="form-container sign-up-container">
        <form action="" method="POST" onSubmit={handleRegister}>
          <h1 className="tw-text-3xl tw-font-bold"> Create Account </h1>
            <Icons />
          <p>or use your Email for Registration</p>
          <div className="tw-flex tw-flex-col tw-gap-4 tw-w-full tw-px-20">

          <TextField 
            value={register.name} 
            onChange={handleChange}
            label="Name" variant="standard"
            name="name" required 
            error={Boolean(error?.name)}  
            helperText={error?.name && error?.name[0]}
          />

          <TextField 
            value={register.email} 
            onChange={handleChange}
            label="Email" variant="standard" 
            name="email" required 
            error={Boolean(error?.email)}  
            helperText={error?.email && error?.email[0]}
          />

          <TextField 
            value={register.password} 
            onChange={handleChange}
            label="Password" variant="standard" 
            name="password" required 
            error={Boolean(error?.password)}  
            helperText={error?.password && error?.password[0]}
          />
          <p className="tw-text-red-600"> {message} </p>
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