import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CreatePost from '../components/CreatePost'
const Posts = () => {
    return (
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
                <Navbar />
            </div>
            <div className="h-full">
                <Routes>

                    <Route path="/create-post" element={<CreatePost />} />
                </Routes>
            </div>
        </div>
    )
}

export default Posts