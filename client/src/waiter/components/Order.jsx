import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Order = () => {
    const params = useParams()
    const [currDate, setCurrDate] = useState()



    return <>
        <div className='flex flex-col justify-between h-full  '>
            <div>
                <h2 className='text-center mb-2'>ONKAR'S Resturant</h2>
                <div className='flex justify-between items-center'>
                    <p> {new Date().toLocaleDateString()}
                    </p>
                    <p>{new Date().toLocaleTimeString()}</p>
                </div>
                <h3 className="text-xl font-bold ">Order Details</h3>
                <hr />
                <div className="space-y-4 mt-4">
                    <div className="flex justify-between">
                        <span>Waiter Name:</span>
                        <span>John Doe</span>

                    </div>
                    <div className="flex justify-between">
                        <span className='font-semibold'>Table number</span>
                        <span>{params.id}</span>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <p>Total: 000/-</p>
                    <p>GST 18%: 00000/-</p>
                    <h2> Grand Total: 00000/-</h2>
                </div>
                <div className='border-t-2 mt-2 flex justify-center items-center '>
                    <p className='font-medium'>Payment :</p>
                    <div className='text-end flex mt-2'>
                        <button className='bg-gray-800 px-3 py-1 text-white mx-2'>Cash</button>
                        <button className='bg-gray-800 px-3 py-1 text-white mx-2'>UPI</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Order