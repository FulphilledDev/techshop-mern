import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../features/auth/authSlice'
import FormContainer from '../components/FormContainer'

const UserEditScreen = ({ history }) => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ isAdmin, setIsAdmin ] = useState(false)

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userId = params.id

    const selectedUser = useSelector(state => state.auth)
    const { isLoading, isError, message, userDetails } = selectedUser

    useEffect(() => {
      if(!userDetails.name || userDetails._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(userDetails.name)
        setEmail(userDetails.email)
        setIsAdmin(userDetails.isAdmin)
      }
    }, [userDetails, dispatch, userId])

    const submitHandler = (e) => {
        e.preventDefault()

        
    }


  return (
    <>
        <Link to='/admin/userlist' className='btn btn-light my-3'>
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit User</h1>
            {isLoading ? <Loader /> : isError ? <Message variant='danger'>{message}</Message> : (
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
                    <Form.Group controlId='isAdmin'>
                        <Form.Check 
                            type='checkbox' 
                            label='Is Admin'
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            )}
            
        </FormContainer>
    </>
    
  )
}

export default UserEditScreen
