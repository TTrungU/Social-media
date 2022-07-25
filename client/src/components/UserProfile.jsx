import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../actions/auth';
import { getPostByCreator } from '../actions/post';
import MasonryLayout from './MasonryLayout';
const UserProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const { posts, isLoading } = useSelector((state) => state.post)
    console.log(posts)
    const { id } = useParams()
    console.log(id)
    useEffect(() => {
        dispatch(getUser(id))
    }, [id])
    useEffect(() => {
        dispatch(getPostByCreator(id))
    }, [])

    return (
        <div className="relative pb-2 h-full justify-center items-center">
            <div className="flex flex-col pb-5">
                <div className="flex flex-col justify-center items-center">

                    <img
                        className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
                        // src={user.image}
                        alt="user-pic"
                    />
                    <h1 className="font-bold text-3xl  text-center mt-3">
                        {user?.username}
                    </h1>
                </div>


            </div>
            <div className="px-2">
                <MasonryLayout posts={posts} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default UserProfile