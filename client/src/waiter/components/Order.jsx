import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDeleteItemFromOrderMutation, useGetTableOrderQuery, useUpdateItemQuantityMutation } from '../../redux/api/OrderApi'
import { toast } from "react-toastify"

const Order = () => {
    const params = useParams()
    const [itemCount, setItemCount] = useState(1)
    const [refreshData, setRefreshData] = useState(false);
    const [productId, setProductId] = useState()
    const [orderId, setOrderId] = useState()
    const [loading, setLoading] = useState(false)

    const wData = useSelector(state => state.waiterData)
    const name = wData.waiterData.waiterLogin.name
    const { data: orderData } = useGetTableOrderQuery(params.id)
    const [deleteItemFromOrder, { isLoading }] = useDeleteItemFromOrderMutation()
    const [updateItemQuantity] = useUpdateItemQuantityMutation();





    useEffect(() => {
        if (orderData) {
            console.log('Order data updated:', orderData);
        }

    }, [orderData, itemCount])
    // console.log(orderData);

    const handleDelete = async (id) => {
        try {
            // Invoke the mutation
            const result = await deleteItemFromOrder({ tableId: params.id, itemId: id }).unwrap();
            console.log('Deleted item from order:', result);
        } catch (error) {
            console.log('Failed to delete item:', error);
        }
    };

    const handleQuantityChange = async (newQuantity, itemId) => {
        if (newQuantity < 1) return;

        try {
            await updateItemQuantity({
                table: params.id,
                itemId: itemId,
                newQuantity: newQuantity
            }).unwrap();

            console.log(`Quantity updated for item ID: ${itemId}`);
        } catch (error) {
            console.error('Failed to update item quantity:', error);
        }
    };
    const handelCompleteOrder = async (id) => {
        setLoading(true)
        try {
            const result = await axios.post(`http://localhost:3000/api/waiter/order/complete/${id}`)
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
    console.log(orderId);

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
                {/* <pre>{JSON.stringify(orderData, null, 2)}</pre> */}
                {
                    orderData && orderData[0] && orderData[0].items.map(item =>
                        <div className='flex justify-center items-center my-3 p-1 gap-1 w-full bg-slate-700 hover:bg-slate-800 text-white rounded-md cursor-pointer'>
                            <div className='w-[50%]'>
                                <p className=' font-bold text-white'>{item.cuisine.product_name}</p>
                            </div>
                            <div className='text-center mx-2'>
                                <button
                                    onClick={() => handleQuantityChange(item.quantity - 1, item.cuisine._id)}
                                    className='bg-slate-400 text-white mx-1 px-1 rounded-sm'
                                >
                                    <i className="bi bi-dash"></i>
                                </button>
                                <span className='text-white mx-1'>{item.quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(item.quantity + 1, item.cuisine._id)}
                                    className='bg-slate-400 text-white mx-1 px-1 rounded-sm'
                                >
                                    <i className="bi bi-plus"></i>
                                </button>                             </div>

                            <div
                                onClick={e => handleDelete(item.cuisine._id)} disabled={isLoading}
                                className='mx-2'>
                                <button

                                    className=''><i className='bi bi-trash'></i></button>
                            </div>

                        </div>

                    )
                }
            </div>
            <div>

                <div className='border-t-2 mt-2 flex justify-center items-center '>
                    <div className='text-end flex mt-2'>
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal" className='bg-gray-800 px-3 py-1 text-white mx-2'>Complete</button>
                    </div>
                </div>
            </div>
        </div>







        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h2>Complete the order</h2>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button
                            onClick={e => handelCompleteOrder(orderData[0]._id)}

                            type="button" class="btn btn-primary" data-bs-dismiss="modal">Yes</button>
                    </div>
                </div>
            </div>
        </div>

    </>
}




export default Order