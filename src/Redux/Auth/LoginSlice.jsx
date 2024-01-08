import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let initialState = {
  user: "",
  token: "",
  loading: false,
  errorLogin: null,
  message: null,
};

// eslint-disable-next-line no-unused-vars
export const loginUser = createAsyncThunk('user', async ({ email, password }, {rejectWithValue}) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), 
      mode: 'cors', 
    });

    const result = await response.json();
    return result;

  } catch (error) {
   return rejectWithValue(error); 
  }
});

// eslint-disable-next-line react-refresh/only-export-components
const LoginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state) => {
      state.token = localStorage.getItem('token');
    },
    addUser: (state) => {
      state.user = localStorage.getItem('user');
    },
    clearErrorLogin: (state) => {
      state.errorLogin = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.errorLogin = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        if (action.payload.token !==undefined ) {
          localStorage.setItem('token', action.payload.token);  
        }
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        state.errorLogin = action.payload.errors;  
        state.message = action.payload.message;     
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errorLogin = action.payload.message;
      });
  },
});

export const { addToken, addUser, clearErrorLogin } = LoginSlice.actions;
export default LoginSlice.reducer;
