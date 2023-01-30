import axios from 'axios'

//  This matches routes reference on the backend
const API_URL = '/users'

//  Register User
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//  Login User
const login = async (userData) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const loggedInUser = {
        email: userData.email,
        password: userData.password
    }

    const { data } = await axios.post(API_URL + '/login', loggedInUser, config)

    if(data) {
        localStorage.setItem('user', JSON.stringify(data))
    }
    return data
}

//  Logout User
const logout = () => localStorage.removeItem('user')

const authService = {
    register,
    logout,
    login
}

export default authService