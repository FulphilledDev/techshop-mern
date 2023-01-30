// import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import authReducer from '../features/auth/authSlice'
// import productReducer from '../features/products/productSlice'
// import cartReducer from '../features/cart/cartSlice'

// const reducer = combineReducers({})

// const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
// const userFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null


// const initialState = {
//   cart: { cartItems: cartItemsFromStorage},
//   userLogin: { user: userFromStorage}
// }

// const middleware = [thunk]

// const store = configureStore({reducer: {
//     auth: authReducer,
//     productList: productReducer,
//     cart: cartReducer
//   }}, initialState, composeWithDevTools (applyMiddleware(...middleware)))

// export default store

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