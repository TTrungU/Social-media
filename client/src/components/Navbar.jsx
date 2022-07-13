import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm'

import { useDispatch } from 'react-redux';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = () => {

    const dispatch = useDispatch();
    const [openLoginForm, setOpenLoginForm] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [user, setUser] = useState()

    useEffect(() => {
        const userLocal = JSON.parse(localStorage.getItem('profile'))
        setUser(userLocal)
        console.log("effect user")
    }, [openLoginForm])
    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        setUser(null);
        console.log('logout')
    };



    return (
        <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
            {openLoginForm && <AuthForm setOpenLoginForm={setOpenLoginForm} isLogin={isLogin} />}
            {/* {openSignUpForm && <Register setOpenSignUpForm={setOpenSignUpForm} />} */}
            <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
                <IoMdSearch fontSize={21} className="ml-1" />
                <input
                    placeholder="Search"
                    type="text"
                    className="p-2 w-full bg-white outline-none" />
            </div>
            <div className="flex items-center justify-between flex-row">
                {!user ? (<><button onClick={() => { setOpenLoginForm(true); setIsLogin(true) }} className="p-2 mr-2 px-5 text-gray-700 2xl:text-xl  rounded-full">
                    <h3> Login</h3>
                </button>
                    <button onClick={() => { setOpenLoginForm(true); setIsLogin(false) }} className="p-2 mr-2 px-5 text-gray-700 2xl:text-xl bg-red-500 rounded-full">
                        <h3> Resgister</h3>
                    </button>
                </>
                ) : (<>
                    <button onClick={logout} className="p-2 mr-2 px-5 text-gray-700 2xl:text-xl bg-red-500 rounded-full">
                        <h3> Logout</h3>
                    </button>
                    <div className="flex gap-3 ">
                        <Link to="/create-pin" className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
                            <IoMdAdd />
                        </Link>
                    </div>
                </>)

                }


            </div>
        </div>
    )
}

export default Navbar