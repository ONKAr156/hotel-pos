import React from 'react'

const Dessert = () => {
    const arr = [
        { dish: 'Gulab Jamun', price: 80 },
        { dish: 'Rasgulla', price: 70 },
        { dish: 'Kheer', price: 100 },
        { dish: 'Rasmalai', price: 90 },
        { dish: 'Jalebi', price: 60 },
        { dish: 'Barfi', price: 120 },
        { dish: 'Gajar Halwa', price: 110 },
        { dish: 'Peda', price: 85 },
        { dish: 'Ladoo', price: 75 },
        { dish: 'Shahi Tukda', price: 130 }
    ];


    return <>
        {
            arr.map(item => <div className="m-2  bg-gray-800 text-white  rounded-lg shadow-md p-6">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="text-xl font-bold"> {item.dish}</div>
                    <span className="px-3 py-2 rounded-full bg-slate-700 text-white text-sm mx-2">{item.price}</span>
                </div>
            </div>)
        }
    </>
}

export default Dessert