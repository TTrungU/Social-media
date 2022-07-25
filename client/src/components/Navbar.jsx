import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm'

import { useDispatch } from 'react-redux';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({ setSearchTerm, searchTerm }) => {

    const dispatch = useDispatch();
    const [openLoginForm, setOpenLoginForm] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [user, setUser] = useState()

    useEffect(() => {
        const userLocal = JSON.parse(localStorage.getItem('profile'))
        setUser(userLocal)

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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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

                    <Link to={`user-profile/${user?._id}`} className="hidden md:block">
                        <div class="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg class="absolute -left-1 w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        </div>
                    </Link>
                    <div className="flex gap-3 mx-5">
                        <Link to="/create-post" className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
                            <IoMdAdd />
                        </Link>
                    </div>
                    <button onClick={logout} className="p-2 mr-2 px-5 text-gray-700 2xl:text-xl bg-red-500 rounded-full">
                        <h3> Logout</h3>
                    </button>
                </>)

                }


            </div>
        </div>
    )
}

export default Navbar