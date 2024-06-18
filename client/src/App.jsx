import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './waiter/Login'
import Dashboard1 from './waiter/Dashboard1'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard2 } from './waiter/Dashboard2'
import WaiterDash from './waiter/WaiterDash'
import AdminDash from './admin/Pages/AdminDash'
import WaiterDashboard from './admin/Pages/WaiterDashboard';
import NotFound from './NotFound';
import AdminLogin from './admin/Pages/AdminLogin';


const App = () => {
  return <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard/:id' element={<Dashboard1 />} />
        <Route path='/table/:id' element={<Dashboard2 />} />
        <Route path='/waiter' element={<WaiterDash />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/admin-dashboard' element={<AdminDash />} />
        <Route path='/admin-waiter-dashboard/:id' element={<WaiterDashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>


  </>
}

export default App