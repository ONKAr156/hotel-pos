import React from 'react'
import Chart from './Chart';
import { useEffect } from 'react';
import EmpTable from './EmpTable';

const Home = () => {



    return <>
        <div className='h-full w-full grid grid-cols-12 p-2'>
            <div className='col-span-12'>
                <div className='flex justify-center items-center my-2 gap-4'>
                    <div className='bg-slate-50 rounded-md mx-1 shadow-md p-4 w-1/3'>
                        <p className='my-1 font-bold text-lg'>Owner Details</p>
                        <div className=''>
                            <p><span className='font-medium'>Name:</span> ONKAR BORGAONKAR </p>
                            <p><span className='font-medium'>Phone:</span> 75777777</p>
                            <p><span className='font-medium'>Address:</span> XYZ, AJBS, 555 STREET </p>
                        </div>
                    </div>

                    <div className='bg-slate-50 rounded-md shadow-md p-2 w-1/3'>
                        <p className='my-1 font-bold text-lg'>Hotel Details</p>
                        <div>
                            <div className='flex justify-between items-center'>
                                <p><span className='font-medium'>Name:</span> ONKAR's Hotel </p>
                                <p><span className='font-medium'>Since:</span> 2012</p>
                            </div>
                            <p><span className='font-medium'>Phone:</span> 75777777</p>
                            <p><span className='font-medium'>GST No:</span> 75777777</p>
                            <p><span className='font-medium'>Address:</span> XYZ, AJBS, 555 STREET </p>
                        </div>
                    </div>

                    <div className='bg-slate-50 shadow-lg p-3 md:p-10 rounded-md w-1/4'>
                        <p>
                            <span className='font-semibold text-lg md:text-lg'> Total Revenue :</span> <span className='font-bold text-xl'>15,62,045/-</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className='col-span-12 md:col-span-4 flex gap-3 md:flex-col mx-2 text-slate-900 '>
                <div className='my-2 bg-slate-300  md:p-10 font-semibold text-lg rounded-lg'>Total LMS : 25000 INR</div>
                <div className='my-2 bg-slate-400  md:p-10 font-semibold text-lg rounded-lg'>Total Employee : 10</div>
                <div className='my-2 bg-slate-500  md:p-10 font-semibold text-lg rounded-lg'>Total Tables : 8</div>

            </div>

            <div className=' my-2 col-span-12 md:col-span-8 p-2 flex justify-center items-center shadow-xl rounded-md'>
                <Chart />

            </div>

            <div className='col-span-12 w-full '>
                <EmpTable />

            </div>
        </div>

    </>
}

export default Home