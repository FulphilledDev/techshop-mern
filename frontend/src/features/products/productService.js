import axios from 'axios';

const API_URL = '/products'

// Get Products (Public)
const getProductList = async () => {
    const response = await axios.get(API_URL)

    return response.data
}

// Get Product Details (Public)
const getProductDetails = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`)

    return response.data
}

// Delete Product By Id
const deleteProduct = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }

    await axios.delete(`/products/${id}`, config)
}

// Create Product
const createProduct = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.post("/products", {}, config)

    return data 
}

// UpdateProduct
const updateProduct = async (productData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }

    const updatedProduct = {
        name: productData.name,
        brand: productData.brand,
        category: productData.category,
        image: productData.image,
        description: productData.description,
        price: productData.price,
        countInStock: productData.countInStock
    }

    const { data } = await axios.put(`/products/${productData.id}`, updatedProduct, config)

    return data 
}

const productService = {
    getProductList,
    getProductDetails,
    deleteProduct,
    createProduct,
    updateProduct
}

export default productService