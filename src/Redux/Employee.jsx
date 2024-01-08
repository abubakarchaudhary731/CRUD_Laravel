import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const initialState = {
    Employees: [],
    employeeData: {},
    isLoading: false,
    error: null,
};

// ADD Employee
export const getEmpData = createAsyncThunk("AddEmployee", async (data, {rejectWithValue}) => {
    if (token) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/employees`, {
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

// Employee All Data

export const employeeList = createAsyncThunk("EmployeeList", async(data, {rejectWithValue}) => {
    if (token) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/employees`, {
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

// View Single Employee 
export const viewSingleEmployee = createAsyncThunk("SingleEmployeeList", async(id, {rejectWithValue}) => {
    if (token) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/employees/${id}`, {
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

// Delete Employee
export const deleteEmployee = createAsyncThunk("DeleteEmployee", async(data, {rejectWithValue}) => {
    
    if (token) {
        const response =  await fetch(`${import.meta.env.VITE_API_URL}/api/v1/employees/${data.id}`, {
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

// Edit Employee
export const editEmployee = createAsyncThunk("EditData", async (data, {rejectWithValue}) => {
    if (token) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/employees/${data.id}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data.list)
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

// Multiple Delete Employee
export const multDelEmp = createAsyncThunk("multDelEmp", async (data, {rejectWithValue}) => {
    if (token) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/employees/destroyMultiple`, {
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


const EmployeeSlice = createSlice({
    name: "Employee",
    initialState,
    reducers: {
        stateReset: (state) => {
            state.isLoading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getEmpData.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getEmpData.fulfilled, (state, action) => {
            state.isLoading = false;
            if (Array.isArray(action.payload)) {
                state.Employees = [...state.Employees, action.payload]
            } else {
                state.Employees = [];
            }
            state.error = action.payload.errors;
        })
        .addCase(getEmpData.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        })
        
        .addCase(employeeList.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(employeeList.fulfilled, (state, action) => {
            state.isLoading = false
            state.Employees =  action.payload.data
        })
        .addCase(employeeList.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        })

        .addCase(viewSingleEmployee.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(viewSingleEmployee.fulfilled, (state, action) => {
            state.isLoading = false,
            state.employeeData =  action.payload.data
        })
        .addCase(viewSingleEmployee.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        })

        .addCase(deleteEmployee.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            const { meta } = action;
            const items = meta.arg.list;
            const deleteitem = meta.arg.id;
            state.Employees = items.filter(ele => ele.id !== deleteitem);
        })
        .addCase(deleteEmployee.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        })

        .addCase(editEmployee.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(editEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            if (Array.isArray(state.value)) {
                state.value = [...state.value, action.payload];
            }
            state.error = action.payload.errors;
        })
        .addCase(editEmployee.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        })

        .addCase(multDelEmp.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(multDelEmp.fulfilled, (state, action) => {
            state.isLoading = false;
            if (Array.isArray(action.payload)) {
                state.Employees = [...state.Employees, action.payload]
            } else {
                state.Employees = [...state.Employees]; 
            }
        })
        .addCase(multDelEmp.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        })
        

    }
});

export const { stateReset } = EmployeeSlice.actions;
export default EmployeeSlice