import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk("register", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      mode: "cors",
    });

    const result = await response.json();
    return result;

  } catch (error) {
    return rejectWithValue(error);
  }
});

const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  }, 
  extraReducers: (builder) => {    
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        state.error = action.payload.errors;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message; 
      });
  },
});

export const { clearError } = RegisterSlice.actions;
export default RegisterSlice.reducer;
