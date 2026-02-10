// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { CheckCircle, AlertTriangle, Clock } from "lucide-react";
// // import SideBar from "../components/Sidebar";
// // import SummaryApi from "../common";
// // import { useSelector } from "react-redux";

// // const MyTasks = () => {
// //   const isOpen = useSelector((state) => state.sidebar.isOpen);

// //   const [tasks, setTasks] = useState([]);
// //   const [metrics, setMetrics] = useState({});
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchMyTasks();
// //   }, []);

// //   const fetchMyTasks = async () => {
// //     try {
// //       const res = await axios.get(SummaryApi.myTasks.url);

// //       if (res.data.success) {
// //         setTasks(res.data.data.subtasks);
// //         setMetrics(res.data.data.metrics);
// //       }
// //     } catch (err) {
// //       console.error("Failed to load developer tasks", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
// //       <SideBar />

// //       <main className={`flex-1 ${isOpen ? "ml-64" : "ml-20"} p-8 transition-all`}>
// //         <h1 className="text-2xl font-black text-white mb-1">My Tasks</h1>
// //         <p className="text-xs text-gray-500 mb-8">
// //           Static Developer View (ScrumX Demo)
// //         </p>

// //         {/* METRICS */}
// //         <div className="grid grid-cols-3 gap-6 mb-10">
// //           <Metric label="Total Tasks" value={metrics.total} icon={<Clock />} />
// //           <Metric label="Completed" value={metrics.completed} icon={<CheckCircle />} />
// //           <Metric label="Blocked" value={metrics.blocked} danger icon={<AlertTriangle />} />
// //         </div>

// //         {/* TASK TABLE */}
// //         <div className="bg-[#111827] rounded-3xl border border-white/5 overflow-hidden">
// //           <table className="w-full">
// //             <thead className="bg-black/20 text-[10px] uppercase text-gray-500">
// //               <tr>
// //                 <th className="px-8 py-4">Task</th>
// //                 <th className="px-8 py-4">Hours</th>
// //                 <th className="px-8 py-4">Status</th>
// //                 <th className="px-8 py-4">Progress</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-white/5">
// //               {tasks.map(task => (
// //                 <tr key={task._id} className="hover:bg-white/[0.03]">
// //                   <td className="px-8 py-5 text-sm">{task.title}</td>
// //                   <td className="px-8 py-5 text-xs text-blue-400 font-mono">
// //                     {task.estimated_hours}h
// //                   </td>
// //                   <td className="px-8 py-5">
// //                     <StatusBadge status={task.status} />
// //                   </td>
// //                   <td className="px-8 py-5">
// //                     <ProgressBar percent={task.percent_complete || 0} />
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>

// //           {tasks.length === 0 && (
// //             <div className="text-center py-10 text-gray-500 text-sm">
// //               No tasks assigned to this developer
// //             </div>
// //           )}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // /* ---------- UI Helpers ---------- */

// // const Metric = ({ label, value, icon, danger }) => (
// //   <div className={`p-6 rounded-3xl border ${danger ? "border-red-500/30" : "border-white/5"} bg-[#111827]"`}>
// //     <div className="flex items-center gap-3 mb-2">
// //       <div className="p-2 bg-white/5 rounded-xl">{icon}</div>
// //       <p className="text-xs uppercase text-gray-500 font-bold">{label}</p>
// //     </div>
// //     <h2 className="text-3xl font-black text-white">{value || 0}</h2>
// //   </div>
// // );

// // const StatusBadge = ({ status }) => {
// //   const map = {
// //     "Done": "bg-green-500/10 text-green-400",
// //     "Blocked": "bg-red-500/10 text-red-400",
// //     "In Progress": "bg-blue-500/10 text-blue-400"
// //   };
// //   return (
// //     <span className={`px-3 py-1 rounded-xl text-[10px] font-black ${map[status]}`}>
// //       {status}
// //     </span>
// //   );
// // };

// // const ProgressBar = ({ percent }) => (
// //   <div className="flex items-center gap-3">
// //     <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
// //       <div className="h-full bg-green-500" style={{ width: `${percent}%` }} />
// //     </div>
// //     <span className="text-[10px] text-gray-400 font-bold">{percent}%</span>
// //   </div>
// // );

// // export default MyTasks;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CheckCircle, AlertTriangle, Clock, Loader2 } from "lucide-react"; // Added Loader2
// import SideBar from "../components/Sidebar";
// import SummaryApi from "../common";
// import { useSelector } from "react-redux";

// const MyTasks = () => {
//   const isOpen = useSelector((state) => state.sidebar.isOpen);

//   const [tasks, setTasks] = useState([]);
//   const [metrics, setMetrics] = useState({ total: 0, completed: 0, blocked: 0 });
//   const [loading, setLoading] = useState(true);
//   const user = useSelector(state => state?.user?.user);

//   useEffect(() => {
//     fetchMyTasks();
//   }, []);

//   const fetchMyTasks = async () => {
//     try {
//         setLoading(true);
        
//         // Check if user exists before calling
//         if (!user?._id) return;

//         const res = await axios({
//         url: SummaryApi.getMyTasks.url,
//         method: SummaryApi.getMyTasks.method, 
//         withCredentials: true, 
//         params: {
//             userId: user?._id 
//         }
//         });

//         if (res.data.success) {
//         setTasks(res.data.data.subtasks || []);
//         setMetrics(res.data.data.metrics || { total: 0, completed: 0, blocked: 0 });
//         }
//     } catch (err) {
//         console.error("ScrumX Error:", err);
//     } finally {
//         setLoading(false);
//     }
// };

//   return (
//     <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
//       <SideBar />

//       <main className={`flex-1 ${isOpen ? "ml-64" : "ml-20"} p-8 transition-all duration-300`}>
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-2xl font-black text-white mb-1">My Tasks</h1>
//             <p className="text-xs text-gray-500 italic">
//               Developer Workflow (ScrumX Engine)
//             </p>
//           </div>
//           {loading && <Loader2 className="animate-spin text-blue-500" size={20} />}
//         </div>

//         {/* METRICS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           <Metric label="Total Tasks" value={metrics.total} icon={<Clock size={18} />} />
//           <Metric label="Completed" value={metrics.completed} icon={<CheckCircle size={18} />} />
//           <Metric label="Blocked" value={metrics.blocked} danger icon={<AlertTriangle size={18} />} />
//         </div>

//         {/* TASK TABLE */}
//         <div className="bg-[#111827] rounded-3xl border border-white/5 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead className="bg-black/20 text-[10px] uppercase text-gray-500 tracking-widest">
//                 <tr>
//                   <th className="px-8 py-4">Task Description</th>
//                   <th className="px-8 py-4">Est. Hours</th>
//                   <th className="px-8 py-4">Status</th>
//                   <th className="px-8 py-4">Completion</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-white/5">
//                 {tasks.map(task => (
//                   <tr key={task._id} className="hover:bg-white/[0.03] transition-colors group">
//                     <td className="px-8 py-5 text-sm font-medium">{task.title}</td>
//                     <td className="px-8 py-5 text-xs text-blue-400 font-mono">
//                       {task.estimated_hours}h
//                     </td>
//                     <td className="px-8 py-5">
//                       <StatusBadge status={task.status} />
//                     </td>
//                     <td className="px-8 py-5">
//                       <ProgressBar percent={task.percent_complete || 0} />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {!loading && tasks.length === 0 && (
//             <div className="flex flex-col items-center justify-center py-20 text-gray-500">
//                <p className="text-sm">No tasks assigned to your queue.</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// /* ---------- UI Helpers (Cleaned up) ---------- */

// const Metric = ({ label, value, icon, danger }) => (
//   <div className={`p-6 rounded-3xl border ${danger ? "border-red-500/20 bg-red-500/5" : "border-white/5 bg-[#111827]"}`}>
//     <div className="flex items-center gap-3 mb-2">
//       <div className={`p-2 rounded-xl ${danger ? "bg-red-500/10 text-red-400" : "bg-white/5 text-gray-400"}`}>
//         {icon}
//       </div>
//       <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">{label}</p>
//     </div>
//     <h2 className="text-3xl font-black text-white">{value || 0}</h2>
//   </div>
// );

// const StatusBadge = ({ status }) => {
//   const styles = {
//     "Done": "bg-green-500/10 text-green-400 border border-green-500/20",
//     "Blocked": "bg-red-500/10 text-red-400 border border-red-500/20",
//     "In Progress": "bg-blue-500/10 text-blue-400 border border-blue-500/20",
//     "Todo": "bg-gray-500/10 text-gray-400 border border-gray-500/20"
//   };
  
//   return (
//     <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${styles[status] || styles["Todo"]}`}>
//       {status}
//     </span>
//   );
// };

// const ProgressBar = ({ percent }) => (
//   <div className="flex items-center gap-3 min-w-[120px]">
//     <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
//       <div 
//         className={`h-full transition-all duration-500 ${percent === 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
//         style={{ width: `${percent}%` }} 
//       />
//     </div>
//     <span className="text-[10px] text-gray-400 font-mono w-8">{percent}%</span>
//   </div>
// );

// export default MyTasks;



import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { CheckCircle, AlertTriangle, Clock, Loader2, Inbox } from "lucide-react";
import SideBar from "../components/Sidebar";
import SummaryApi from "../common";
import { useSelector } from "react-redux";

const MyTasks = () => {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const user = useSelector(state => state?.user?.user);

    const [tasks, setTasks] = useState([]);
    const [metrics, setMetrics] = useState({ total: 0, completed: 0, blocked: 0 });
    const [loading, setLoading] = useState(true);

    // Memoized fetch function to avoid unnecessary recreations
    const fetchMyTasks = useCallback(async () => {
        if (!user?._id) return;

        try {
            setLoading(true);
            const res = await axios({
                url: SummaryApi.getMyTasks.url,
                method: SummaryApi.getMyTasks.method,
                withCredentials: true,
                params: {
                    userId: user._id // Passing ID as param as requested
                }
            });

            if (res.data.success) {
                setTasks(res.data.data.subtasks || []);
                setMetrics(res.data.data.metrics || { total: 0, completed: 0, blocked: 0 });
            }
        } catch (err) {
            console.error("ScrumX Engine Error:", err);
        } finally {
            setLoading(false);
        }
    }, [user?._id]);

    // Triggers whenever the user logs in or Redux hydrates
    useEffect(() => {
        fetchMyTasks();
    }, [fetchMyTasks]);

    return (
        <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
            <SideBar />

            <main className={`flex-1 ${isOpen ? "ml-64" : "ml-20"} p-8 transition-all duration-300`}>
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-black text-white mb-1">My Tasks</h1>
                        <p className="text-xs text-gray-500 italic">
                            Welcome back, {user?.name || "Developer"} — ScrumX Workflow
                        </p>
                    </div>
                    {loading && <Loader2 className="animate-spin text-blue-500" size={20} />}
                </div>

                {/* METRICS SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <Metric label="Total Tasks" value={metrics.total} icon={<Clock size={18} />} />
                    <Metric label="Completed" value={metrics.completed} icon={<CheckCircle size={18} />} />
                    <Metric label="Blocked" value={metrics.blocked} danger icon={<AlertTriangle size={18} />} />
                </div>

                {/* TASK TABLE SECTION */}
                <div className="bg-[#111827] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-black/20 text-[10px] uppercase text-gray-500 tracking-widest">
                                <tr>
                                    <th className="px-8 py-4 border-b border-white/5">Task Description</th>
                                    <th className="px-8 py-4 border-b border-white/5">Est. Hours</th>
                                    <th className="px-8 py-4 border-b border-white/5">Status</th>
                                    <th className="px-8 py-4 border-b border-white/5">Completion</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {tasks.map((task) => (
                                    <tr key={task._id} className="hover:bg-white/[0.03] transition-colors group">
                                        <td className="px-8 py-5 text-sm font-medium text-gray-300 group-hover:text-white">
                                            {task.title}
                                        </td>
                                        <td className="px-8 py-5 text-xs text-blue-400 font-mono">
                                            {task.estimated_hours}h
                                        </td>
                                        <td className="px-8 py-5">
                                            <StatusBadge status={task.status} />
                                        </td>
                                        <td className="px-8 py-5">
                                            <ProgressBar percent={task.percent_complete || 0} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* EMPTY STATE */}
                    {!loading && tasks.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-600">
                            <Inbox size={40} className="mb-4 opacity-20" />
                            <p className="text-sm font-medium">No tasks found in your queue.</p>
                            <p className="text-xs opacity-50">Pending tasks will appear here once accepted.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

/* ---------- SUB-COMPONENTS ---------- */

const Metric = ({ label, value, icon, danger }) => (
    <div className={`p-6 rounded-3xl border transition-all duration-300 ${danger ? "border-red-500/20 bg-red-500/5 hover:bg-red-500/10" : "border-white/5 bg-[#111827] hover:border-white/10"}`}>
        <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-xl ${danger ? "bg-red-500/10 text-red-400" : "bg-white/5 text-blue-400"}`}>
                {icon}
            </div>
            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">{label}</p>
        </div>
        <h2 className="text-3xl font-black text-white">{value || 0}</h2>
    </div>
);

const StatusBadge = ({ status }) => {
    // Aligned with Python "Pending" and common Scrum statuses
    const styles = {
        "Done": "bg-green-500/10 text-green-400 border border-green-500/20",
        "Blocked": "bg-red-500/10 text-red-400 border border-red-500/20",
        "In Progress": "bg-blue-500/10 text-blue-400 border border-blue-500/20",
        "Pending": "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
        "To Do": "bg-gray-500/10 text-gray-400 border border-gray-500/20"
    };

    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${styles[status] || styles["To Do"]}`}>
            {status}
        </span>
    );
};

const ProgressBar = ({ percent }) => (
    <div className="flex items-center gap-3 min-w-[120px]">
        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
                className={`h-full transition-all duration-700 ease-out ${percent === 100 ? 'bg-green-500' : 'bg-blue-600'}`}
                style={{ width: `${percent}%` }}
            />
        </div>
        <span className="text-[10px] text-gray-400 font-mono w-8">{percent}%</span>
    </div>
);

export default MyTasks;