

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true }
        case 'END_LOADING':
            return { ...state, isLoading: false }
        case 'FETCH_ALL':
        case 'FETCH_BY_SEARCH':
        case 'FETCH_BY_CREATOR':
            return { ...state, posts: action.data }
        case 'UPDATE_POST':
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case 'CREATE':
            return { ...state, posts: [...state.posts, action.data] }
        case 'DELETE_POST':
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        case 'FETCH_POST':
            return { ...state, post: action.payload.post }
        case 'LIKE_POST':
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case 'DELETE_COMMENT':
        case 'COMMENT':
            return {
                ...state, posts: state.posts.map((post) => {
                    if (post._id === action.payload._id) {
                        return action.payload.post;
                    }
                    return post

                })
            }


        default:
            return state
    }

}