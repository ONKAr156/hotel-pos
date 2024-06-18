import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/admin/login',
                { email, password },
                { withCredentials: true }
            );

            console.log("Login successful", response.data);

            if (response.status === 200) {
                navigate("/admin-dashboard");
            }

        } catch (error) {
            console.error("Login error", error);
            setError("Invalid email or password");
        }
    };

    return <>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-slate-200 to-slate-400">
            <div className="bg-white p-8  shadow-xl w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

                {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <div className='flex justify-between items-center border px-2'>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 rounded mt-2 focus:outline-none"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="ml-2 focus:outline-none"
                            >
                                {showPassword ?
                                    <i className="bi bi-eye-slash"></i> :
                                    <i className="bi bi-eye"></i>
                                }
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>

    </>
};

export default AdminLogin;