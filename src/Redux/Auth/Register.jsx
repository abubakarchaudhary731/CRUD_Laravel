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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        state.error = JSON.stringify(action.payload.message)
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = JSON.stringify(action.payload, "Change Email"); 
      });
  },
});

export default RegisterSlice.reducer;
