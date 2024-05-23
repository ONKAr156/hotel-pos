import React, { useState } from 'react'
import Home from '../components/Home'
import AddWaiter from '../components/AddWaiter'
import AddCuisines from '../components/AddCuisines'
import AddTables from '../components/AddTables'
import Customer from '../components/Customer'
import Inventory from '../components/Inventory'
import CurrentOrder from '../components/CurrentOrder'

const AdminDash = () => {
    const [toggle, setToggle] = useState("Home")
    return <>
        <div className='min-h-screen p-4 bg-slate-200'>
            <h2 className='text-center text-lg font-bold'>Admin Dashboard</h2>

            <div className='grid grid-cols-12 p-2 h-full gap-4'>
                <div className='col-span-2 bg-slate-50 h-[20rem] rounded-md shadow-md'>
                    <div className='flex flex-col justify-between p-2 h-full cursor-pointer'>
                        <div className='flex flex-col justify-between  '>
                            <p
                                className={` ${toggle === "Home" ? "bg-slate-300" : ""} p-1 text-lg rounded-md`}
                                onClick={e => setToggle("Home")}><i className="bi bi-house"></i> Home</p>
                            <p
                                className={` ${toggle === "Waiter" ? "bg-slate-300 " : ""} p-1 text-lg rounded-md`}
                                onClick={e => setToggle("Waiter")}><i className="bi bi-person-add"></i> Waiter</p>
                            <p
                                className={` ${toggle === "Cuisine" ? "bg-slate-300 " : ""} p-1 text-lg rounded-md`}
                                onClick={e => setToggle("Cuisine")}><i class="bi bi-patch-plus-fill"></i> Cuisine</p>
                            <p
                                className={` ${toggle === "Table" ? "bg-slate-300 " : ""} p-1 text-lg rounded-md`}
                                onClick={e => setToggle("Table")}><i class="bi bi-plus-square"></i> Table</p>
                            <p
                                className={` ${toggle === "Order" ? "bg-slate-300 " : ""} p-1 text-lg rounded-md`}
                                onClick={e => setToggle("Order")}><i class="bi bi-cup-hot"></i> Live-Orders</p>
                            <p
                                className={` ${toggle === "Customer" ? "bg-slate-300 " : ""} p-1 text-lg rounded-md`}
                                onClick={e => setToggle("Customer")}><i class="bi bi-person-walking"></i> Customer</p>
                        </div>

                        <div className='border-t-2 pt-1'>
                            <p>Logout <i class="bi bi-box-arrow-right"></i></p>
                        </div>
                    </div>
                </div>

                <div className='col-span-10 p-2   bg-slate-50 h-full rounded-md shadow-md'>
                    {
                        toggle === "Home" ? <Home />
                            : toggle === "Waiter" ? <AddWaiter />
                                : toggle === "Cuisine" ? <AddCuisines />
                                    : toggle === "Table" ? <AddTables />
                                        : toggle === 'Customer' ? <Customer />
                                            : toggle === "Inventory" ? <Inventory />
                                                : toggle === "Order" ? <CurrentOrder />
                                                    : <Home />
                    }
                </div>

            </div>

        </div >

    </>
}

export default AdminDash