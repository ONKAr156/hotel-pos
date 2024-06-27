import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useCompletOrderMutation, useDeleteItemFromOrderMutation, useGetTableOrderQuery, useUpdateItemQuantityMutation } from '../../redux/api/OrderApi'
import { toast } from "react-toastify"
import io from 'socket.io-client';

const Order = () => {
    const params = useParams();
    const [itemCount, setItemCount] = useState(1);
    const [refreshData, setRefreshData] = useState(false);
    const [productId, setProductId] = useState();
    const [orderId, setOrderId] = useState();
    const [loading, setLoading] = useState(false);

    const wData = useSelector(state => state.waiterData);
    const name = wData.waiterData.waiterLogin.name;
    const { data: orderData, refetch } = useGetTableOrderQuery(params.id);
    const [deleteItemFromOrder, { isLoading }] = useDeleteItemFromOrderMutation();
    const [updateItemQuantity] = useUpdateItemQuantityMutation();
    const [completOrder] = useCompletOrderMutation();

    useEffect(() => {
        if (orderData) {
            console.log('Order data updated:', orderData);
        }
    }, [orderData, itemCount]);

    useEffect(() => {
        const socket = io('http://localhost:3000');

        // Listen for orders fetched events
        socket.on('orders_fetched', (data) => {
            if (data.table === params.id) {
                console.log('Orders fetched:', data);
                // Update the state with the new order data
                refetch();
            }
        });

        // Cleanup socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, [params.id, refetch]);

    const handleDelete = async (id) => {
        try {
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
        setLoading(true);
        try {
            const order = await completOrder(id).unwrap();
            console.log("Order Completed successfully:", order);
            toast.success("Order completed successfully");
        } catch (error) {
            if (error.response) {
                console.log("Error data from server:", error.response.data);
                console.log("Error status from server:", error.response.status);
            } else {
                console.log("Error message:", error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className='flex justify-center items-center h-full'> <p>Loading......</p></div>;
    }

    console.log(orderId);

    return (
        <>
            <div className='flex flex-col justify-start h-full'>
                <div>
                    <h2 className='text-center mb-2'>ONKAR'S Restaurant</h2>
                    <div className='flex justify-between items-center opacity-65'>
                        <p>{new Date().toLocaleDateString()}</p>
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

                <div className='flex-1 max-h-fit w-full bg-slate-950 mt-2'>
                    {
                        orderData && orderData[0] && orderData[0].items.map(item =>
                            <div
                                key={item.cuisine._id}
                                className='flex justify-center items-center my-3 p-1 gap-1 w-full bg-slate-700 hover:bg-slate-800 text-white rounded-md cursor-pointer'
                            >
                                <div className='w-[50%]'>
                                    <p className='font-bold text-white'>{item.cuisine.product_name}</p>
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
                                    </button>
                                </div>

                                <div
                                    onClick={() => handleDelete(item.cuisine._id)}
                                    disabled={isLoading}
                                    className='mx-2'
                                >
                                    <button>
                                        <i className='bi bi-trash'></i>
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Order;