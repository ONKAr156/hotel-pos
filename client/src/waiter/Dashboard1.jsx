import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify"

const Dashboard1 = () => {
    const [tData, setTData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const data = useSelector(state => state.waiterData);
    console.log(data.waiterData.waiterLogin.name);

    const navigate = useNavigate()


    const handelLogout = async () => {
        try {
            const result = await axios.post("http://localhost:3000/api/waiter/logout", {}, {
                withCredentials: true,
            })
            if (result.status === 200) {
                navigate('/')
                toast.success("logout success")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getAllTables = async () => {
            try {
                const result = await axios.get("http://localhost:3000/api/admin/get-all-tables");
                setTData(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        getAllTables();
    }, []);

    return (
        <>
            <div className="flex flex-col h-screen">
                <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">ONKAR's Restaurant</h1>

                    <div className="flex items-center flex-col">
                        <div
                            onMouseEnter={() => setToggle(true)}
                            className='border-2 rounded-xl p-2 cursor-pointer'
                        >
                            {data.waiterData.waiterLogin.name}
                        </div>

                        <div
                            onMouseLeave={() => setToggle(false)}
                            className={`w-28 h-12 mt-1 text-end  transition-opacity duration-300 ease-in-out transform 
                                ${toggle ? '  block ' : 'hidden '}`}
                        >
                            <button onClick={() => handelLogout()} className='text-white bg-slate-600 p-2'>Logout</button>
                        </div>
                    </div>
                </header>
                <hr />
                <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full">
                        {tData && tData.map((item) => (
                            <Link to={`/table/${item.id}`} key={item.id} className="bg-white rounded-lg shadow-md p-6 h-full">
                                <div className="flex justify-between items-center">
                                    <div className="text-xl font-bold">Table {item.id}</div>
                                    <span
                                        className={`${item.currStatus === "vacant" ? "bg-green-500" : "bg-blue-600"} px-3 py-2 rounded-full text-white text-sm`}
                                    >
                                        {item.currStatus}: {item.capacity}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard1;