import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useWaiterLoginMutation } from '../redux/api/loginApi'
import axios from 'axios'

const Dashboard1 = () => {
    const [tData, setTData] = useState()
    const data = useSelector(state => state.waiterData)
    console.log(data.waiterData.waiterLogin.name);


    useEffect(() => {
        const getAllTables = async () => {
            try {
                const result = await axios.get("http://localhost:3000/api/admin/get-all-tables")
                setTData(result.data)
            } catch (error) {
                console.log(error);
            }
        }
        getAllTables()
    }, [])



    return <>
        <div className="flex flex-col h-screen ">
            <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold">ONKAR's Restaurant</h1>
                    <span className="ml-4 text-sm" />
                </div>
                <div className="flex items-center   ">
                    <span className=' border-2 rounded-xl  p-2 '>{data.waiterData.waiterLogin.name}</span>
                </div>
            </header>
            <hr />
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full">
                    {
                        tData && tData.map(item => <Link to={`/table/${item.id}`} className="bg-white  rounded-lg shadow-md p-6 h-full">
                            <div className="flex justify-between items-center ">
                                <div className="text-xl font-bold">Table {item.id}</div>
                                <span className={`${item.currStatus === "vacant" ? "bg-green-500" : "bg-blue-600"}   px-3 py-2 rounded-full  text-white text-sm`}>{item.currStatus}: {item.capacity}</span>
                            </div>


                        </Link>)
                    }


                </div>
            </div>
        </div>


    </>
}

export default Dashboard1