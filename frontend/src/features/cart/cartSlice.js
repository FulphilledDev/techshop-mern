import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from './cartService'

const initialState = {
    cartItems: [],
    cartItem: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Add Cart Item
export const addCartItem = createAsyncThunk('cart/addItem', async (state = { cartItems: [] }, action, thunkAPI)=> {
    try {
        const item = action.payload
        
        const existItem = state.cartItems.find(x => x.product === item.product)

        if(existItem) {
            return {
                ...state,
                cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
            }
        } else {
            return {
                ...state,
                cartItems: [...state.cartItems, item]
            }
        }

        return await cartService.addItemToCart(item)

    } catch (error) {
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) 
            || error.message
            || error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCartItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addCartItem.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.cartItems = action.payload
            })
            .addCase(addCartItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = cartSlice.actions
export default cartSlice.reducer

