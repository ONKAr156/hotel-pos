import React, {  useState } from 'react'

const MainCourse = () => {
    const arr = [
        { dish: 'Butter Chicken', price: 250 },
        { dish: 'Palak Paneer', price: 220 },
        { dish: 'Dal Makhani', price: 200 },
        { dish: 'Chicken Biryani', price: 280 },
        { dish: 'Paneer Tikka Masala', price: 230 },
        { dish: 'Rogan Josh', price: 270 },
        { dish: 'Chole Bhature', price: 180 },
        { dish: 'Mutton Curry', price: 300 },
        { dish: 'Fish Curry', price: 260 },
        { dish: 'Aloo Gobi', price: 190 }
    ];

    const [data, setData] = useState()
    return <>
        {
            arr.map(item => <div className="m-2  bg-gray-800 text-white  rounded-lg shadow-md p-6 cursor-pointer">
                <div
                    onClick={e => setData({ ...data, price: item.price })}
                    className="flex flex-wrap justify-between items-center">
                    <div className="text-xl font-bold"> {item.dish}</div>
                    <span className="px-3 py-2 rounded-full bg-slate-700 text-white text-sm mx-2">{item.price}</span>
                </div>
            </div>)
        }
       

    </>
}

export default MainCourse