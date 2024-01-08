import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { editEmployee, getEmpData, stateReset } from '../Redux/Employee';

const CreateEmployee = () => {
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',

    });
    
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    
    const {value} = useSelector((state) => state.Company);
    const companyData = value && value.data;
    
    const {Employees, error} = useSelector((state) => state.Employee);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();   
        dispatch(getEmpData(data)).then((result) => {
            if (!result.payload.errors) {
                 navigate("/employee");
                 dispatch(stateReset());
            }
         })  
    }

    useEffect(() => {
        dispatch(stateReset())
    }, [dispatch])

    const {id} = useParams();
    const ID = parseInt(id);

    useEffect(() => {
        if (ID && Employees) {
          const singleUser = Employees.find((ele) => ele.id === ID);
          if (singleUser) {
            setData({ first_name:singleUser.first_name, last_name:singleUser.last_name , 
                email:singleUser.email, phone:singleUser.phone, company:singleUser.company});
          }
        }
      }, []);
      
    const handleEdit = () => {
        dispatch(editEmployee({id:ID , list:data})).then((result) => {
           if (!result.payload.errors) {
                navigate("/employee");
                dispatch(stateReset());
           }
        })
    }
 
  return (
    <div className='tw-flex tw-justify-center tw-h-screen tw-mt-[-5rem]' >
        <div className='tw-my-auto'>
            <div>
                <form action="" method={ID ? 'PUT' : 'POST'} className='tw-bg-zinc-200 tw-rounded-xl tw-p-16 tw-flex-col tw-flex tw-gap-6 tw-min-w-[700px]'>
                <h1 className='tw-text-2xl'> {ID ? "Edit" : "Create"} Employee </h1>

                    <TextField 
                    value={data.first_name} 
                    onChange={handleChange} required
                    id="standard-basic" label="First Name" variant="standard" 
                    name="first_name" className='tw-w-full'
                    error={Boolean(error?.first_name)}  
                    helperText={error?.first_name && error?.first_name[0]}
                    />

                    <TextField 
                    value={data.last_name} 
                    onChange={handleChange} required
                    id="standard-basic" label="Last Name" 
                    variant="standard" name="last_name" className='tw-w-full'
                    error={Boolean(error?.last_name)}  
                    helperText={error?.last_name && error?.last_name[0]}
                    />

                    <TextField 
                    value={data.email} 
                    onChange={handleChange} required
                    id="standard-basic" label="Email" variant="standard" 
                    name="email" className='tw-w-full'
                    error={Boolean(error?.email)}  
                    helperText={error?.email && error?.email[0]}
                    />

                    <TextField 
                    value={data.phone} 
                    onChange={handleChange}
                    id="standard-basic" label="Phone Number" variant="standard" 
                    name="phone" className='tw-w-full'
                    />

                    <FormControl variant="filled" className='tw-w-full'>
                    <InputLabel id="demo-simple-select-filled-label">Company</InputLabel>
                        <Select
                          value={data.company} onChange={handleChange}
                          label="Company"  required
                          id={error?.company ? "demo-simple-select-error" : "demo-simple-select-filled"}
                          name='company'    
                        >
                            <MenuItem value="" > <em>None</em> </MenuItem>
                            {
                                Array.isArray(companyData) && companyData.map((data, id)=> {
                                    return <MenuItem key={id} value={data.id}> {data.name} </MenuItem>
                                })
                            }
                        </Select>
                        <FormHelperText style={{color: 'red'}}> {error?.company && error?.company[0]} </FormHelperText>
                    </FormControl>
                    <Button onClick={ID ? handleEdit : handleSubmit} variant='contained'>
                        {ID ? "Update" : "ADD"}
                    </Button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreateEmployee