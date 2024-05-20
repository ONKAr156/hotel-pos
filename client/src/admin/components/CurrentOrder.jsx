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
        <div className=' flex items-center flex-wrap gap-2 '>
            {data && data.map(order => (
                <div key={order._id} className=' items-center bg-slate-400 text-slate-900 p-2 rounded-md ' >
                    <div className='flex justify-between items-center gap-2'>
                        <p> <strong>Table:</strong> {order.table}</p>
                        <p><strong>Waiter:</strong> John</p>
                    </div>
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

                    <hr />
                    <h3>Items:</h3>
                    <ul>
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
            ))}
        </div>

    </>
}

export default CurrentOrder