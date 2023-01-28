// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

// const reducer = combineReducers({})

// const initialState = {}

// const middleware = [thunk]

// const store = createStore(reducer, initialState, composeWithDevTools (applyMiddleware(...middleware)))

// export default store

import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice'
import cartReducer from '../features/cart/cartSlice'

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const intialState = {
  cart: {
    cartItems: cartItemsFromStorage
  }
}

const store = configureStore({
  reducer: {
    productList: productReducer,
    cart: cartReducer
  },
  devTools: true,
});

export default store