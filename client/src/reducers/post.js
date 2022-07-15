

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true }
        case 'END_LOADING':
            return { ...state, isLoading: false }
        case 'FETCH_ALL':
            return { ...state, posts: action.data }
        case 'CREATE':
            return { ...state, posts: [...state.posts, action.data] }

        default:
            return state
    }

}