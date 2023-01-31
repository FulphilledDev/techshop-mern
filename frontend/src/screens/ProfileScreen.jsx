import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserDetails } from '../features/auth/authSlice'

const ProfileScreen = () => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ alertMessage, setAlertMessage ] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // This holds the current logged in user
    const userLogin = useSelector(state => state.auth)
    const { user } = userLogin

    // This holds the logged in userDetails to be displayed in profile
    const userInfo = useSelector(state => state.auth)
    const { isLoading, isError, message, userDetails } = userInfo

    useEffect(() => {
        if(!user){
            navigate('/login')
        } else {
            if(!userDetails.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(userDetails.name)
                setEmail(userDetails.email)
            }
        }
    }, [navigate, dispatch, user, userDetails])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setAlertMessage('Passwords do not match')
        } else {
            const updatedDetails = {
                id: user._id, 
                name,
                email,
                password
            }

            dispatch(updateUserDetails(updatedDetails))
            setAlertMessage('Profile Updated!')
        }
    }


  return <Row>
    <Col md={3}>
        <h2>User Profile</h2>
        {alertMessage && <Message variant='danger'>{alertMessage}</Message>}
        {isError && <Message variant='danger'>{message}</Message>}
        {/* {isSuccess && <Message variant='success'>{message}</Message>} */}
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

            <Button type='submit' variant='primary'>Update</Button>
        </Form>
    </Col>
    <Col md={9}>
        <h2>My Orders</h2>
    </Col>
  </Row>
}

export default ProfileScreen

