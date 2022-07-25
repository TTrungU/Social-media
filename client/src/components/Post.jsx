import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { AiTwotoneDelete } from 'react-icons/ai';
import { deletePost } from '../actions/post'
import { AiOutlineEdit } from 'react-icons/ai'
import UpdatePost from './UpdatePost';
const Post = ({ post }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [postHovered, setPostHovered] = useState(false);
    const [savingPost, setSavingPost] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id, title, creator_info, like, selectedFiles, creator } = post
    const user = JSON.parse(localStorage.getItem('profile'));



    return (<>
        {isEdit && <UpdatePost post={post} setIsEdit={setIsEdit} />}
        <div className="m-2 relative cursor-zoom-in w-auto hover:shadow-lg cursor rounded-lg overflow-hidden transition-all duration-500 ease-in-out"

            onMouseEnter={() => setPostHovered(true)}
            onMouseLeave={() => setPostHovered(false)}
        >
            <img src={selectedFiles} alt="post" className="rounded-lg w-full "
                onClick={() => navigate(`/post/${_id}`)}
            />
            {postHovered && (user?._id === post?.creator) && (
                <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
                    style={{ height: '100%' }}>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2 ">
                            <button className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                onClick={() => dispatch(deletePost(_id))}
                            >

                                <AiTwotoneDelete />
                            </button>

                        </div>
                        <div className="flex gap-2 ">
                            <button className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                onClick={() => setIsEdit(true)}
                            >
                                <AiOutlineEdit />
                            </button>

                        </div>
                    </div>
                </div>
            )}
            {/* <Link to={`/user-profile/${creator}`} className="flex gap-2 mt-2 items-center">
                <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={postedBy?.image}
                    alt="user-profile"
                />
            </Link> */}



            <p className="font-semibold capitalize">{creator_info?.[0].username}</p>

        </div >
    </>
    )
}

export default Post