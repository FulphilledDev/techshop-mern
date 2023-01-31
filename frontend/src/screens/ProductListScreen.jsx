import { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getProductList } from '../features/products/productSlice'

const ProductListScreen = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const productList = useSelector(state => state.productList)
    const { isLoading, isError, message, products} = productList

    const userLogin = useSelector(state => state.auth)
    const { user } = userLogin


    useEffect(() => {
        if(user && user.isAdmin) {
            dispatch(getProductList())
        } else {
            navigate('/login')
        }
        
    }, [dispatch, navigate, user])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')) {
            // DELETE PRODUCTS
        }
    }

    const createProductHandler = () => {
        console.log('Created')
    }

  return (
    <>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-end'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
        </Row>
        {isLoading ? <Loader /> : isError ? <Message variant='danger'>{message}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
  )
}

export default ProductListScreen
