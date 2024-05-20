import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const AddCuisines = () => {

    const menu = [
        {
            category: 'Starter'
        },
        {
            category: 'MainCourse'
        },
        {
            category: 'Beverage'
        },
        {
            category: 'Dessert'
        },
    ]


    const [category, setCategory] = useState("Starter")
    const [cuisineTable, setCuisineTable] = useState()
    const [editProductId, setEditProductId] = useState("");
    const [refreshData, setRefreshData] = useState(false);

    const [formData, setFormData] = useState({
        product_name: "",
        category: "",
        price: 0
    });

    const [editFormData, setEditFormData] = useState({
        product_name: "",
        category: "",
        price: 0
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setEditFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(formData);
            const result = await axios.post("http://localhost:3000/api/admin/add-new-item", formData)
            if (result.status === 201) {
                toast.success("Cuisine added success!!")
                setRefreshData(prev => !prev);
                setFormData({
                    category: "",
                    price: "",
                    product_name: ''
                })
            }
        } catch (error) {
            console.log(error);
        }

    };

    const handelDeleteProduct = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:3000/api/admin/delete-item/${id}`)
            if (result.status === 200) {
                setRefreshData(prev => !prev);
                toast.success("Item deleted successfully")
            }
        } catch (error) {
            toast.error(error)
            console.log(error);
        }
    }

    const handelUpdateProduct = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.put(`http://localhost:3000/api/admin/update-item/${editProductId}`, editFormData)
            if (result.status === 200) {
                toast.success("Product updated successfully");
                setRefreshData(prev => !prev);
            }
        } catch (error) {
            console.error(error);
            toast.error('Error updating product');
        }
    };



    useEffect(() => {

        const handelSelectCategory = async () => {
            const endPoint = category === "Starter" ? "starter" : category === "MainCourse" ? "main-course" : category === "Bevrages" ? "beverage" : category === "Desserts" ? "dessert" : "starter"
            try {
                const result = await axios.get(`http://localhost:3000/api/waiter/fetch-items/${endPoint}`)
                setCuisineTable(result.data)
            } catch (error) {
                console.log(error);
            }
        }
        handelSelectCategory()


    }, [category, refreshData])
    console.log(cuisineTable);


    return <>
        <div className='h-full' >
            <h2 className='m-2 font-medium'>Cuisine Details</h2>
            <form className='border rounded-md m-2 flex gap-2 justify-between items-center border-black p-4' onSubmit={handleSubmit}>
                <div className='my-2'>
                    <label for="Pname" className="form-label fw-semibold">Product Name</label>
                    <input name='product_name' value={formData.product_name}
                        onChange={handleInputChange} type="text" className="form-control" id="Pname" placeholder="Enter Product Name" />
                    <div class="valid-feedback">Looks good!</div>
                    <div class="invalid-feedback">Please choose a username.</div>
                </div>

                <div className='my-2'>
                    <label for="category" className="form-label fw-semibold">Category</label>
                    <select className="form-select" name='category' onChange={handleInputChange} id='category'>
                        <option selected value="">Open this select menu</option>
                        {
                            menu && Array.isArray(menu) && menu.map((item, index) => (
                                <option key={index} value={item.category}>{item.category}</option>
                            ))
                        }
                    </select>
                </div>

                <div className='my-2'>
                    <label for="Price" className="form-label fw-semibold">Price</label>
                    <input name='price' value={formData.price}
                        onChange={handleInputChange} type="number" className="form-control" id="Price" placeholder="Enter Product Price" />
                    <div class="valid-feedback">Looks good!</div>
                    <div class="invalid-feedback">Please choose a username.</div>
                </div>

                <div className='mt-4 '>
                    <button type='submit' className='bg-blue-600 p-2 my-2 text-white'>Submit</button>
                </div>
            </form>

            <div class="flex flex-col mt-4">
                <div class="-m-1.5 overflow-x-auto">
                    <div class="p-1.5 min-w-full inline-block align-middle">
                        <div class="overflow-hidden ">
                            <div className='text-end '>
                                <button onClick={e => setCategory("Starter")}
                                    className={`${category === "Starter" ? "bg-blue-800 text-white" : ""} mx-2 p-2 border`}>Starter</button>
                                <button onClick={e => setCategory("MainCourse")}
                                    className={`${category === "MainCourse" ? "bg-blue-800 text-white" : ""} mx-2 p-2 border`}>MainCourse</button>
                                <button onClick={e => setCategory("Bevrages")}
                                    className={`${category === "Bevrages" ? "bg-blue-800 text-white" : ""} mx-2 p-2 border`}>Bevrages</button>
                                <button onClick={e => setCategory("Desserts")}
                                    className={`${category === "Desserts" ? "bg-blue-800 text-white" : ""} mx-2 p-2 border`}>Desserts</button>
                                {/* <p>Higghest and Lowest selling  Filter lagana hai idahr</p> */}

                            </div>
                            <table class="min-w-full divide-y divide-gray-200 p-2">
                                <thead>
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Sr.no</th>
                                        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Price (₹)</th>
                                        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                    {
                                        cuisineTable && cuisineTable.product.map((item, a) => <tr className='text-center' key={item._id}>
                                            <td className=''>{a + 1}</td>
                                            <td className='font-semibold'>{item.product_name}</td>
                                            <td className='font-medium'>{item.price}/-</td>
                                            <td className='pt-2'>
                                                <button
                                                    onClick={e => handelDeleteProduct(item._id)}
                                                    className=' bg-red-500 text-white p-2 mx-2 '>Delete</button>
                                                <button
                                                    onClick={e => setEditProductId(item._id)}
                                                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                    className=' bg-blue-600 text-white p-2 mx-2 '>Edit</button>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>




        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <form onSubmit={handelUpdateProduct}>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='my-2'>
                                <label for="Pname" className="form-label fw-semibold">Product Name</label>
                                <input name='product_name' value={editFormData.product_name}
                                    onChange={handleEditInputChange} type="text" className="form-control" id="Pname" placeholder="Enter Product Name" />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>

                            <div className='my-2'>
                                <label for="category" className="form-label fw-semibold">Category</label>
                                <select className="form-select" name='category' onChange={handleEditInputChange} id='category'>
                                    <option selected value="">Open this select menu</option>
                                    {
                                        menu && Array.isArray(menu) && menu.map((item, index) => (
                                            <option key={index} value={item.category}>{item.category}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className='my-2'>
                                <label for="Price" className="form-label fw-semibold">Price</label>
                                <input name='price' value={editFormData.price}
                                    onChange={handleEditInputChange} type="number" className="form-control" id="Price" placeholder="Enter Product Price" />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </>
}

export default AddCuisines