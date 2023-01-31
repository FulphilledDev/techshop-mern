import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    userDetails: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register New User
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        return await authService.register(userData)
    } catch (error) {
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message
            || error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})

// Login User
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData)
    } catch (error) {
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message
            || error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})

// Get User Details
export const getUserDetails = createAsyncThunk('auth/user', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.getUserDetails(id, token)
    } catch (error) {
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message
            || error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})

// Update User Details
export const updateUserDetails = createAsyncThunk('auth/user/update', async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.updateUserDetails(userData, token)
    } catch (error) {
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message
            || error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})

// Logout User
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(getUserDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userDetails = action.payload
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                // state.user = null
            })
            .addCase(updateUserDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userDetails = action.payload
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                // state.user = null
            })
            .addCase(login.pending, (state) => {
                // ^^^ These are called CONSTANTS: 'pending, fulfilled, rejected'
                state.isLoading = true
                // ^^^ These are called REDUCERS: 'isLoading, isError, isSuccess, message'. They modify the state
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.userDetails = {}
            })
        }
})

export const { reset } = authSlice.actions

export default authSlice.reducer