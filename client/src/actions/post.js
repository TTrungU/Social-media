import * as API from '../api/index.js'

export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' })
        const { data } = await API.fetchPosts()
        dispatch({ type: 'FETCH_ALL', data })
        dispatch({ type: 'END_LOADING' })

    } catch (error) {
        console.log(error)
    }
}

export const createPost = (newPost, routes) => async (dispatch) => {
    try {
        const { data } = await API.createPost(newPost)
        dispatch({ type: "CREATE", data })
        routes('/')
    } catch (error) {
        console.log(error)
    }

}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' })
        const { data } = await API.fetchPost(id)
        dispatch({ type: 'FETCH_POST', payload: { post: data } })
        dispatch({ type: 'END_LOADING' })
    } catch (error) {
        console.log(error)
    }
}

export const commentPost = (id, comment) => async (dispatch) => {
    try {
        // console.log(comment)
        // dispatch({ type: 'START_LOADING' })
        const { data } = await API.comment(id, comment)
        dispatch({ type: 'COMMENT', payload: data })

        return data.comment
        // dispatch({ type: 'END_LOADING' })

    } catch (error) {
        console.log(error)
    }
}

export const deleteComment = (id, commentId) => async (dispatch) => {
    try {
        const { data } = await API.deleteComment(id, commentId)
        dispatch({ type: 'DELETE_COMMENT', payload: data })
        console.log(id, commentId)
        return data.comment
    } catch (error) {
        console.log(error)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' })
        const { data } = await API.fetchPostBySearch(searchQuery);

        dispatch({ type: 'FETCH_BY_SEARCH', data });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error);
    }
};

export const getPostByCreator = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' })
        const { data } = await API.fecthPostByCreator(id)
        dispatch({ type: 'FETCH_BY_SEARCH', data });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await API.deletePost(id);

        dispatch({ type: "DELETE_POST", payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await API.editPost(id, post);

        dispatch({ type: 'UPDATE_POST', payload: data });
    } catch (error) {
        console.log(error);
    }
};