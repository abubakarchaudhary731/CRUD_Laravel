import {configureStore} from '@reduxjs/toolkit';
import LoginSlice from './Redux/Auth/LoginSlice';
import RegisterSlice from './Redux/Auth/Register'
import CompanyData from './Redux/AddCompany';

const Store = configureStore({
    reducer: {
        Login: LoginSlice,
        Register: RegisterSlice,
        Company: CompanyData,
    }
});
  

export default Store