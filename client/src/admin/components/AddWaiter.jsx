import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const AddWaiter = () => {

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
            const data = await axios.post("http://localhost:3000/api/admin/add-waiter", formData)
            if (data.status === 201) {
                toast.success("Waiter added success!!")
                setFormData({
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
                })
            }

        } catch (error) {
            console.log(error);
        }

    };

    return <>
        <form className='h-full grid grid-cols-12 gap-2 ' onSubmit={handleSubmit}>
            <div className='col-span-12 mb-2 md:mb-4'>
                <p className='font-medium uppercase underline underline-offset-2'>Add waiter</p>
            </div>
            <div className='col-span-12 md:col-span-6'>
                <label for="Fname" className="form-label fw-semibold">First name</label>
                <input name='firstName' value={formData.firstName}
                    onChange={handleInputChange} type="text" className="form-control" id="Fname" placeholder="Enter Employee's First Name" />
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please choose a username.</div>
            </div>

            <div className='col-span-12 md:col-span-6'>
                <label for="lname" className="form-label fw-semibold">Last name</label>
                <input name='lastName' value={formData.lastName}
                    onChange={handleInputChange} type="text" className="form-control" id="lname" placeholder="Enter Employee's Last Name" />
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please choose a username.</div>
            </div>

            <div className='col-span-12 md:col-span-4'>
                <label for="email" className="form-label fw-semibold">Email</label>
                <input name='email' value={formData.email}
                    onChange={handleInputChange} type="text" className="form-control" id="email" placeholder="Enter Employee's Email" />
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please choose a username.</div>
            </div>

            <div className='col-span-12 md:col-span-4'>
                <label for="password" className="form-label fw-semibold">Password</label>
                <input name='password' value={formData.password}
                    onChange={handleInputChange} type="text" className="form-control" id="password" placeholder="Enter Employee's Phone Number" />
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please choose a username.</div>
            </div>
            <div className='col-span-12 md:col-span-4'>
                <label for="phone" className="form-label fw-semibold">Phone</label>
                <input name='phone' value={formData.phone}
                    onChange={handleInputChange} type="tel" className="form-control" id="phone" placeholder="Enter Employee's Phone Number" />
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please choose a username.</div>
            </div>

            <div className='col-span-12 md:col-span-4'>
                <label for="aadhar" className="form-label fw-semibold">Aadhar Number</label>
                <input name='aadhar' value={formData.aadhar}
                    onChange={handleInputChange} type="tel" className="form-control" id="aadhar" placeholder="Enter Employee's Aadhar Number" />
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please choose a username.</div>
            </div>

            <div className='col-span-12 md:col-span-4'>
                <label for="dob" className="form-label fw-semibold">Date of birth</label>
                <input name='dob' value={formData.dob}
                    onChange={handleInputChange} type="date" className="form-control" id="dob" placeholder="Enter Employee's Age" />
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please choose a username.</div>
            </div>

            <div className='col-span-12 md:col-span-4'>
                <label for="Wsalary" className="form-label fw-semibold">Waiter Salary</label>
                <input name='Wsalary' value={formData.Wsalary}
                    onChange={handleInputChange} type="number" className="form-control" id="Wsalary" placeholder="Enter Salary in months" />
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please choose a username.</div>
            </div>

            <div className='col-span-12 '>
                <label for="current_address" className="form-label fw-semibold">Current Address</label>
                <input name='current_address' value={formData.current_address}
                    onChange={handleInputChange} type="text" className="form-control" id="current_address" placeholder="Enter Employee's Current Address" />
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please choose a username.</div>
            </div>

            <div className='col-span-12 '>
                <label for="permanent_address" className="form-label fw-semibold">Permanent Address</label>
                <input name='permanent_address' value={formData.permanent_address}
                    onChange={handleInputChange} type="text" className="form-control" id="permanent_address" placeholder="Enter Employee's Permanent Address" />
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please choose a username.</div>
            </div>

            <div className='col-span-12 mt-16'>
                <div className='text-end'>
                    <button type='submit' className='bg-blue-600 p-2 text-white'>Submit</button>
                </div>
            </div>

        </form>

    </>
}

export default AddWaiter