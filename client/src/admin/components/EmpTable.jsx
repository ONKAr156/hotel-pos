import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
const EmpTable = () => {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [entriesPerPage] = useState(3)
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get("http://localhost:3000/api/admin/fetch-waiter");
                // Include sort and filter logic here in fetchData
                setData(applySortAndFilter(result.data.waiter));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [sortOrder, selectedMonth]);


    const applySortAndFilter = (data) => {
        let newData = [...data];
        // Filter by selectedMonth if one is selected
        if (selectedMonth) {
            newData = newData.filter(
                (d) => new Date(d.createdAt).getMonth() === parseInt(selectedMonth) - 1
            );
        }
        // Then sort newData by salary
        newData.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.Wsalary - b.Wsalary;
            } else {
                return b.Wsalary - a.Wsalary;
            }
        });
        return newData;
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const indexOfLastEntry = currentPage * entriesPerPage
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
    const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry)


    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const nextPage = () => {
        setCurrentPage((prev) => (prev < pageCount ? prev + 1 : prev));
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    };

    // Calculate the total number of pages
    const pageCount = Math.ceil(data.length / entriesPerPage)
    const pageNumbers = []
    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i)
    }
    const fixCost = data.reduce((a, b) => (a + b.Wsalary), 0)
    console.log(fixCost);
    return <>
        <div className="min-w-full bg-white  rounded-md my-6">
            <div className='flex justify-between my-2'>
                <div>
                    <p className='p-1 font-medium border-2 border-dashed '>Total Monthly Salaries: {fixCost}</p>

                </div>

                <div>
                    <select className='mx-2 border p-1' onChange={handleSortChange} value={sortOrder}>
                        <option value="asc">Sort Salary Low-High</option>
                        <option value="desc">Sort Salary High-Low</option>
                    </select>
                    <select className='mx-2 border p-1' onChange={handleMonthChange} defaultValue="">
                        <option value="">Filter by DOJ</option>
                        {[...Array(12).keys()].map((monthValue) => (
                            <option key={monthValue} value={monthValue + 1}>
                                {new Date(0, monthValue).toLocaleString('default', { month: 'long' })}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <table className='w-full h-full mt-4'>
                <thead className="bg-gray-200">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Current Address</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Phone</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Salary</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date of Joining</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {currentEntries && currentEntries.map((row, index) => (
                        <tr className=' hover:bg-slate-400 hover:text-black cursor-pointer' key={index}>
                            <td className="py-2 px-4">{row.firstName} {row.lastName}</td>
                            <td className="p-2">{row.email}</td>
                            <td className="py-2 px-8">{row.current_address}</td>
                            <td className="p-2">{row.phone}</td>
                            <td className="p-2">{row.Wsalary} INR</td>
                            <td className="py-2 px-4"> {new Date(row.createdAt).toLocaleDateString("en-US", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                // hour: '2-digit',
                                // minute: '2-digit'
                            })}</td>
                            <td className="py-2 px-4">
                            <Link to={`/admin-waiter-dashboard/${row._id}`}
                                
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <div className="flex justify-center items-center gap-2 mt-4">
                <button
                    onClick={prevPage}
                    className="p-2 text-sm text-white bg-blue-600 rounded-md "
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {pageCount}
                </span>
                <button
                    onClick={nextPage}
                    className="p-2 text-sm text-white bg-blue-600 rounded-md "
                    disabled={currentPage === pageCount}
                >
                    Next
                </button>
            </div>

        </div>

    </>
}

export default EmpTable