import { useState, useEffect } from 'react'
import { Form, Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, FormControl } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getProductDetails } from '../features/products/productSlice'
// import products from '../products'

const ProductScreen = () => {
    // // NOTE: We could destructure "match" in order to grab the productId in the browser
    // // INSTEAD: We import useParams and give it a variable of params so we can identify which product we are seeing on the productScreen
    // const params = useParams()
    // const product = products.find(p => p._id === params.id )

    // ALSO: We only need the above request when making a frontend request. It does not require backend.
    // const [ product, setProduct ] = useState({})

    const [ qty, setQty ] = useState(0)

    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProductDetails(params.id))
    }, [dispatch, params])

    const productDetails = useSelector((state) => state.productList)
    const { isLoading, isError, message, product } = productDetails

    const addToCartHandler = () => {
        navigate(`/cart/${params.id}?qty=${qty}`)
    }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      {isLoading ? <Loader /> : isError ? <Message variant='danger'>{message}</Message> : (
        <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews}`} />
                </ListGroup.Item>
                <ListGroup.Item>
                    Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    Description: ${product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Price:
                            </Col>
                            <Col>
                                <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Status:
                            </Col>
                            <Col>
                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    { product.countInStock > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Qty:
                                </Col>
                                <Col>
                                    <FormControl 
                                        as='select' 
                                        value={qty} 
                                        onChange={(e) => setQty(e.target.value)}
                                        style={{ color:'black' }}>
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                    </FormControl>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                        <Button 
                            onClick={addToCartHandler}
                            className='btn-block' 
                            type='button' 
                            disabled={product.countInStock === 0}>
                            Add to Cart
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
      </Row>
      )}
      
    </>
  )
}

export default ProductScreen
