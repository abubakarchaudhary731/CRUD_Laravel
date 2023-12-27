import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    value: [],
    companyDetail: {},
    error:null,
    loading:false,
}
const token = localStorage.getItem("token");

// Create 
export const getData = createAsyncThunk("Company", async (data, {rejectWithValue}) => {
if (token) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/companies`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        return result;

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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/companies`, {
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

// View Single Data
export const viewSingleCompany = createAsyncThunk("SingleCompanyList", async(id, {rejectWithValue}) => {
    if (token) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/companies/${id}`, {
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
        const response =  await fetch(`${import.meta.env.VITE_API_URL}/api/v1/companies/${data.id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`, 
                }
            });
            try {
                const result = await response.json();
                return result;
            } catch (error) {
                return rejectWithValue(error, "Error")
        }
    }  else {
            console.log("Require Token");
    }
});

// Edit Functionality
export const EditData = createAsyncThunk("EditData", async (data, {rejectWithValue}) => {
    if (token) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/companies/${data.id}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data.list)
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

// Multiple Deleted Rows
export const multipleDeleteCompany = createAsyncThunk("MultipleDeleteCompany", async (data, {rejectWithValue}) => {
  if (token) {
      try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/companies/destroyMultiple`, {
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


const CompanyData = createSlice({
    name: "Company",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.value)) {
          state.value = [...state.value, action.payload];
        }
        state.error =action.payload.errors;
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.error = JSON.stringify(action.payload.message);
      })

      .addCase(indexData.pending, (state) => {
        state.loading = true;
      })
      .addCase(indexData.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(indexData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.loading = false;
        const { meta } = action;
        const items = meta.arg.list;
        const deleteitem = meta.arg.id;
        state.value = items.filter((ele) => ele.id !== deleteitem);
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(viewSingleCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewSingleCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companyDetail = action.payload;
      })
      .addCase(viewSingleCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = JSON.stringify(action.payload);
      })

      .addCase(EditData.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditData.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.value)) {
          state.value = [...state.value, action.payload];
        }
      })
      .addCase(EditData.rejected, (state, action) => {
        state.loading = false;
        state.error = JSON.stringify(action.payload);
      })

      .addCase(multipleDeleteCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(multipleDeleteCompany.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.value)) {
          state.value = [...state.value, action.payload];
        }
        state.error = JSON.stringify(action.payload);
      })
      .addCase(multipleDeleteCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
    
});


export default CompanyData.reducer