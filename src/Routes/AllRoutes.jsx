import {BrowserRouter, Routes, Route, } from 'react-router-dom';
import Login from '../Authorization/Login';
import Home from './Home';
import AddCompany from '../Company/AddCompany';
import Error from './Error';
import View from '../Company/View';
import Employee from '../Employees/Employee';
import Company from '../Company/Company';
import CreateEmployee from '../Employees/CreateEmployee';
import NavBar from './NavBar';


const AllRoutes = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='signin' element={<Login />} />
        <Route path='signup' element={<Login />} />
          <Route path='/' element={<NavBar />}  >
            <Route index element={<Home />}/>
            <Route path='/company' element={<Company />} />
            <Route path='/company/create' element={<AddCompany />} />
            <Route path='/company/edit/:id' element={<AddCompany />} />
            <Route path='/company/details/:id' element={<View />}  />
            <Route path='/employee' element={<Employee />} />
            <Route path='/employee/create' element={<CreateEmployee /> } />
            <Route path='/employee/edit/:id' element={<CreateEmployee /> } />
          </Route>
        <Route path='*' element={<Error />} /> 

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default AllRoutes