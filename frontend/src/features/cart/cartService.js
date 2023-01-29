import axios from 'axios';

// Add Cart Item (Public)
const addItemToCart = async (qty, id) => {
    // January 29: Trying to add item to cart 
    // First grab the product from the params(url)
    const response = await axios.get(`/products/${id}`)

    // Then make it into an object with details we want to pass into the cart
    const newCartItem = {
        product: response._id,
        name: response.name,
        image: response.image,
        price: response.price,
        countInStock: response.countInStock,
        qty
    }

    // Create a variable for state of cartItems emoty array to receive the object 
    const state = {
        cartItems: []
    }

    // Set our state to localStorage of 'cart' and stringify the objects that, if any, are currently in the array
    localStorage.setItem('cart', JSON.stringify(state.cart.cartItems))
        
    // Check to see if the product already exists in the cart
    const existItem = state.cartItems.find(x => x.product === newCartItem.product)

    // If the item exists in the cart, then update its qty
    if(existItem) {
        return {
            ...state,
            cartItems: state.cartItems.map(x => x.product === existItem.product ? newCartItem : x)
        }
    } else {
        // If it doesnt, then add the whole object of newCartItem
        return {
            ...state,
            cartItems: [...state.cartItems, newCartItem]
        }
    }

    
}

const cartService = {
    addItemToCart
}

export default cartService