import React from 'react'
import {Link} from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div>
            <div className="h-screen w-auto bg-red-400 rounded mt-4 flex flex-col justify-center content-center flex-wrap">
                <p className="font-sans text-white error-text">404</p>
                <p className="text-white font-semibold text-center">Go to home Page! <Link className="underline" to="/">Home Page</Link></p>
            </div>


        </div>
    )
}

export default PageNotFound
