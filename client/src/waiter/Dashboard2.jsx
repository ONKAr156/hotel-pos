import React, { useState } from 'react'
import Beverages from "./components/Beverages"
import Dessert from "./components/Dessert"
import MainCourse from "./components/MainCourse"
import Starter from "./components/Starter"
import Order from './components/Order'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const Dashboard2 = () => {
    const [toggle, setToggle] = useState(null)
    const params = useParams()


    return <>
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-6 flex  ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1 h-full ">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative h-44">
                        <h3 className="text-xl font-bold mb-4">Starters</h3>

                        <button
                            onClick={e => setToggle("Starters")}
                            className={` ${toggle === "Starters" ? "bg-blue-600" : "bg-gray-900"} text-white px-4 py-2 rounded-md `}>select</button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative h-44">
                        <h3 className="text-xl font-bold mb-4">Main Course</h3>
                        <button
                            onClick={e => setToggle("Main-Course")}
                            className={` ${toggle === "Main-Course" ? "bg-blue-600" : "bg-gray-900"} text-white px-4 py-2 rounded-md `}>select</button>
                    </div>


                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative h-44">
                        <h3 className="text-xl font-bold mb-4">Beverages</h3>
                        <button
                            onClick={e => setToggle("Beverages")}
                            className={` ${toggle === "Beverages" ? "bg-blue-600" : "bg-gray-900"} text-white px-4 py-2 rounded-md `}>select</button>
                    </div>


                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative h-44">
                        <h3 className="text-xl font-bold mb-4">Desserts</h3>

                        <button
                            onClick={e => setToggle("Desserts")}
                            className={` ${toggle === "Desserts" ? "bg-blue-600" : "bg-gray-900"} text-white px-4 py-2 rounded-md `}>select</button>
                    </div>


                    <div className=' flex flex-wrap my-4 h-full  w-[70rem]'>
                        {
                            toggle === "Desserts" ? <Dessert /> : toggle === "Beverages" ? <Beverages /> : toggle === "Starters" ? <Starter table={params.id} /> : toggle === "Main-Course" ? <MainCourse /> : null
                        }
                    </div>

                </div>

                <div className=" md:block bg-slate-950 text-white  rounded-lg shadow-md p-2 w-1/5 ml-6">
                    <Order />
                </div>
            </div>
        </div >

    </>


// Responsive 70% done 
    // return (
    //     <>
    //         <div className="flex flex-col min-h-screen bg-gray-900">
    //             <div className="flex-1  p-6 flex flex-col lg:flex-row">
    //                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1 ">
    //                     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative h-44">
    //                         <h3 className="text-xl font-bold mb-4">Starters</h3>
    //                         <button
    //                             onClick={e => setToggle("Starters")}
    //                             className={` ${toggle === "Starters" ? "bg-blue-600" : "bg-gray-900"} text-white px-4 py-2 rounded-md `}>select</button>
    //                     </div>

    //                     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative h-44">
    //                         <h3 className="text-xl font-bold mb-4">Main Course</h3>
    //                         <button
    //                             onClick={e => setToggle("Main-Course")}
    //                             className={` ${toggle === "Main-Course" ? "bg-blue-600" : "bg-gray-900"} text-white px-4 py-2 rounded-md `}>select</button>
    //                     </div>

    //                     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative h-44">
    //                         <h3 className="text-xl font-bold mb-4">Beverages</h3>
    //                         <button
    //                             onClick={e => setToggle("Beverages")}
    //                             className={` ${toggle === "Beverages" ? "bg-blue-600" : "bg-gray-900"} text-white px-4 py-2 rounded-md `}>select</button>
    //                     </div>

    //                     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative h-44">
    //                         <h3 className="text-xl font-bold mb-4">Desserts</h3>
    //                         <button
    //                             onClick={e => setToggle("Desserts")}
    //                             className={` ${toggle === "Desserts" ? "bg-blue-600" : "bg-gray-900"} text-white px-4 py-2 rounded-md `}>select</button>
    //                     </div>
    //                     <div className=' block md:flex flex-wrap  h-full  w-full md:w-[70rem] '>
    //                         {
    //                             toggle === "Desserts" ? <Dessert /> : toggle === "Beverages" ? <Beverages /> : toggle === "Starters" ? <Starter table={params.id} /> : toggle === "Main-Course" ? <MainCourse /> : null
    //                         }
    //                     </div>

    //                 </div>

    //                 <div className="hidden md:block bg-slate-950 text-white rounded-lg shadow-md p-2 w-1/5 ml-6">
    //                     <Order />
    //                 </div>
    //             </div>

    //             <div className="block md:hidden bg-slate-950 text-white rounded-lg shadow-md p-2 w-full mt-6">
    //                 <Order />
    //             </div>
    //         </div>
    //     </>
    // );






}
