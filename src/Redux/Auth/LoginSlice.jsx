import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let initialState = {
  user: "",
  token: "",
  loading: false,
};

export const loginUser = createAsyncThunk('user', async ({ email, password }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), 
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

const LoginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },
    addUser: (state, action) => {
      state.user = localStorage.getItem("user");
    },
  },

  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { addToken, addUser } = LoginSlice.actions;
export default LoginSlice.reducer;
