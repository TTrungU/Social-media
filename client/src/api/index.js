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
export const fetchPostBySearch = (searchQuery) => API.get(`api/posts/search?searchQuery=${searchQuery}`)
export const fecthPostByCreator = (id) => API.get(`api/posts/creator/${id}`)
export const fetchPosts = () => API.get('/api/posts/')
export const fetchPost = (id) => API.get(`/api/posts/${id}`)
export const comment = (id, value) => API.post(`/api/posts/${id}/comment`, value)
export const deleteComment = (id, commentId) => API.post(`/api/posts/${id}/deleteComment`, commentId)
export const deletePost = (id) => API.delete(`/api/posts/${id}`);
export const editPost = (id, newPost) => API.patch(`/api/posts/${id}`, newPost)
export const likePost = (id) => API.patch(`/api/posts/${id}/likePost`)