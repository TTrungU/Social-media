import * as api from '../api/index.js'

export const signin = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)

        dispatch({ type: "AUTH", data })
        router('/')

    } catch (error) {
        console.log(error);
        dispatch({ type: "LOGINFAIL" })
    }
}

export const signup = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: "AUTH", data });

        router('/');
    } catch (error) {
        console.log(error);
    }
}
export const getUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.getUser(id)
        dispatch({ type: "GETUSER", data })
    } catch (error) {
        console.log(error)
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getAllUsers()
        dispatch({ type: "getAllUser", data })
    } catch (error) {
        console.log(error)
    }
}