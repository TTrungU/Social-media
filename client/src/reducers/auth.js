


const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case "AUTH":
            console.log("reducer auth")
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action.data, loading: false, errors: false }

        case "LOGOUT":
            localStorage.clear();
            return { ...state, authData: null, loading: false, errors: false };
        case "LOGINFAIL":
            console.log("login fail")
            return { ...state, authData: null, loading: false, errors: true }
        // case "GETUSER":
        //     return { ...state, authData: action.data, loading: false, errors: false }
        default:
            return state;
    }

}

export default authReducer;