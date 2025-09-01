
import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from "react-toastify";
import { formatDate } from '../utils/dateFormator';
import { FaEye } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const AllQueries = () => {
    
    const [allQueries,setAllQueries] = useState([]);

    const fetchAllQueries = async() =>{
        const fetchData = await fetch(SummaryApi.allQueries.url,{
        method: SummaryApi.allQueries.method,
        credentials: 'include'
        });
        const dataResponse = await fetchData.json();
        console.log("data",dataResponse)
        if(dataResponse.success){
        console.log("success")
        setAllQueries(dataResponse.data)
        }
        if(dataResponse.error){
        toast.error(dataResponse.message)
        }
    }

    useEffect(() => {
        fetchAllQueries()
    },[])

    

    return (
        <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse border border-gray-300 bg-blue-100">
                <thead className="bg-blue-100">
                    <tr className="text-lg text-center border-b-2 border-gray-400">
                        <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">Sr_No.</th>
                        <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">Name</th>
                        <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">Email</th>
                        <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">Phone</th>
                        <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">Message</th>
                        <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">Sent On</th>
                        <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">View</th>
                    </tr>
                </thead>
                <tbody className="text-center border-b-2 border-gray-400">
                    {allQueries.length > 0 &&
                        allQueries.map((el, index) => (
                        <tr key={el.id || index} className="border-b border-gray-300 text-center text-lg hover:bg-gray-100">
                            <td className="border-r text-purple-700 border-gray-300 p-4">{index + 1}</td>
                            <td className="border-r text-purple-700 border-gray-300 p-4">{el.name}</td>
                            <td className="border-r text-purple-700 border-gray-300 p-4">{el.email}</td>
                            <td className="border-r text-purple-700 border-gray-300 p-4">{el.number}</td>
                            <td className="border-r text-purple-700 border-gray-300 p-4">{el.message}</td>
                            <td className="border-r text-purple-700 border-gray-300 p-4">{formatDate(el?.sendedAt)}</td>
                            <td className="border-r text-purple-700 border-gray-300 p-4 justify-items-center">
                                <NavLink className='' to={`/ViewQuery/${el?._id}`} >
                                    <FaEye />
                                </NavLink>
                            </td>
                        </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    )
}

export default AllQueries

