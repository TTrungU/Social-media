import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CreatePost from '../components/CreatePost'
import MasonryLayout from '../components/MasonryLayout'
const Posts = () => {
    return (
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
                <Navbar />
            </div>
            <div className="h-full">
                <Routes>
                    <Route path="/" element={<MasonryLayout />}></Route>
                    <Route path="/create-post" element={<CreatePost />} />
                </Routes>
            </div>
        </div>
    )
}

export default Posts