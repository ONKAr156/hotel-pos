import React from 'react'

const Beverages = () => {
    const arr = [
        { drink: 'Masala Chai', price: 50 },
        { drink: 'Lassi', price: 70 },
        { drink: 'Mango Lassi', price: 80 },
        { drink: 'Thandai', price: 90 },
        { drink: 'Badam Milk', price: 100 },
        { drink: 'Rose Sherbet', price: 60 },
        { drink: 'Chaas (Buttermilk)', price: 40 },
        { drink: 'Filter Coffee', price: 60 },
        { drink: 'Jaljeera', price: 50 },
        { drink: 'Nimbu Pani', price: 40 },
        { drink: 'Water Bottel', price: 20 },
    ];


    return <>
        {
            arr.map(item => <div className="m-2  bg-gray-800 text-white  rounded-lg shadow-md p-6">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="text-xl font-bold"> {item.drink}</div>
                    <span className="px-3 py-2 rounded-full bg-slate-700 text-white text-sm mx-2">{item.price}</span>
                </div>
            </div>)
        }


    </>
}

export default Beverages