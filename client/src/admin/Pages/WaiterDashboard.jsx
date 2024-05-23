import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const WaiterDashboard = () => {
    const params = useParams()

    const [wData, setWData] = useState([])
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        current_address: '',
        permanent_address: '',
        dob: '',
        Wsalary: 0,
        phone: 0,
        aadhar: 0
    });
    const [wDelete, setWDelete] = useState()
    const navigate = useNavigate()

    console.log(params.id);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/admin/fetch-waiter/${params.id}`);
                setWData(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [params.id, formData]);
    const waiterInfo = wData.waiter || {};

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(formData);
            const data = await axios.post(`http://localhost:3000/api/admin/update-waiter/${params.id}`, formData)

            if (data.status === 200) {
                toast.success("Waiter Updated success!!")
            }
        } catch (error) {
            console.log(error);
        }

    };

    const handelDeleteWaiter = async () => {
        try {
            console.log(wDelete);
            const data = await axios.delete(`http://localhost:3000/api/admin/remove-waiter/${params.id}`)

            if (data.status === 200) {
                toast.success("Waiter deleted success!!")
                navigate('/admin-dashboard')
            }
        } catch (error) {
            console.log(error);
        }
    }



    return <>
        <div className="container mx-auto p-4">
            <p className='text-center p-2 font-semibold text-lg md:text-xl'>Waiter Dashboard</p>
            <div className="bg-white shadow rounded-lg p-6">
                <div className='text-start my-2'>
                    <button onClick={e => setWDelete(params.id)}
                        data-bs-toggle="modal" data-bs-target="#deleteModal"
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700">
                        Delete Waiter
                    </button>
                </div>


                {waiterInfo.firstName ? <div className=" p-6 rounded-lg shadow-inner">

                    <h2 className="text-lg md:text-xl font-semibold mb-4">Contact details</h2>
                    <div className='flex flex-wrap justify-between bg-slate-200 p-2 my-2 items-center rounded-md'>
                        <div>
                            <div className="mb-4">
                                <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Name</span>
                                <span className="block text-gray-900">{waiterInfo.firstName} {waiterInfo.lastName}</span>
                            </div>
                            <div className="mb-4">
                                <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Phone</span>
                                <span className="block text-gray-900">{waiterInfo.phone}</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email</span>
                            <span className="block text-gray-900">{waiterInfo.email}</span>
                        </div>
                        <div className="mb-4">
                            <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Current Address</span>
                            <span className="block text-gray-900">{waiterInfo.current_address}</span>
                        </div>
                        <div className="mb-4">
                            <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Onboarding Date</span>
                            <span className="block text-gray-900">{new Date(waiterInfo.createdAt).toLocaleDateString("en-US", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                            </span>
                        </div>
                    </div>

                    <h2 className="text-lg md:text-xl font-semibold my-4">Major Details</h2>
                    <div className='flex flex-wrap justify-between items-center bg-slate-300 p-2 my-2 rounded-md'>
                        <div>
                            <div className="mb-4">
                                <span className="block uppercase tracking-wide  text-xs font-bold mb-2">Date-of-birth</span>
                                <span className="block text-gray-900">{waiterInfo.dob}</span>
                            </div>
                            <div className="mb-4">
                                <span className="block uppercase tracking-wide  text-xs font-bold mb-2">Salary</span>
                                <span className="block font-medium p-2 border-2 border-dashed text-gray-900">{waiterInfo.Wsalary}/-</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="block uppercase tracking-wide  text-xs font-bold mb-2">Aadhar Number</span>
                            <span className="block text-gray-900">{waiterInfo.aadhar}</span>
                        </div>
                        <div className="mb-4">
                            <span className="block uppercase tracking-wide  text-xs font-bold mb-2">Permanent Address</span>
                            <span className="block text-gray-900">{waiterInfo.permanent_address}</span>
                        </div>
                        <div className="mb-4">
                            <span className="block uppercase tracking-wide  text-xs font-bold mb-2">Updated At</span>
                            <span className="block text-gray-900">{new Date(waiterInfo.updatedAt).toLocaleDateString("en-US", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</span>
                        </div>
                    </div>

                </div> : <p>Loading...</p>}


                <div className="text-end p-4">

                    <button
                        data-bs-toggle="modal" data-bs-target="#editModal"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                        Edit
                    </button>
                </div>
            </div>
        </div>

        {/* Edit waiter data */}

        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <form onSubmit={handleSubmit}>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Waiter data</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <label for="Fname" className="form-label fw-semibold">First name</label>
                                <input name='firstName' value={formData.firstName}
                                    onChange={handleInputChange} type="text" className="form-control" id="Fname" placeholder="Enter Employee's First Name" />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div>
                                <label for="lname" className="form-label fw-semibold">Last name</label>
                                <input name='lastName' value={formData.lastName}
                                    onChange={handleInputChange} type="text" className="form-control" id="lname" placeholder="Enter Employee's Last Name" />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div>
                                <label for="email" className="form-label fw-semibold">Email</label>
                                <input name='email' value={formData.email}
                                    onChange={handleInputChange} type="text" className="form-control" id="email" placeholder="Enter Employee's Email" />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div>
                                <label for="phone" className="form-label fw-semibold">Phone</label>
                                <input name='phone' value={formData.phone}
                                    onChange={handleInputChange} type="tel" className="form-control" id="phone" placeholder="Enter Employee's Phone Number" />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>


                            <div className=''>
                                <label for="aadhar" className="form-label fw-semibold">Aadhar Number</label>
                                <input name='aadhar' value={formData.aadhar}
                                    onChange={handleInputChange} type="tel" className="form-control" id="aadhar" placeholder="Enter Employee's Aadhar Number" />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>

                            <div className=''>
                                <label for="dob" className="form-label fw-semibold">Date of birth</label>
                                <input name='dob' value={formData.dob}
                                    onChange={handleInputChange} type="date" className="form-control" id="dob" placeholder="Enter Employee's Age" />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>

                            <div className=''>
                                <label for="Wsalary" className="form-label fw-semibold">Waiter Salary</label>
                                <input name='Wsalary' value={formData.Wsalary}
                                    onChange={handleInputChange} type="number" className="form-control" id="Wsalary" placeholder="Enter Salary in months" />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>

                            <div className=' '>
                                <label for="current_address" className="form-label fw-semibold">Current Address</label>
                                <input name='current_address' value={formData.current_address}
                                    onChange={handleInputChange} type="text" className="form-control" id="current_address" placeholder="Enter Employee's Current Address" />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>

                            <div className=' '>
                                <label for="permanent_address" className="form-label fw-semibold">Permanent Address</label>
                                <input name='permanent_address' value={formData.permanent_address}
                                    onChange={handleInputChange} type="text" className="form-control" id="permanent_address" placeholder="Enter Employee's Permanent Address" />
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

        {/* Delete waiter */}

        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <h2>Are you sure you want to delete this waiter permanently ??</h2>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handelDeleteWaiter} type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    </>
};

export default WaiterDashboard;
