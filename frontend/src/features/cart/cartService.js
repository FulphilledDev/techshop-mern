import axios from 'axios';
import { addCartItem } from './cartSlice';

const API_URL = '/cart'

// Add Cart Item (Public)
const addItemToCart = (id, qty) => async (dispatch, getState) => {
    const response = await axios.get(`/products/${id}`)

    dispatch({
        type: addCartItem,
        payload: {
            product: response._id,
            name: response.name,
            image: response.image,
            price: response.price,
            countInStock: response.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

const cartService = {
    addItemToCart
}

export default cartService