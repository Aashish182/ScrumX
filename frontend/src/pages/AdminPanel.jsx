import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { MdCampaign, MdMessage } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";
import { VscFeedback } from "react-icons/vsc";

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);

    return (
        <div className=''>
        <div className='container flex h-[650px] mt-16'>
            <aside className=' bg-gradient-to-br from-purple-100 via-[#f3e8ff] to-[#e9d5ff] w-[500px] min-h-screen pt-5 shadow-md'>
                <div className='m-10 mt-16'>
                    <h1 className='flex justify-center text-purple-500 text-xl font-bold'>{user?.role}</h1>
                    <div className='text-lg text-purple-600 flex mt-2'>Name: {user?.name}</div>
                    <div className='text-lg text-purple-600 flex mt-1'>Email: {user?.email}</div>
                    <div className='mt-6'>
                    <nav className='p-1 gap-2'>
                        <NavLink 
                            to={'AllUsers'} 
                            className={({ isActive }) => isActive 
                                ? "text-purple-700 bg-[#C7D2FE] p-2 rounded-md flex items-center gap-3" 
                                : "text-purple-600 text-lg p-2 hover:bg-[#C7D2FE] rounded-md flex items-center gap-3"}>
                            <FaUser size={20} /> Users
                        </NavLink>
{/*                         
                        <NavLink 
                            to={'AllBlogs'} 
                            className={({ isActive }) => isActive 
                                ? "text-purple-700 bg-[#C7D2FE] p-2 rounded-md flex items-center gap-3" 
                                : "text-purple-600 text-lg p-2 hover:bg-[#C7D2FE] rounded-md flex items-center gap-3"}>
                            <MdCampaign size={20}/> Blogs
                        </NavLink>

                        <NavLink 
                            to={'AllQueries'} 
                            className={({ isActive }) => isActive 
                                ? "text-purple-700 bg-[#C7D2FE] p-2 rounded-md flex items-center gap-3" 
                                : "text-purple-600 text-lg p-2 hover:bg-[#C7D2FE] rounded-md flex items-center gap-3"}>
                            <MdMessage size={20}/> Queries (About Us)
                        </NavLink>

                        <NavLink 
                            to={'AllJobTrends'} 
                            className={({ isActive }) => isActive 
                                ? "text-purple-700 bg-[#C7D2FE] p-2 rounded-md flex items-center gap-3" 
                                : "text-purple-600 text-lg p-2 hover:bg-[#C7D2FE] rounded-md flex items-center gap-3"}>
                            <BsBank2 size={20}/> Job Trends
                        </NavLink>

                        <NavLink 
                            to={'AllFeedbacks'} 
                            className={({ isActive }) => isActive 
                                ? "text-purple-700 bg-[#C7D2FE] p-2 rounded-md flex items-center gap-3" 
                                : "text-purple-600 text-lg p-2 hover:bg-[#C7D2FE] rounded-md flex items-center gap-3"}>
                            <VscFeedback size={20}/> Feedbacks
                        </NavLink> */}
                    </nav>

                    </div>
                </div>
            </aside>
            <main className='w-full min-h-screen p-5 bg-gradient-to-br from-purple-100 via-[#f3e8ff] to-[#e9d5ff]'>
                <Outlet />
            </main>
        </div>
        </div>
    );
};

export default AdminPanel;
