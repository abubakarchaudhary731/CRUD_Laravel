import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let initialState = {
  user: "",
  token: "",
  loading: false,
};

export const loginUser = createAsyncThunk('user', async ({ email, password }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), 
      mode: 'cors', 
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log('Login failed'); 
    }
  } catch (error) {
    console.log(error); 
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { addToken, addUser } = LoginSlice.actions;
export default LoginSlice.reducer;
