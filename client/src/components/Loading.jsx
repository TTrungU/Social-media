import React from 'react'
import { TailSpin } from 'react-loader-spinner';
const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <TailSpin
                type="Circles"
                color="#00BFFF"
                height={50}
                width={200}
                className="m-5"
            />

            <p className="text-lg text-center px-2">please wait...</p>
        </div>
    )
}

export default Loading