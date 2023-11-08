import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "autoprefixer";

const initialState = {
    value: [],
    error:null,
    loading:false,
}
const token = localStorage.getItem("token");

export const getData = createAsyncThunk("Company", async (data, {rejectWithValue}) => {
if (token) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/companies`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.log("Network Error");
        }
     } catch (error) {
        return rejectWithValue(error)
     }
} else {
    console.log("Require Token");
}
});

// Index Functionality

export const indexData = createAsyncThunk("CompanyList", async(ceck, {rejectWithValue}) => {
    if (token) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/companies`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`, 
                }
            });

            try {
                const result = await response.json();
                return result;
            } catch (error) {
                return rejectWithValue(error)
        }
    }  else {
            console.log("Require Token");
    }
});
// Delete Functionality
export const deleteData = createAsyncThunk("DeleteData", async(data, {rejectWithValue}) => {
    
    if (token) {
        const response =  await fetch(`${import.meta.env.VITE_API_URL}/v1/companies/${data.id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`, 
                }
            });
            try {
                const result = await response.json();
                return result
            } catch (error) {
                return rejectWithValue(error, "Error")
        }
    }  else {
            console.log("Require Token");
    }
});

const CompanyData = createSlice({
    name: "Company",
    initialState,
    reducers: {
    },
    
    extraReducers: {
        [getData.pending]: (state) => {
            state.loading=true;
        },
        [getData.fulfilled]: (state, action) => {
            state.loading=false;
            state.value = [...state.value, action.payload];
        },
        [getData.rejected]: (state, action) => {
            state.loading=false;
            state.error = action.payload.message;
        },
        [indexData.pending]: (state) => {
            state.loading=true;
        },
        [indexData.fulfilled]: (state, action) => {
            state.loading=false;
            state.value = action.payload;
        },
        [indexData.rejected]: (state, action) => {
            state.loading=false;
            state.error = action.payload;
        },
        
        [deleteData.pending]: (state) => {
            state.loading=true;
        },
        [deleteData.fulfilled]: (state, action) => {
            state.loading=false;
            const {meta} = action;
            const items = meta.arg.list;
            const deleteitem = meta.arg.id;
            state.value = items.filter((ele)=> ele.id !== deleteitem);           
        },
        [deleteData.rejected]: (state, action) => {
            state.loading=false;
            state.error = action.payload;
        },
        
    }
    
});


export default CompanyData.reducer