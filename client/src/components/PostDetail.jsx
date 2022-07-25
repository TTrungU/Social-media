import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom';
import { getPost } from '../actions/post';
import { AiFillHeart } from 'react-icons/ai'
import Loading from './Loading';
import { AiTwotoneDelete } from 'react-icons/ai';

import { commentPost, deleteComment } from '../actions/post'

const PostDetail = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    const { isLoading, post } = useSelector((state) => state.post)
    const [comment, setComment] = useState({ commentBy_id: `${user?._id}`, commentBy_name: `${user?.username}`, content: '' })
    const [comments, setComments] = useState()
    const dispatch = useDispatch();
    const { id } = useParams()
    // console.log(post)
    useEffect(() => {
        dispatch(getPost(id))
        setComments(post?.[0].comment)

    }, [comments])

    // if (isLoading) {
    //     setComments((post?.[0].comment))
    // }


    const addComment = async () => {

        const newComment = await dispatch(commentPost(id, comment))
        setComments(newComment)
        // console.log({ newComment })

    }
    const handleDeleteComment = async (commentId) => {

        const newComment = await dispatch(deleteComment(id, { commentId: commentId }))
        setComments(newComment)
    }
    if (!post) return null

    if (isLoading) return <Loading />

    return (
        <div className="flex xl:flex-row flex-col m-auto bg-white" >
            <div className="flex lg:flex-row flex-col justify-center  bg-gray-100  rounded-t-3xl lg:p-5 p-3 lg:w-4/5  w-full">

                <div className=" flex flex-col mt-5 md:items-start flex-initial " style={{
                    maxWidth: '500px'
                }}>
                    <div className="">
                        <img
                            src={post[0]?.selectedFiles}
                            className="rounded-t-3xl rounded-b-lg"
                        />
                    </div>
                    <div className="flex flex-row">
                        <button className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none">
                            <AiFillHeart />
                        </button>
                        <p></p>

                    </div>
                </div>


                <div className="flex flex-1 flex-col gap-6 lg:pl-5  w-full">
                    <h1 className="text-4xl font-bold break-words mt-3">{post[0]?.title}</h1>
                    <p className="mt-3">{post[0]?.message}</p>

                    <div className="flex flex-row">
                        <p>Up load by  </p>
                        <Link to={`/user-profile/${post[0]?.creator}`} >
                            <p className="font-bold ml-2" >{post[0]?.creator_info[0]?.username}</p>
                        </Link>
                    </div>
                    <h2 className=" text-2xl">Comments</h2>
                    <div className="max-h-370 overflow-y-auto">

                        {post?.[0].comment.map((item) => (
                            <div className="flex gap-2 mt-2 items-center  rounded-lg" key={item._id}>

                                <Link to={`/ user - profile / ${item?.commentBy_id}`} >
                                    <p className="font-bold mr-1">{item.commentBy_name}</p>

                                </Link>
                                <p>{item.content}</p>
                                {user?._id === item?.commentBy_id && (
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteComment(item._id)}
                                        className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                                    >
                                        <AiTwotoneDelete />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {user ? (
                        <div className="flex mt-3 ">
                            <input
                                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                                type="text"
                                placeholder="Add a comment"
                                value={comment.content}
                                onChange={(e) => setComment({ ...comment, content: e.target.value })}
                            />
                            <button
                                type="button"

                                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                                onClick={addComment}
                            >
                                add comment
                            </button>

                        </div>
                    ) : (
                        <p>Please login to comment</p>
                    )}

                </div>
            </div>
        </div>
    )
}

export default PostDetail