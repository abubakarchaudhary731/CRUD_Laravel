import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { getData, EditData, stateReset } from '../Redux/Company';
import { useNavigate, useParams } from 'react-router-dom';

const AddCompany = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
    });
    const navigate = useNavigate();


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const { error, value } = useSelector((state) => state.Company);
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getData(data)).then((result) => {
            if (!result.payload.errors) {
                navigate("/company")
                dispatch(stateReset());
            }
        })
    }

    const { id } = useParams();
    const ID = parseInt(id);

    useEffect(() => {
        if (ID && value && value.data) {
            const singleUser = value.data.find((ele) => ele.id === ID);
            if (singleUser) {
                setData({ name: singleUser.name, email: singleUser.email });
            }
        }
    }, []);

    const handleEdit = () => {
        dispatch(EditData({ id: ID, list: data })).then((result) => {
            if (!result.payload.errors) {
                navigate("/company")
                dispatch(stateReset());
            }
        })
    }
    useEffect(() => {
        dispatch(stateReset())
    }, [dispatch])

    return (
        <div className='tw-flex tw-justify-center tw-h-screen tw-mt-[-5rem]' >
            <div className='tw-my-auto'>
                <div>
                    <form action="" method={ID ? 'PUT' : 'POST'} className='tw-bg-zinc-200 tw-rounded-xl tw-py-16 tw-px-20 tw-flex-col tw-flex tw-gap-6 tw-min-w-[600px]'>
                        <h1 className='tw-text-2xl'> {ID ? "Edit" : "Create"} Company </h1>

                        <TextField
                            value={data.name}
                            onChange={handleChange} required
                            id="standard-basic" label="Name"
                            variant="standard" name="name" className='tw-w-full'
                            error={Boolean(error?.name)}
                            helperText={error?.name && error?.name[0]}
                        />
                        <TextField
                            value={data.email}
                            onChange={handleChange} required
                            id="standard-basic" label="Email"
                            variant="standard" name="email" className='tw-w-full'
                            error={Boolean(error?.email)}
                            helperText={error?.email && error?.email[0]}
                        />

                        <Button onClick={ID ? handleEdit : handleSubmit} variant='contained'>
                            {ID ? "Update" : "ADD "}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCompany