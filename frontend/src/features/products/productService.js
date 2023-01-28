import axios from 'axios';

const API_URL = '/products'

// Get Landing Products (Public)
const getProductList = async () => {
    const response = await axios.get(API_URL)

    return response.data
}

// Get Landing Products (Public)
const getProductDetails = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`)

    return response.data
}

const productService = {
    getProductList,
    getProductDetails
}

export default productService