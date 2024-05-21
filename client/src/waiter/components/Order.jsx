import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetTableOrderQuery } from '../../redux/api/OrderApi'

const Order = () => {
    const params = useParams()
    const [itemCount, setItemCount] = useState(1)
    const wData = useSelector(state => state.waiterData)
    const name = wData.waiterData.waiterLogin.name
    let initialItemCount = 1;
    const { data: orderData } = useGetTableOrderQuery(params.id)
    useEffect(() => {
        if (orderData) {
            console.log('Order data updated:', orderData);
        }

    }, [orderData])
    // console.log(orderData);


    return <>
        <div className='flex flex-col justify-start h-full  '>

            <div className=''>
                <h2 className='text-center mb-2 '>ONKAR'S Resturant</h2>
                <div className='flex justify-between items-center opacity-65'>
                    <p> {new Date().toLocaleDateString()}
                    </p>
                    <p>{new Date().toLocaleTimeString()}</p>
                </div>
                <h3 className="text-xl font-bold opacity-65">Order Details</h3>
                <hr />
                <div className="mt-2 opacity-85">
                    <div className="flex justify-between">
                        <span>Waiter Name:</span>
                        <span>{name}</span>

                    </div>
                    <div className="flex justify-between">
                        <span className='font-semibold'>Table number:</span>
                        <span>{params.id}</span>
                    </div>
                </div>
                <hr />
            </div>

            <div className=' flex-1 max-h-fit w-full bg-slate-950  mt-2'>

                {
                    orderData && orderData[0] && orderData[0].items.map(item => <div className='flex justify-center items-center my-2 p-1 gap-1 w-full bg-slate-700 hover:bg-slate-800 text-white rounded-md cursor-pointer'>
                        <div className='w-2/3'>
                            <p className='text-center font-bold text-white'>{item.cuisine.product_name}</p>

                        </div>
                        <div className='text-center w-1/3'>
                            <button onClick={e => setItemCount(itemCount - 1)} className='bg-slate-400 text-white mx-1 px-1 rounded-sm'><i class="bi bi-dash"></i></button>
                            <span className=' text-white  mx-1 '>{item.quantity}</span>
                            <button onClick={e => setItemCount(itemCount + 1)} className='bg-slate-400 text-white  mx-1 px-1 rounded-sm'><i class="bi bi-plus"></i></button>
                        </div>
                    </div>)
                }



                {/* <div className='flex justify-center items-center my-2 p-1 gap-1 w-full bg-slate-700 hover:bg-slate-800 text-white rounded-md cursor-pointer'>
                    <div className='w-2/3 text-center'>
                        <p className=' font-bold text-white'>Roti</p>

                    </div>
                    <div className='text-center w-1/3'>
                        <button onClick={e => setItemCount(itemCount - 1)} className='bg-slate-400 text-white mx-1 px-1 rounded-sm'><i class="bi bi-dash"></i></button>
                        <span className=' text-white  mx-1 '>{itemCount}</span>
                        <button onClick={e => setItemCount(itemCount + 1)} className='bg-slate-400 text-white  mx-1 px-1 rounded-sm'><i class="bi bi-plus"></i></button>
                    </div>
                </div> */}
            </div>


            <div>

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