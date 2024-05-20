import React, { useState } from 'react';

const Inventory = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [submittedItems, setSubmittedItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [month, setMonth] = useState('');

    const addItem = () => {
        setInventoryItems([...inventoryItems, { itemName: '', price: 0 }]);
    };

    const updateItem = (index, updatedItem) => {
        const updatedItems = inventoryItems.map((item, i) =>
            i === index ? updatedItem : item
        );
        setInventoryItems(updatedItems);
        updateTotal(updatedItems);
    };

    const removeItem = (index) => {
        const updatedItems = inventoryItems.filter((_, i) => i !== index);
        setInventoryItems(updatedItems);
        updateTotal(updatedItems);
    };

    const updateTotal = (items) => {
        const total = items.reduce((acc, curr) => acc + parseFloat(curr.price || 0), 0);
        setTotalAmount(total);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents the default form submit action
        setSubmittedItems(inventoryItems);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-xl font-semibold mb-4">Inventory Management</h2>

            <div className="mb-4">
                <label htmlFor="month" className="block mb-2 text-sm font-medium">Month</label>
                <select
                    id="month"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                >
                    <option value="">Select Month</option>
                    {[...Array(12).keys()].map((monthValue) => (
                        <option key={monthValue} value={monthValue + 1}>
                            {new Date(0, monthValue).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>
            <form onSubmit={handleSubmit}>
                {inventoryItems.map((item, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 mb-3">
                        <input
                            type="text"
                            placeholder="Item Name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={item.itemName}
                            onChange={(e) => updateItem(index, { ...item, itemName: e.target.value })}
                        />
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Price"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={item.price}
                            onChange={(e) => updateItem(index, { ...item, price: e.target.value })}
                        />
                        <button
                            onClick={() => removeItem(index)}
                            className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <button
                    onClick={addItem}
                    className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-3"
                >
                    Add Item
                </button>

                <button
                    type="submit"
                    className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-3"
                >
                    Submit Inventory
                </button>
            </form>

            <h3 className="text-lg font-semibold">Total: ${totalAmount.toFixed(2)}</h3>
        </div>
    );
}

export default Inventory;