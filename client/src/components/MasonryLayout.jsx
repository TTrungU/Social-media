import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../actions/post'
import Masonry from 'react-masonry-css'
import Post from './Post'
const MasonryLayout = () => {
    const dispatch = useDispatch();

    const { posts } = useSelector((state) => state.post)
    useEffect(() => {

        dispatch(getPosts())
    }, [])

    console.log(posts)
    const breakpointColumnsObj = {
        default: 4,
        3000: 6,
        2000: 5,
        1200: 3,
        1000: 2,
        500: 1,
    };
    return (
        <Masonry breakpointCols={breakpointColumnsObj} className="flex animate-slide-fwd">
            {posts.map((post) =>
                <Post key={post._id} post={post} />


            )}
        </Masonry>
    )
}

export default MasonryLayout