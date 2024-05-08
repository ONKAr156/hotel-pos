import React, {  useState } from 'react'


const Starter = () => {
    const arr = [
        { dish: 'Samosa', price: 50 },
        { dish: 'Pakora', price: 60 },
        { dish: 'Vegetable Cutlet', price: 70 },
        { dish: 'Paneer Tikka', price: 150 },
        { dish: 'Chicken Tikka', price: 180 },
        { dish: 'Tandoori Chicken', price: 200 },
        { dish: 'Fish Amritsari', price: 220 },
        { dish: 'Aloo Chaat', price: 80 },
        { dish: 'Dahi Puri', price: 90 },
        { dish: 'Papdi Chaat', price: 100 }
    ];
    const [data, setData] = useState()
    console.log(data);
    return <>

        {
            arr.map(item => <div className="m-2   bg-gray-800 text-white  rounded-lg shadow-md p-6" key={item.dish}>
                <div className="flex flex-col flex-wrap gap-2 justify-between items-center">
                    <div
                        onClick={e => setData(item)}
                        className='flex flex-wrap'>
                        <div className="text-xl font-bold"> {item.dish}</div>
                        <span className="px-3 py-2 rounded-full bg-slate-700 text-white text-sm mx-2">{item.price}</span>
                    </div>

                </div>
            </div>)
        }


    </>
}

export default Starter