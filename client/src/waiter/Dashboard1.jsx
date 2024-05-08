import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Dashboard1 = () => {
    const params = useParams()
    const arr = [
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        },
        {
            id: 4
        },
        {
            id: 5
        },
        {
            id: 6
        },
        {
            id: 7
        },
        {
            id: 8
        },
    ]
    return <>
        <div className="flex flex-col h-screen">
            <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold">ONKAR's Restaurant</h1>
                    <span className="ml-4 text-sm" />
                </div>
                <div className="flex items-center rounded-xl  border-2 p-2">
                    <span>John Doe</span>
                </div>
            </header>
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full">
                    {
                        arr.map(item => <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full">
                            <div className="flex justify-between items-center">
                                <Link to={`/table/${item.id}`} className="text-xl font-bold">Table {item.id}</Link>
                                <span className="px-3 py-2 rounded-full bg-green-500 text-white text-sm">Available</span>
                            </div>
                           
                        </div>)
                    }


                </div>
            </div>
        </div>


    </>
}

export default Dashboard1