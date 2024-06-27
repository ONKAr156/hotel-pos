import React, { useState, useEffect } from 'react';
import Beverages from "./components/Beverages";
import Dessert from "./components/Dessert";
import MainCourse from "./components/MainCourse";
import Starter from "./components/Starter";
import Order from './components/Order';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

export const Dashboard2 = () => {
    const [toggle, setToggle] = useState(null);
    const [tables, setTables] = useState([]); // Added state to store tables
    const params = useParams();

    useEffect(() => {
        // Connect to the socket.io server
        const socket = io('http://localhost:3000');

        // Listen for the fetch_all_tables event
        socket.on('fetch_all_tables', (data) => {
            console.log('Tables fetched:', data);
            setTables(data.tables);
        });

        // Clean up connection on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-6 block md:flex">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1 h-full">
                        <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative h-22 md:h-44">
                            <h3 className="text-xl font-bold mb-4">Starters</h3>
                            <button
                                onClick={e => setToggle("Starters")}
                                className={` ${toggle === "Starters" ? "bg-blue-600" : "bg-gray-900"} text-white px-4 py-2 rounded-md `}
                            >
                                select
                            </button>
                        </div>

                        <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative h-22 md:h-44">
                            <h3 className="text-xl font-bold mb-4">Main Course</h3>
                            <button
                                onClick={e => setToggle("Main-Course")}
                                className={` ${toggle === "Main-Course" ? "bg-blue-600" : "bg-gray-900"} text-white px-4 py-2 rounded-md `}
                            >
                                select
                            </button>
                        </div>

                        <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative h-22 md:h-44">
                            <h3 className="text-xl font-bold mb-4">Beverages</h3>
                            <button
                                onClick={e => setToggle("Beverages")}
                                className={` ${toggle === "Beverages" ? "bg-blue-600" : "bg-gray-900"} text-white px-4 py-2 rounded-md `}
                            >
                                select
                            </button>
                        </div>

                        <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative h-22 md:h-44">
                            <h3 className="text-xl font-bold mb-4">Desserts</h3>
                            <button
                                onClick={e => setToggle("Desserts")}
                                className={` ${toggle === "Desserts" ? "bg-blue-600" : "bg-gray-900"} text-white px-4 py-2 rounded-md `}
                            >
                                select
                            </button>
                        </div>

                        <div className='md:hidden flex gap-2 bg-slate-900 w-full'>
                            <button
                                onClick={e => setToggle("Starters")}
                                className={` ${toggle === "Starters" ? "bg-blue-600" : "bg-slate-400 text-black"} text-white p-2 rounded-md `}
                            >
                                Starters
                            </button>
                            <button
                                onClick={e => setToggle("Main-Course")}
                                className={` ${toggle === "Main-Course" ? "bg-blue-600" : "bg-slate-400 text-black"} text-white p-2 rounded-md `}
                            >
                                Main-Course
                            </button>
                            <button
                                onClick={e => setToggle("Desserts")}
                                className={` ${toggle === "Desserts" ? "bg-blue-600" : "bg-slate-400 text-black"} text-white p-2 rounded-md `}
                            >
                                Desserts
                            </button>
                            <button
                                onClick={e => setToggle("Beverages")}
                                className={` ${toggle === "Beverages" ? "bg-blue-600" : "bg-slate-400 text-black"} text-white p-2 rounded-md `}
                            >
                                Beverages
                            </button>
                        </div>

                        <div className='flex flex-wrap my-4 h-full md:w-[70rem]'>
                            {toggle === "Desserts" ? <Dessert /> :
                             toggle === "Beverages" ? <Beverages /> :
                             toggle === "Starters" ? <Starter table={params.id} /> :
                             toggle === "Main-Course" ? <MainCourse /> : null}
                        </div>
                    </div>

                    <div className="mt-10 md:mt-0 md:block bg-slate-950 text-white rounded-lg shadow-md p-2 w-full md:w-1/5 md:ml-6">
                        <Order />
                    </div>
                </div>
            </div>
        </>
    );
};