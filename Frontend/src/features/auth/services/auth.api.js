import axios from "axios";


/**
 * This file contains functions to interact with the authentication API endpoints.
 */
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true
})
// Registration function
export async function register({ username, email, password }) {
    try {
        const response = await api.post('/auth/register', {
            username, email, password
        }, {
            withCredentials: true
        })
        return response.data
    }
    catch (error) {
        console.log(err)

    }
}


// Login function
export async function login({ email, password }) {

    try {
        const response = await api.post('/auth/login', {
            email, password
        }, {
            withCredentials: true
        })
        return response.data
    }
    catch (error) {
        console.log(err)
    }
}


// Logout function
export async function logout() {
    try {
        const response = await api.post('/auth/logout', {}, {
            withCredentials: true
        })
        return response.data
    }
    catch (error) {
        console.log(err)
    }
}

//get-me function
export async function getMe() {
    try {
        const response = await api.get('/auth/me', {
            withCredentials: true
        })
        return response.data
    }
    catch (error) {
        console.log(err)
    }
}