import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAddOrderMutation } from '../../redux/api/OrderApi'
import io from 'socket.io-client';


const Starter = ({ table }) => {
    const [getData, setGetData] = useState([])
    const [addData, setAddData] = useState()
    const socket = io('http://localhost:3000');

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const starter = await axios.get("http://localhost:3000/api/waiter/fetch-items/starter");
                // console.log(starter);
                setGetData(starter.data.product)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
        socket.on('order_added', (data) => {
            console.log('Order added:', data);

        });
        return () => {
            socket.disconnect();
        };
    }, []);

    const params = useParams()
    const data = useSelector(state => state.waiterData)

    const tableId = params.id
    const waiterId = data.waiterData.waiterLogin._id
    const [addOrder, { isLoading: isAddingOrder }] = useAddOrderMutation()

    const handleAddOrder = async (id) => {

        try {
            const order = await addOrder({
                table: tableId, itemId: id, waiterId: waiterId
            }).unwrap();
            socket.emit('order_added', {
                table: tableId,
                order
            });
            if (order.status === 201) {
                console.log("Item added successfully:", order.data);
            }
        } catch (error) {
            if (error.response) {
                console.log("Error data from server:", error.response.data);
                console.log("Error status from server:", error.response.status);
            } else {
                console.log("Error message:", error.message);
            }
        }
    }


    return <>

        {
            getData && getData.map(item => <div
                onClick={e => handleAddOrder(item._id)}
                className="m-2   bg-gray-800 text-white  rounded-lg shadow-md p-2 md:p-6" key={item.dish}>
                <div className="flex flex-col flex-wrap gap-2 justify-between items-center">
                    <div
                        className='flex flex-wrap'>
                        <div className="text-xl font-bold"> {item.product_name}</div>
                        <span className="px-3 py-2 rounded-full bg-slate-700 text-white text-sm mx-2">{item.price}</span>
                    </div>

                </div>
            </div>)
        }

    </>
}

export default Starter