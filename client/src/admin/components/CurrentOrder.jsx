import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const CurrentOrder = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {
        const handelFetchTableData = async () => {
            try {
                const result = await axios.get("http://localhost:3000/api/waiter/get-all-tables/status")
                setData(result.data)
            } catch (error) {
                setError(error.response.data);
            }
        }
        handelFetchTableData()
    }, [loading])


    const handelCompleteOrder = async (id) => {
        setLoading(true)
        try {
            const result = await axios.post(`http://localhost:3000/api/admin/order/complete/${id}`)
            if (result.status === 200) {
                toast.success("Order Completed")
            } else {
                console.log(result.response.data)
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    }

    if (loading) {

        return <div className='flex justify-center items-center h-full'> <p>Loading......</p></div>
    }

    if (error) {
        return <div className='flex justify-center items-center h-full font-medium bg-slate-300'>{error.message}</div>
    }


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
                        <p className='font-semibold'>Subtotal:
                            ₹{order.items.reduce((total, item) => {
                                return total + (item.price * item.quantity);
                            }, 0).toFixed(2)}
                        </p>

                        {/* Grand Total calculation including GST */}
                        <p className='font-semibold'>Grand Total (including GST):
                            ₹{order.items.reduce((total, item) => {
                                const itemTotal = item.price * item.quantity;
                                return total + itemTotal;
                            }, 0) * (1 + 18 / 100)}
                        </p>
                    </div>
                    <div className='flex justify-between my-2 border-t-2 border-spacing-2 border-slate-500 border-opacity-50'>
                        <p>Receive payment via :-</p>
                        <div className='my-1'>
                            <button
                                onClick={e => handelCompleteOrder(order._id)}
                                className='bg-green-600 text-slate-100 px-2 py-1 mx-2'>Cash</button>
                            <button
                                onClick={e => handelCompleteOrder(order._id)}
                                className='bg-blue-600 text-slate-100 px-2 py-1 '>UPI</button>

                        </div>
                    </div>
                </div>
            ))}
        </div>

    </>
}

export default CurrentOrder