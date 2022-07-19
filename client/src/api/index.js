import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:8000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bear ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req;
})

export const getUser = (id) => API.get(`/api/user/${id}`)
export const getAllUsers = () => API.get(`/api/user/`)
export const signIn = (formData) => API.post('/api/user/signin', formData)
export const signUp = (formData) => API.post('/api/user/signup', formData)


export const createPost = (newPost) => API.post('/api/posts/create', newPost)
export const fetchPost = () => API.get('/api/posts/')