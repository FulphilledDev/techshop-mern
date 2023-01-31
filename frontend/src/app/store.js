import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import productReducer from '../features/products/productSlice'
import cartReducer from '../features/cart/cartSlice'

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null


const store = configureStore({
  reducer: {
    auth: authReducer,
    productList: productReducer,
    cart: cartReducer,
  },
  initialState: {
    cart: { cartItems: cartItemsFromStorage },
    auth: { user: userFromStorage},
  },
});

export default store