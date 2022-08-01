import React, { useState, useEffect } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import FileBase from 'react-file-base64';
import { categories } from '../utils/categories';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { updatePost } from '../actions/post';
const UpdatePost = ({ post, setIsEdit }) => {
    const dispatch = useDispatch();
    const { title, message, tags, selectedFiles, _id, creator } = post;
    const [postData, setPostData] = useState({ title: title, message: message, tags: tags, selectedFiles: selectedFiles, creator: creator })
    const handleSubmit = async () => {

        console.log(postData.selectedFiles)
        dispatch(updatePost(_id, postData));
        setIsEdit(false)

    }

    return (
        <div className="z-20 absolute flex flex-col justify-center items-center top-0 right-0 bg-blackOverlay w-full h-full">

            <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5 ">
                <div className="flex  relative lg:flex-row flex-col justify-center rounded-lg items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
                    <div className=" absolute top-0 right-0 ">
                        <AiFillCloseCircle fontSize={20} className="cursor-pointer" onClick={() => setIsEdit(false)} />
                    </div>
                    <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
                        {!postData.selectedFiles ? (


                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="flex flex-col justify-center items-center text-center">
                                    <p className="font-bold text-2xl">
                                        <AiOutlineCloudUpload />
                                    </p>
                                    <div className="text-lg"><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFiles: base64 })} /></div>
                                </div>

                                <p className="mt-32 text-gray-400">
                                </p>

                            </div>
                        ) : (
                            <div className="relative h-full">
                                <img
                                    src={postData.selectedFiles}
                                    alt="uploaded-pic"
                                    className="h-full w-full"
                                />
                                <button
                                    type="button"
                                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                                    onClick={() => { setPostData({ ...postData, selectedFiles: null }) }}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        )}

                    </div>

                    <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
                        <input
                            type="text"
                            value={postData.title}
                            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                            placeholder="Add your title"
                            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
                        />
                        <input
                            type="text"
                            value={postData.message}
                            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                            placeholder="Tell everyone what your post is about"
                            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
                        />
                        <div className="flex flex-col">
                            <div>
                                <p className="mb-2 font-semibold text:lg sm:text-xl">Choose Post Category</p>
                                <select
                                    onChange={(e) => {
                                        setPostData({ ...postData, tags: e.target.value });
                                    }}
                                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                                >
                                    <option value="others" className="sm:text-bg bg-white">Select Category</option>
                                    {categories.map((item) => (
                                        <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end items-end mt-5">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                                >
                                    Upload post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UpdatePost