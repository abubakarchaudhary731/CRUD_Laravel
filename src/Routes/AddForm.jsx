import React, { useState } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { getData } from '../Redux/AddCompany';
import { Navigate } from 'react-router-dom';

const AddForm = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
    });
    const [eror, setEror] = useState("")

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const {error} = useSelector((state) => state.Register);
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();   
        dispatch(getData(data));
        setData({name: "", email: ""});
        setEror("SuccessFully Added");
    }

  return (
    <div className='tw-flex tw-justify-center tw-h-screen' >
        <div className='tw-my-auto'>
            <div>
                <form action="" method='POST' className='tw-bg-zinc-200 tw-rounded-xl tw-p-20 tw-flex-col tw-flex tw-gap-6'>
                    <TextField value={data.name} onChange={handleChange} required
                    id="standard-basic" label="Name" variant="standard" name="name" />
                    <TextField value={data.email} onChange={handleChange} required
                    id="standard-basic" label="Email" variant="standard" name="email" />
                    <small className={`tw-text-red-600`}> {error ? error : eror} </small>
                    <Button onClick={handleSubmit}>
                        ADD
                    </Button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddForm