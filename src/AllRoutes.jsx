import React from 'react';
import {BrowserRouter, Routes, Route, } from 'react-router-dom';
import Login from './Authorization/Login';
import Home from './Routes/Home';
import AddForm from './Routes/AddForm';
import FuncAppBar from './Routes/AppBar';


const AllRoutes = () => {
  return (
    <>
      <BrowserRouter>
      <FuncAppBar />
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Home />}  />
        <Route path='/adddata' element={<AddForm />}  />

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default AllRoutes