import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CreatePost from '../components/CreatePost'
import MasonryLayout from '../components/MasonryLayout'
import PostDetail from '../components/PostDetail'
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch, getPostByCreator } from '../actions/post'
import UserProfile from '../components/UserProfile'
const Posts = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch();

    const { posts, isLoading } = useSelector((state) => state.post)

    useEffect(() => {
        if (searchTerm !== '') {
            dispatch(getPostsBySearch(searchTerm))

        }
        else {
            dispatch(getPosts())

        }


    }, [searchTerm])


    return (
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
                <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
            </div>
            <div className="h-full">
                <Routes>
                    <Route index element={<MasonryLayout searchTerm={searchTerm} posts={posts} isLoading={isLoading} />}></Route>
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/update-post" element={<CreatePost />} />
                    <Route path="/post/:id" element={<PostDetail />} />
                    {/* <Route path="/user-profile/:id" element={<UserProfile />} /> */}
                </Routes>
            </div>
        </div>
    )
}

export default Posts