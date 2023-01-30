import axios from 'axios'

//  This matches routes reference on the backend
const API_URL = '/users'

//  Register User
const register = async (userData) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const registeredUser = {
        name: userData.name,
        email: userData.email,
        password: userData.password
    }

    const { data } = await axios.post(API_URL, registeredUser, config)

    if(data) {
        localStorage.setItem('user', JSON.stringify(data))
    }
    return data
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