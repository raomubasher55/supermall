import React from 'react'
import { Rings, ThreeCircles } from 'react-loader-spinner'

const Loader = () => {
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white/1  backdrop-blur-sm z-50">
                <div className="relative">
                <Rings
                        visible={true}
                        height="80"
                        width="80"
                        color="#000"
                        ariaLabel="rings-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        </>
    )
}

export default Loader
