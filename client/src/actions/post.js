import * as API from '../api/index.js'

export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' })
        const { data } = await API.fetchPost()
        dispatch({ type: 'FETCH_ALL', data })
        dispatch({ type: 'END_LOADING' })

    } catch (error) {
        console.log(error)
    }
}

export const createPost = (newPost) => async (dispatch) => {
    try {
        const { data } = await API.createPost(newPost)
        dispatch({ type: "CREATE", data })
    } catch (error) {
        console.log(error)
    }

}