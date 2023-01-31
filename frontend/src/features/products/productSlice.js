import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
    product: { reviews: [] },
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get Products
export const getProductList = createAsyncThunk('products/getAll', async (_, thunkAPI) => {
    try {
        return await productService.getProductList()
    } catch (error) {
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message
            || error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})

// Get Products
export const getProductDetails = createAsyncThunk('products/:id', async (id, thunkAPI) => {
    try {
        return await productService.getProductDetails(id)
    } catch (error) {
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message
            || error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})

// Delete Product
export const deleteProduct = createAsyncThunk('products/delete/:id', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.deleteProduct(id, token)
    } catch (error) {
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message
            || error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})

// Create Product
export const createProduct = createAsyncThunk('products/create', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.createProduct(token)
    } catch (error) {
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message
            || error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})

export const productSlice = createSlice ({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            // for switch / case: 'pending' === 'PRODUCT_LIST_REQUEST'
            .addCase(getProductList.pending, (state) => {
                state.isLoading = true
            })
            // for switch / case: 'success' === 'PRODUCT_LIST_SUCCESS'
            .addCase(getProductList.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
            })
            // for switch / case: 'rejected' === 'PRODUCT_LIST_FAIL'
            .addCase(getProductList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getProductDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductDetails.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.product = action.payload
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProduct.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.product = action.payload
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
        }
})

export const {reset} = productSlice.actions
export default productSlice.reducer