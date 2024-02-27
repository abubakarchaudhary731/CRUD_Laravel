import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Login from '../Authorization/Login';
import Home from './Home';
import AddCompany from '../Company/AddCompany';
import Error from './Error';
import View from '../Company/View';
import Employee from '../Employees/Employee';
import Company from '../Company/Company';
import CreateEmployee from '../Employees/CreateEmployee';
import NavBar from './NavBar';
import Protected from './ProtectedRoutes';


const AllRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='signin' element={<Login />} />
          <Route path='signup' element={<Login />} />

          <Route path='/' element={<Protected Component={NavBar} />}  >
            <Route index element={<Protected Component={Home} />} />
            <Route path='/company' element={<Protected Component={Company} />} />
            <Route path='/company/create' element={<Protected Component={AddCompany} />} />
            <Route path='/company/edit/:id' element={<Protected Component={AddCompany} />} />
            <Route path='/company/details/:id' element={<Protected Component={View} />} />
            <Route path='/employee' element={<Protected Component={Employee} />} />
            <Route path='/employee/create' element={<Protected Component={CreateEmployee} />} />
            <Route path='/employee/edit/:id' element={<Protected Component={CreateEmployee} />} />
          </Route>
          
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AllRoutes