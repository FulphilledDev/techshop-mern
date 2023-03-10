import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useLocation } from 'react-router-dom'
import { Row, Col, ListGroup, Image, FormControl, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addCartItem, removeCartItem } from '../features/cart/cartSlice'

const CartScreen = ({ history }) => {
  const params = useParams()
  const location = useLocation()
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const productId = params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  useEffect(()=> {
    if(productId) {
      dispatch(addCartItem(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeCartItem(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }


  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? 
          (
            <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
          ) : ( 
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <FormControl 
                        as='select' 
                        value={item.qty} 
                        onChange={(e) => dispatch(addCartItem(item.product, Number(e.target.value)))}
                        style={{ color:'black' }}>
                          {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                  {x + 1}
                              </option>
                          ))}
                      </FormControl>
                    </Col>
                    <Col md={2}>
                      <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((a, item) => a + item.qty, 0)}) items</h2>
              ${cartItems.reduce((a, item)=> a + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
