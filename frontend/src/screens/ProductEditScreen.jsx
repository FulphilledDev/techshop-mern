import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getProductDetails, updateProduct, reset } from '../features/products/productSlice'
import FormContainer from '../components/FormContainer'

const ProductEditScreen = () => {
    const [ name, setName ] = useState('')
    const [ price, setPrice ] = useState(0)
    const [ image, setImage ] = useState('')
    const [ brand, setBrand ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ countInStock, setCountInStock ] = useState(0)
    const [ description, setDescription ] = useState('')
    const [ uploading, setUploading ] = useState(false)


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const productId = params.id

    const selectedProduct = useSelector(state => state.productList)
    const { isLoading, isSuccess, isError, message, product } = selectedProduct

    useEffect(() => {
        if (!product.name || product._id !== productId) {
            dispatch(getProductDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setBrand(product.brand)
            setCategory(product.category)
            setDescription(product.description)
            setCountInStock(product.countInStock)
            setImage(product.image)
        }  
        
    }, [product, dispatch, navigate, productId, isSuccess])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()

        // UPDATE PRODUCT
        dispatch(updateProduct({
            id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))

        if (isSuccess) {
            dispatch(reset())
            navigate('/admin/productlist')
            // ^^^ This continues to get triggered and create a never ending loop... specifically 'reset'. Navigate, when alone, doesnt allow me to get to the current user onClick edit user
        }
    }


  return (
    <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {isLoading ? <Loader /> : isError ? <Message variant='danger'>{message}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label> Name </Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter name' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='price'>
                        <Form.Label> Price </Form.Label>
                        <Form.Control 
                            type='number' 
                            placeholder='Enter price' 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='image'>
                        <Form.Label> Image </Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter image url' 
                            value={image} 
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                        <Form.Control
                            id='image-file' 
                            // ^^^ This forces controlId to be ignored when selecting to upload a file
                            type='file'
                            label='Choose File' 
                            custom 
                            onChange={uploadFileHandler}></Form.Control>
                        {uploading && <Loader />}
                    </Form.Group>
                    <Form.Group controlId='brand'>
                        <Form.Label> Brand </Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter brand' 
                            value={brand} 
                            onChange={(e) => setBrand(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='countInStock'>
                        <Form.Label> Count In Stock </Form.Label>
                        <Form.Control 
                            type='number' 
                            placeholder='Enter count in stock' 
                            value={countInStock} 
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='category'>
                        <Form.Label> Category </Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter category' 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='description'>
                        <Form.Label> Description </Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter description' 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            )}
            
        </FormContainer>
    </>
    
  )
}

export default ProductEditScreen
