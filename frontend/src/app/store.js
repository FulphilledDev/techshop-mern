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

const store = configureStore({
  reducer: {
    productList: productReducer,
  },
  devTools: true,
});

export default store