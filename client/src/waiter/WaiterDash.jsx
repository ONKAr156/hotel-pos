import React from 'react'

const WaiterDash = () => {
    return <>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex flex-col items-center">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-20 h-20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">JD</span>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-gray-900 ">John Doe</h2>
                    <p className="mt-2 text-gray-600 ">john@example.com</p>
                    <p className="mt-2 text-gray-600 ">Joined: May 1, 2022</p>
                </div>
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between px-4 py-4">
                        <p className="text-gray-600 ">Highest Order:</p>
                        <p className="text-gray-900 font-bold ">$125.00</p>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default WaiterDash