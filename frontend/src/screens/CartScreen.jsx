import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useLocation } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addCartItem } from '../features/cart/cartSlice'

const CartScreen = ({ history }) => {
  const params = useParams()
  const location = useLocation()
  const dispatch = useDispatch()

  const productId = params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  useEffect(()=> {
    if(productId) {
      dispatch(addCartItem(productId, qty))
    }
  }, [dispatch, productId, qty])

  


  return (
    <div>
      Cart
    </div>
  )
}

export default CartScreen
