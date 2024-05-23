import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CompleteOrders = () => {
    const [data, setData] = useState()
    useEffect(() => {
        const handelFetchTableData = async () => {
            try {
                const result = await axios.get("http://localhost:3000/api/admin/order/previous")
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

    const arr = [
        { "label": "Today", "date": "2024-05-23" },
        { "label": "1 day ago", "date": "2024-05-22" },
        { "label": "7 days ago", "date": "2024-05-16" },
        { "label": "15 days ago", "date": "2024-05-08" },
        { "label": "30 days ago", "date": "2024-04-23" },
        { "label": "45 days ago", "date": "2024-04-08" },
        { "label": "60 days ago", "date": "2024-03-24" },
        { "label": "90 days ago", "date": "2024-02-23" }
    ]


    return <>
        <div className="container mx-auto p-4">

            <div className='flex justify-between items-center m-2'>
                <h2 className="text-2xl font-bold ">Previous Orders</h2>
                <div>
                    <select  className='p-2 border mx-2' name="" id="">
                        <option value="">Payment</option>
                        <option value="">Cash</option>
                        <option value="">UPI</option>

                    </select>


                    <select className='p-2 border mx-2 ' name="" id="">
                        <option value="">Select filter</option>
                        {
                            arr.map(item => <option>
                                {item.label}
                            </option>)
                        }
                    </select>
                </div>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Order ID</th>
                        <th className="py-2 px-4 border-b">Table</th>
                        <th className="py-2 px-4 border-b">Waiter</th>
                        <th className="py-2 px-4 border-b">Items</th>
                        <th className="py-2 px-4 border-b">Payment type</th>
                        <th className="py-2 px-4 border-b">Order Placed Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(order => (
                        <tr key={order._id}>
                            <td className="py-2 px-4 border-b text-center">{order.table}</td>
                            <td className="py-2 px-4 border-b text-center">{order.waiter}</td>
                            <td className="py-2 px-4 border-b">
                                {order.items.map(item => (
                                    <div key={item._id} className="mb-2">
                                        <span className="font-semibold">{item.cuisine.product_name}</span> (x{item.quantity}) - ${item.price * item.quantity}
                                    </div>
                                ))}
                            </td>
                            <td className="py-2 px-4 border-b text-center">{order.status}</td>
                            <td className="py-2 px-4 border-b text-center">{order.paymentStatus}</td>
                            <td className="py-2 px-4 border-b text-center">{new Date(order.orderPlacedTime).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    </>
}

export default CompleteOrders