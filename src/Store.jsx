import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import LoginSlice from './Redux/Auth/LoginSlice';
import RegisterSlice from './Redux/Auth/Register';
import CompanyData from './Redux/Company';
import EmployeeSlice from './Redux/Employee';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  Login: LoginSlice,
  Register: RegisterSlice,
  Company: CompanyData,
  Employee: EmployeeSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);



const Store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(Store);
export default Store;