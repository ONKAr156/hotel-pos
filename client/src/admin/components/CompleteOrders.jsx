import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Lottie from "lottie-react";
import Loader from "../../../assets/Loader.json";

const CompleteOrders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');

    const fetchData = async (page, dateFilter) => {
        setLoading(true);
        try {
            const result = await axios.get(`http://localhost:3000/api/admin/order/previous`, {
                params: { page, dateFilter }
            });
            setData(result.data.orders);
            setTotalPages(result.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page, selectedDate);
    }, [page, selectedDate]);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handlePrintOrder = (order) => {
        setSelectedOrder(order);
    };

    const handleModalClose = () => {
        setSelectedOrder(null);
    };

    const handlePrint = () => {
        const printContent = document.getElementById('printable').innerHTML;
        const printWindow = window.open('', '', 'height=500, width=500');
        printWindow.document.write('<html><head><title>Print Order</title>');
        printWindow.document.write('<style>');
        printWindow.document.write(`
            @media print {
                body * {
                    visibility: hidden;
                }

                #printable, #printable * {
                    visibility: visible;
                }

                #printable {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                }
            }
        `);
        printWindow.document.write('</style>');
        printWindow.document.write('</head><body ><div id="printable">');
        printWindow.document.write(printContent);
        printWindow.document.write('</div></body></html>');
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
        handleModalClose();
    };

    const dateOptions = [
        { label: "Today", value: "today" },
        { label: "Yesterday", value: "yesterday" },
        { label: "Last 7 Days", value: "7days" },
        { label: "Last 15 Days", value: "15days" },
        { label: "Last 30 Days", value: "30days" },
        { label: "Last 60 Days", value: "60days" },
        { label: "Last 90 Days", value: "90days" }
    ];

    if (loading) {
        return (
            <div className='flex justify-center items-center font-semibold h-full'>
                <Lottie animationData={Loader} style={{ height: "20%", width: "20%" }} />
            </div>
        );
    }

    return <>
        <div className="container mx-auto p-4">
            {selectedOrder && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg p-4 rounded-lg shadow-lg relative">
                        <button onClick={handleModalClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">&times;</button>
                        <div id="printable" className="print-content">
                            <div>
                                <div className='text-center'>
                                    <h2 className='text-xl text-center font-bold mb-1'>ONKAR's Hotel</h2>
                                    <p className='text-center'>XYZ, AJBS, 555 STREET</p>
                                    <div className='flex justify-between items-center '  >
                                        <span className='mx-2'><span className='font-semibold'>Phone No:</span> 75777777</span>
                                        <span className='mx-2'><span className='font-semibold'>GST No:</span> 75777777</span>
                                    </div>
                                </div>
                                <hr />
                                <div className='flex justify-between items-center  my-2'>
                                    <p><span className='font-semibold'>Order ID: </span>{selectedOrder._id}</p>
                                    <p><span className='font-semibold'>Table: </span>{selectedOrder.table}</p>
                                </div>
                                <p><span className='font-semibold'>Order Placed: </span>{new Date(selectedOrder.orderPlacedTime).toLocaleString()}</p>
                                <hr />
                                <div className='flex justify-between items-center my-2'>
                                    <p><span className='font-semibold'>Status: </span>{selectedOrder.status}</p>
                                    <p><span className='font-semibold'>Payment Status: </span>{selectedOrder.paymentStatus || "Unknown"}</p>
                                </div>
                                <hr />
                                <div>
                                    <p className='font-semibold'>Items:</p>
                                    <ol className="list-decimal px-4">
                                        {selectedOrder.items.map(item => (
                                            <li key={item._id}>
                                                {item.cuisine ? (
                                                    <span>{item.cuisine.product_name} ({item.cuisine.category}) - {item.quantity} x ₹{item.price}</span>
                                                ) : (
                                                    <span>Unknown Item - {item.quantity} x ₹{item.price}</span>
                                                )}
                                            </li>
                                        ))}
                                    </ol>
                                    <div className='mt-2'>
                                        <p className='font-semibold'>Subtotal: ₹{selectedOrder.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p>
                                        <p className='font-semibold'>Grand Total (including GST): <span className=' my-1'>₹{(selectedOrder.items.reduce((total, item) => total + (item.price * item.quantity), 0) * 1.18).toFixed(2)}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button onClick={handlePrint} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Print</button>
                        </div>
                    </div>
                </div>
            )}

            <div className='flex justify-between items-center m-2'>
                <h2 className="text-2xl font-bold">Previous Orders</h2>
                <div className='flex items-center'>
                    <div>
                        <select className='px-2 py-1 border mx-2'>
                            <option value="">Payment</option>
                            <option value="">Cash</option>
                            <option value="">UPI</option>
                        </select>
                    </div>
                    <div>
                        <select className='p-2 border mx-2' onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate}>
                            <option value="">Select filter</option>
                            {dateOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                        </select>
                    </div>
                </div>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-2 border-b">Table no.</th>
                        <th className="py-2 px-2 border-b">Order ID</th>
                        <th className="py-2 px-8 border-b">Items</th>
                        <th className="py-2 px-2 border-b">Status</th>
                        <th className="py-2 px-2 border-b">Payment type</th>
                        <th className="py-2 px-2 border-b">Order Placed Time</th>
                        <th className="py-2 px-4 border-b">View</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(order => (
                        <tr key={order._id}>
                            <td className="py-2 px-2 border-b text-center">{order.table}</td>
                            <td className="py-2 px-2 border-b text-center">{order._id}</td>
                            <td className="py-2 px-8 border-b">
                                <div className='my-2'>
                                    <p className='font-semibold'>Items:</p>
                                    <ul className="list-disc pl-5">
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
                                    <div className='mt-2'>
                                        <p className='font-semibold'>Subtotal: ₹{order.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p>
                                        <p className='font-semibold'>Grand Total (including GST): <span className='border-2 border-dashed my-1'>₹{(order.items.reduce((total, item) => total + (item.price * item.quantity), 0) * 1.18).toFixed(2)}</span></p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-2 px-2 border-b text-center">{order.status}</td>
                            <td className="py-2 px-2 border-b text-center">{order.paymentStatus || "Unknown"}</td>
                            <td className="py-2 px-2 border-b text-center">{new Date(order.orderPlacedTime).toLocaleString()}</td>
                            <td className="py-2 px-2 border-b text-center">
                                <button className='bg-gray-600 text-white p-2 w-full' onClick={() => handlePrintOrder(order)}>Print</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center items-center mt-4">
                <button className='p-2 border mx-2' onClick={handlePreviousPage} disabled={page <= 1}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button className='p-2 border mx-2' onClick={handleNextPage} disabled={page >= totalPages}>Next</button>
            </div>
        </div>

    </>
}

export default CompleteOrders;
