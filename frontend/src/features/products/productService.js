import axios from 'axios';

const API_URL = '/products'

// Get Landing Products (Public)
const getProductList = async () => {
    const response = await axios.get(API_URL)

    return response.data
}

const productService = {
    getProductList
}

export default productService