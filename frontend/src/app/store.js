// import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import productReducer from '../features/products/productSlice'
// import cartReducer from '../features/cart/cartSlice'

// const reducer = combineReducers({})

// const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

// const initialState = {cart: {
//     cartItems: cartItemsFromStorage
//   }}

// const middleware = [thunk]

// const store = configureStore({reducer: {
//     productList: productReducer,
//     cart: cartReducer
//   }}, initialState, composeWithDevTools (applyMiddleware(...middleware)))

// export default store

import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice'
import cartReducer from '../features/cart/cartSlice'

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const store = configureStore({
  reducer: {
    productList: productReducer,
    cart: cartReducer
  },
  initialState: {
    cart: {
      cartItems: cartItemsFromStorage
    }
  },
});

export default store