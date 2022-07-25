import React, { useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux';
// import { getPosts, getPostsBySearch } from '../actions/post'

import Masonry from 'react-masonry-css'
import Post from './Post'
import Loading from './Loading';
const MasonryLayout = ({ posts, isLoading }) => {
    // const dispatch = useDispatch();

    // const { posts, isLoading } = useSelector((state) => state.post)

    // useEffect(() => {
    //     if (searchTerm !== '') {
    //         dispatch(getPostsBySearch(searchTerm))

    //     }
    //     else {
    //         dispatch(getPosts())

    //     }
    //     console.log(posts)

    // }, [searchTerm])


    if (isLoading) {
        return <Loading />
    }

    const breakpointColumnsObj = {
        default: 4,
        3000: 6,
        2000: 5,
        1200: 3,
        1000: 2,
        500: 1,
    };
    return (
        <div>

            {posts?.length !== 0 &&
                <Masonry breakpointCols={breakpointColumnsObj} className="flex animate-slide-fwd">
                    {posts?.map((post) =>
                        <Post key={post?._id} post={post} />

                    )}
                </Masonry>

            }
        </div>
    )
}

export default MasonryLayout