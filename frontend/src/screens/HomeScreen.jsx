import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { getProductList } from '../features/products/productSlice'

const HomeScreen = () => {
  const dispatch = useDispatch()
  
  const productList = useSelector((state) => state.productList)

  const { isLoading, isError, message, products } = productList

  useEffect(() => {
    dispatch(getProductList())
  }, [dispatch])


  return (
    <>
      <h1>Latest Products</h1>
      {isLoading 
        ? <h2>Loading...</h2> 
        : isError ? <h3>{message}</h3> 
        : (
          <Row>
            {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
          </Row>
        )}
      
    </>
  )
}

export default HomeScreen
