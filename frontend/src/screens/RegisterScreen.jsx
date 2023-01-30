import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../features/auth/authSlice'
import FormContainer from '../components/FormContainer'

const RegisterScreen = ({ history }) => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ alertMessage, setAlertMessage ] = useState(null)

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userRegister = useSelector(state => state.auth)
    const { isLoading, isError, message, user } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(user){
            navigate(redirect)
        }
    }, [navigate, user, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setAlertMessage('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password
            }
            
            dispatch(register(userData))
        }
    }


  return (
    <FormContainer>
        <h1>Sign Up</h1>
        {alertMessage && <Message variant='danger'>{alertMessage}</Message>}
        {isError && <Message variant='danger'>{message}</Message>}
        {isLoading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label> Name </Form.Label>
                <Form.Control 
                    type='name' 
                    placeholder='Enter name' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label> Email Address </Form.Label>
                <Form.Control 
                    type='email' 
                    placeholder='Enter email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label> Password </Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='Enter password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
                <Form.Label> Confirm Password </Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='Confirm password' 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Register</Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Have an account?{' '} <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}> Login </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen
