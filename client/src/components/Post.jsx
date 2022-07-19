import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../actions/auth'
import axios from 'axios'
const Post = ({ post }) => {
    const { _id, title, creator_info, like, selectedFiles } = post

    const [creatorData, setCreatorData] = useState()
    // const fetchUser = async () => {
    //     const res = await axios.get(`http://localhost:8000/api/user/${creator}`);
    //     setCreatorData(res.data);
    // };
    // useEffect(() => {
    //     fetchUser();
    // }, [creator]);


    return (
        <div className="m-2 relative cursor-zoom-in w-auto hover:shadow-lg cursor rounded-lg overflow-hidden transition-all duration-500 ease-in-out">
            <img src={selectedFiles} alt="post" className="rounded-lg w-full " />
            {/* <Link to={`/user-profile/${creator}`} className="flex gap-2 mt-2 items-center">
                <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={postedBy?.image}
                    alt="user-profile"
                />
            </Link> */}
            <p className="font-semibold capitalize">{creator_info[0].username}</p>
        </div>
    )
}

export default Post