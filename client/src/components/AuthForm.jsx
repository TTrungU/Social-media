import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCloseCircle } from 'react-icons/ai';
import { signin, signup } from '../actions/auth'
import { useNavigate } from 'react-router-dom';
const initialState = { email: '', password: '' }
const Login = ({ setOpenLoginForm, isLogin }) => {
    const [form, setForm] = useState(initialState)
    const history = useNavigate();
    const dispatch = useDispatch();
    const { authData, errors } = useSelector((state) => state.auth);


    if (authData) {
        setOpenLoginForm(false)

    }

    const handleSubmit = (e) => {
        console.log(form)
        if (isLogin) {
            dispatch(signin(form, history))
        }
        if (!isLogin) {
            dispatch(signup(form, history))
        }
        e.preventDefault()
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <div className="z-10 absolute flex flex-col justify-center items-center top-0 right-0 bg-blackOverlay w-screen h-screen">
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                <div className=" ml-5 w-full flex justify-end items-center ">
                    <AiFillCloseCircle fontSize={20} className="cursor-pointer" onClick={() => setOpenLoginForm(false)} />
                </div>
                <h3 className="text-center text-gray-700 " >Welcome to SHAREME</h3>
                <form onSubmit={handleSubmit}>
                    {!isLogin && <>

                        <label className="form-label pt-5 inline-block mb-2 text-gray-700">User name</label>
                        <input type="text" name='username' className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focusocus:outline-none" placeholder="Enter email"
                            onChange={handleChange}
                        />
                    </>}
                    <label className="form-label pt-5 inline-block mb-2 text-gray-700">Email address</label>
                    <input type="email" name='email' className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focusocus:outline-none" placeholder="Enter email"
                        onChange={handleChange}
                    />
                    <label className="form-label pt-5 inline-block mb-2 text-gray-700">Password</label>
                    <input type="password" name='password' className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focusocus:outline-none" placeholder="Enter email"
                        onChange={handleChange}
                    />
                    {errors && <p className="form-label pt-5 inline-block mb-2 text-red-600">Login failed</p>}
                    <div className="flex space-x-2 justify-center">

                        <button type="submit" className="inline-block mt-5 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Login</button>
                    </div>

                </form>

            </div>
        </div >
    )
}

export default Login