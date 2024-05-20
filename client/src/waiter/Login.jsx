import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useWaiterLoginMutation } from '../redux/api/loginApi';


const Login = () => {
    const [toggle, setToggle] = useState(false)
    const [inpData, setInpData] = useState()
    const [loginError, setLoginError] = useState('');

    const [loginWaiter, data,error] = useWaiterLoginMutation()
    const navigate = useNavigate()

    const handelSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(inpData);
            const loginUser = await loginWaiter(inpData).unwrap();
            if (loginUser) {
                navigate(`/dashboard/${loginUser.waiterLogin._id}`)

            }

        } catch (error) {
            console.error(error);
            setLoginError( "Credentials didn't matched");
            setTimeout(() => {
                setLoginError("");
            }, 2500)
        }
    }


    return <>
        <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                        Restaurant Login
                    </h2>
                </div>
                <form onSubmit={handelSubmit} className="space-y-6" >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                autoComplete="email"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-50 dark:placeholder-gray-400"
                                id="email"
                                name="email"
                                required
                                type="email"
                                onChange={e => setInpData({ ...inpData, email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                autoComplete="current-password"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-50 dark:placeholder-gray-400"
                                id="password"
                                name="password"
                                required
                                type={`${toggle ? "text" : "password"}`}
                                onChange={e => setInpData({ ...inpData, password: e.target.value })}
                            />
                            <button
                                className="absolute bottom-1 right-1 h-7 w-7 rounded-md bg-gray-200 p-1 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                                type="button"
                            >
                                <svg
                                    onClick={e => setToggle(!toggle)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                <span className="sr-only">Toggle password visibility</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600"
                            type="submit"

                        >
                            Login
                        </button>
                    </div>
                    <div>
                        <button
                            className="flex w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            type="button"
                        >
                            Default Button
                        </button>
                    </div>
                </form>
                <div className=' text-end text-white'>
                    {loginError}
                </div>
            </div>
        </div>


    </>
}

export default Login