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

//  Register User
const getUserDetails = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.get(`${API_URL}/${id}`, config)

    return data
}

//  Update User Profile
const updateUserDetails = async (userData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.put(`${API_URL}/profile`, userData, config)

    return data
}

//  Logout User
const logout = () => localStorage.removeItem('user')

//  Get Users List
const getUsersList = async (token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.get(`${API_URL}`, config)

    return data
}

//  Delete User
const deleteUser = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }

    await axios.delete(`${API_URL}/${id}`, config)
}

const authService = {
    register,
    getUserDetails,
    updateUserDetails,
    logout,
    login,
    getUsersList,
    deleteUser
}

export default authService