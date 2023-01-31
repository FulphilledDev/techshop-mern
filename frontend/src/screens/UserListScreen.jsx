import { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUsersList, deleteUser } from '../features/auth/authSlice'

const UserListScreen = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state => state.auth)
    const { isLoading, isError, message, users} = userList

    const userLogin = useSelector(state => state.auth)
    const { user } = userLogin

    const userDelete = useSelector(state => state.auth)
    const { isSuccess: successDelete } = userDelete

    useEffect(() => {
        if(user && user.isAdmin) {
            dispatch(getUsersList())
        } else {
            navigate('/login')
        }
        
    }, [dispatch, navigate, successDelete, user])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteUser(id))
        }
    }

  return (
    <>
      <h1>Users</h1>
      {isLoading ? <Loader /> : isError ? <Message variant='danger'>{message}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th>OPTIONS</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                        <td>
                            {user.isAdmin ? (
                                <i className='fas fa-check' style={{color: 'green'}}></i>
                            ) : (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}
                        </td>
                        <td>
                            <LinkContainer to={`/user/${user._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                </Button>
                            </LinkContainer>
                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
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

export default UserListScreen
