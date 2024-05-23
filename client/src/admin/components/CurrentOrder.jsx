import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CurrentOrder = () => {
    const [data, setData] = useState()
    useEffect(() => {
        const handelFetchTableData = async () => {
            try {
                const result = await axios.get("http://localhost:3000/api/waiter/get-all-tables/status")
                if (!result) {
                    return <div> <p>Loading......</p></div>
                } else {
                    setData(result.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        handelFetchTableData()
    }, [])

    console.log(data && data[0]);

    return <>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <div className=' flex items-center flex-wrap  gap-2 '>
            {data && data.map(order => (
                <div key={order._id} className=' items-center bg-slate-400 text-slate-900 p-2 rounded-md ' >
                    <div className='flex justify-between items-center gap-2'>
                        <p> <strong>Table No:</strong> <span className='underline-offset-2'>{order.table}</span></p>
                        <p><strong>Waiter:</strong> John</p>
                    </div>
                    <hr />
                    <div className='p-1'>
                        <div className='flex justify-between items-center gap-2'>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                        </div>
                        <div className='flex justify-between items-center gap-2'>
                            <p><strong>Order Placed:</strong> </p>
                            <p>{new Date(order.orderPlacedTime).toLocaleDateString("en-US", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</p>
                        </div>
                    </div>

                    <hr />
                    <div className='bg-slate-400 text-black my-2  '>
                        <p className='font-semibold'>Items:</p>
                        <ul  >
                            {order.items.map(item => (
                                <li key={item._id}>
                                    {item.cuisine ? (
                                        <span>{item.cuisine.product_name} ({item.cuisine.category}) - {item.quantity} x ₹{item.price}</span>
                                    ) : (
                                        <span>Unknown Item - {item.quantity} x ₹{item.price}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr />
                    <div>
                        <p>Total:000/-</p>
                    </div>

                    <div className='text-end'>
                        <button className='bg-blue-600 text-white p-2 rounded-md'>Print</button>

                    </div>
                </div>
            ))}
        </div>

    </>
}

export default CurrentOrder