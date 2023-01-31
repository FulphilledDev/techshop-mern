import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUser, reset } from '../features/auth/authSlice'
import FormContainer from '../components/FormContainer'

const UserEditScreen = () => {
    const selectedUser = useSelector(state => state.auth)
    const { isLoading, isError, message, userDetails } = selectedUser

    const updatedUser = useSelector(state => state.auth)
    const { isLoading: loadingUpdate , isError: errorUpdate , message: messageUpdate, isSuccess: successUpdate } = updatedUser
    
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ isAdmin, setIsAdmin ] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userId = params.id

    

    useEffect(() => {
        if(!userDetails.name || userDetails._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(userDetails.name)
            setEmail(userDetails.email)
            setIsAdmin(userDetails.isAdmin)
        }  
    }, [userDetails, dispatch, navigate, userId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateUser({ id: userId, name, email, isAdmin }))

        if(successUpdate){
            dispatch(reset())
            navigate('/admin/userlist')
            // ^^^ This continues to get triggered and create a never ending loop... specifically 'reset'. Navigate, when alone, doesnt allow me to get to the current user onClick edit user
        }
    }


  return (
    <>
        <Link to='/admin/userlist' className='btn btn-light my-3'>
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{messageUpdate}</Message>}
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
