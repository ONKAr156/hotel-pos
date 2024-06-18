import React, { useState } from 'react';
import Home from '../components/Home';
import AddWaiter from '../components/AddWaiter';
import AddCuisines from '../components/AddCuisines';
import AddTables from '../components/AddTables';
import Customer from '../components/Customer';
import Inventory from '../components/Inventory';
import CurrentOrder from '../components/CurrentOrder';
import CompleteOrders from '../components/CompleteOrders';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminDash = () => {
    const [toggle, setToggle] = useState("Home");

    const navigate = useNavigate();

    const handleLogout = async () => { 
        try {
            const result = await axios.post("http://localhost:3000/api/admin/logout", {}, {
                withCredentials: true 
            });
            if (result.status === 200) {
                navigate('/admin-login');
                toast.success("Logout successful");
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Logout failed");
        }
    };

    return <>
        <div className='min-h-screen p-4 bg-slate-200'>
            <h2 className='text-center text-lg font-bold'>Admin Dashboard</h2>

            <div className='grid grid-cols-12 p-2 h-full gap-4 w-full'>
                <div className='col-span-12 md:col-span-2 bg-slate-50 md:h-[20rem] w-full rounded-md shadow-md'>
                    <div className='flex flex-col justify-between h-full cursor-pointer'>
                        <div className='flex md:flex-col justify-between p-1 '>
                            <p
                                className={` ${toggle === "Home" ? "bg-slate-300" : ""} p-1 text-lg rounded-md`}
                                onClick={e => setToggle("Home")}><i className="bi bi-house"></i> Home</p>
                            <p
                                className={` ${toggle === "Waiter" ? "bg-slate-300 " : ""} p-1 text-lg rounded-md`}
                                onClick={e => setToggle("Waiter")}><i className="bi bi-person-add"></i> Waiter</p>
                            <p
                                className={` ${toggle === "Cuisine" ? "bg-slate-300 " : ""} p-1 text-lg rounded-md`}
                                onClick={e => setToggle("Cuisine")}><i className="bi bi-patch-plus-fill"></i> Cuisine</p>
                            <p
                                className={` ${toggle === "Table" ? "bg-slate-300 " : ""} p-1 text-lg rounded-md`}
                                onClick={e => setToggle("Table")}><i className="bi bi-plus-square"></i> Table</p>
                            <p
                                className={` ${toggle === "Order" ? "bg-slate-300 " : ""} p-1 text-lg rounded-md`}
                                onClick={e => setToggle("Order")}><i className="bi bi-cup-hot"></i> Live-Orders</p>
                            <p
                                className={` ${toggle === "PastOrder" ? "bg-slate-300 " : ""} p-1 text-lg rounded-md`}
                                onClick={e => setToggle("PastOrder")}><i className="bi bi-clipboard-check"></i> Past-Order</p>
                            <p
                                className={` ${toggle === "Customer" ? "bg-slate-300 " : ""} p-1 text-lg rounded-md`}
                                onClick={e => setToggle("Customer")}><i className="bi bi-person-walking"></i> Customer</p>
                        </div>

                        <div className='border-t-2 p-2'>
                            <button onClick={handleLogout}>Logout <i className="bi bi-box-arrow-right"></i></button>
                        </div>
                    </div>
                </div>

                <div className='col-span-10 p-2 w-full bg-slate-50 h-full rounded-md shadow-md'>
                    {
                        toggle === "Home" ? <Home />
                            : toggle === "Waiter" ? <AddWaiter />
                                : toggle === "Cuisine" ? <AddCuisines />
                                    : toggle === "Table" ? <AddTables />
                                        : toggle === 'Customer' ? <Customer />
                                            : toggle === "Inventory" ? <Inventory />
                                                : toggle === "Order" ? <CurrentOrder />
                                                    : toggle === "PastOrder" ? <CompleteOrders />
                                                        : <Home />
                    }
                </div>
            </div>
        </div>
    </>
};

export default AdminDash;