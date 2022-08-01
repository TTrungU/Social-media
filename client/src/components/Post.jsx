import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { AiTwotoneDelete } from 'react-icons/ai';
import { deletePost } from '../actions/post'
import { AiOutlineEdit } from 'react-icons/ai'
import { FcLikePlaceholder } from 'react-icons/fc'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { likePost } from '../actions/post';
import UpdatePost from './UpdatePost';
const Post = ({ post }) => {
    const [likes, setLikes] = useState(post?.likes)
    const [isEdit, setIsEdit] = useState(false)
    const [postHovered, setPostHovered] = useState(false);
    const [savingPost, setSavingPost] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?._id;

    const userName = useRef(post?.creator_info?.[0].username);

    const hasLikedPost = likes?.find((like) => like === userId);
    const handleLike = () => {
        if (hasLikedPost) {
            setLikes(likes.filter((id) => id !== userId));
        } else {
            setLikes([...likes, userId]);
        }

        dispatch(likePost(post?._id));
        console.log(post?._id)
    };
    if (!post) return null

    return (<>
        {isEdit && <UpdatePost post={post} setIsEdit={setIsEdit} />}
        <div className="m-2 relative cursor-zoom-in w-auto hover:shadow-lg cursor rounded-lg overflow-hidden transition-all duration-500 ease-in-out"

            onMouseEnter={() => setPostHovered(true)}
            onMouseLeave={() => setPostHovered(false)}
        >
            <img src={post?.selectedFiles} alt="post" className="rounded-lg w-full "
                onClick={() => navigate(`/post/${post?._id}`)}
            />
            {postHovered && (user?._id === post?.creator) && (
                <div className=" flex flex-col justify-between  z-50"
                // style={{ height: '100%' }}
                >
                    <div className="flex items-center justify-between absolute top-0 w-full p-1 pr-2 pt-2 pb-2  "
                    >
                        <div className="flex gap-2 ">
                            <button className="bg-white w-9 h-9 p-2 z-10 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                onClick={() => dispatch(deletePost(post?._id))}
                            >

                                <AiTwotoneDelete />
                            </button>

                        </div>
                        <div className="flex gap-2 ">
                            <button className="bg-white w-9 h-9 p-2 z-10 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                onClick={() => setIsEdit(true)}
                            >
                                <AiOutlineEdit />
                            </button>

                        </div>
                    </div>
                </div>
            )}



            <div className="flex flex-row justify-between ">

                <p className="font-semibold capitalize  p-1  pr-2 pt-2 pb-2">{userName.current}</p>
                {user && (

                    <div className="flex  p-1  pr-2 pt-2 pb-2  ">
                        <p>{likes?.length}</p>
                        <button className="bg-white w-8 h-8 p-1 z-10 rounded-full flex items-center justify-center text-rose-400  text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                            onClick={handleLike}
                        >
                            { } <AiFillHeart />
                        </button>
                    </div>
                )}

            </div>



        </div >
    </>
    )
}

export default Post