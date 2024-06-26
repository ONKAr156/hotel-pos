import React from 'react'
import { Link } from 'react-router-dom'
import Gif from "../assets/Notfound.gif"

const NotFound = () => {
    return <>
        <section class="bg-gray-900 ">
            <div class="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                <div class="wf-ull lg:w-1/2">
                    <p class="text-sm font-medium text-blue-400">404 error</p>
                    <h1 class="mt-3 text-2xl font-semibold text-white  md:text-3xl">Page not found</h1>
                    <p class="mt-4 text-gray-400">Sorry, the page you are looking for doesn't exist.Here are some helpful links:</p>

                    <div class="flex items-center mt-6 gap-x-3">
                        <Link to={'/'} class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                            Login
                        </Link>
                    </div>
                </div>

                <div class="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                    <img class="w- rounded-full object-contain max-w-lg lg:mx-auto" src={Gif} alt="" />
                </div>
            </div>
        </section>

    </>
}

export default NotFound