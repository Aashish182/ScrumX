// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { 
//   Zap, 
//   Target, 
//   Calendar, 
//   CheckCircle2, 
//   AlertCircle, 
//   Loader2,
//   ChevronRight
// } from "lucide-react";
// import SideBar from "../components/Sidebar";
// import SummaryApi from "../common";

// const CurrentSprint = () => {
//   const isOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector((state) => state?.user?.user);

//   const [sprint, setSprint] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [metrics, setMetrics] = useState({ total: 0, completed: 0, progress: 0 });
//   const [loading, setLoading] = useState(true);

//   const fetchSprintData = useCallback(async () => {
//     if (!user?._id) return;
//     try {
//       setLoading(true);
//       const res = await axios({
//         url: SummaryApi.getCurrentSprint.url,
//         method: SummaryApi.getCurrentSprint.method,
//         withCredentials: true,
//         // Passing developer ID to filter tasks
//         params: { userId: user._id } 
//       });

//       if (res.data.success && res.data.data) {
//         setSprint(res.data.data.sprint);
//         setTasks(res.data.data.subtasks || []);
//         setMetrics(res.data.data.metrics || { total: 0, completed: 0, progress: 0 });
//       }
//     } catch (err) {
//       console.error("Sprint Fetch Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [user?._id]);

//   useEffect(() => {
//     fetchSprintData();
//   }, [fetchSprintData]);

//   return (
//     <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200 font-sans">
//       <SideBar />

//       <main className={`flex-1 ${isOpen ? "ml-64" : "ml-20"} p-8 transition-all duration-300`}>
//         {loading ? (
//           <div className="h-full flex items-center justify-center">
//             <Loader2 className="animate-spin text-blue-500" size={40} />
//           </div>
//         ) : sprint ? (
//           <>
//             {/* SPRINT HEADER */}
//             <div className="mb-10">
//               <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
//                 <Zap size={14} fill="currentColor" />
//                 Active Sprint
//               </div>
//               <h1 className="text-4xl font-black text-white mb-4 tracking-tight">
//                 {sprint.name}
//               </h1>
              
//               <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
//                 <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
//                   <Target size={16} className="text-gray-500" />
//                   <span className="text-gray-300">Goal:</span> {sprint.goal}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Calendar size={16} />
//                   <span>Ends: {new Date(sprint.end_date).toLocaleDateString()}</span>
//                 </div>
//               </div>
//             </div>

//             {/* QUICK STATS */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//               <StatCard label="My Tasks" value={metrics.total} />
//               <StatCard label="Done" value={metrics.completed} />
//               <div className="col-span-2 bg-[#111827] p-5 rounded-3xl border border-white/5 relative overflow-hidden">
//                 <p className="text-[10px] uppercase font-bold text-gray-500 mb-2">Sprint Completion</p>
//                 <h2 className="text-2xl font-black text-white mb-2">{metrics.progress}%</h2>
//                 <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
//                   <div 
//                     className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-1000" 
//                     style={{ width: `${metrics.progress}%` }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* TASK LIST */}
//             <div className="space-y-3">
//               <h3 className="text-lg font-bold text-white mb-4">Assigned Subtasks</h3>
//               {tasks.map((task) => (
//                 <div 
//                   key={task._id} 
//                   className="group bg-[#111827] border border-white/5 p-5 rounded-2xl hover:border-blue-500/30 transition-all cursor-pointer"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                       <div className={`p-2 rounded-xl ${task.status === 'Done' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'}`}>
//                         {task.status === 'Done' ? <CheckCircle2 size={20} /> : <Zap size={20} />}
//                       </div>
//                       <div>
//                         <h4 className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">
//                           {task.title}
//                         </h4>
//                         <div className="flex items-center gap-3 mt-1">
//                           <span className="text-[10px] font-mono text-blue-400 bg-blue-400/5 px-2 py-0.5 rounded">
//                             {task.estimated_hours}h Estimate
//                           </span>
//                           <span className="text-[10px] text-gray-500 italic">
//                              {task.percent_complete}% complete
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <ChevronRight size={18} className="text-gray-700 group-hover:text-gray-400 transform group-hover:translate-x-1 transition-all" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <div className="h-full flex flex-col items-center justify-center text-center">
//             <div className="bg-white/5 p-6 rounded-full mb-4">
//               <AlertCircle size={48} className="text-gray-600" />
//             </div>
//             <h2 className="text-xl font-bold text-white mb-2">No Active Sprint</h2>
//             <p className="text-gray-500 max-w-xs text-sm">
//               You aren't currently assigned to an active sprint. Check back later or contact your Scrum Master.
//             </p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// /* --- Helper Component --- */
// const StatCard = ({ label, value }) => (
//   <div className="bg-[#111827] p-5 rounded-3xl border border-white/5">
//     <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">{label}</p>
//     <h2 className="text-3xl font-black text-white">{value}</h2>
//   </div>
// );

// export default CurrentSprint;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Zap, Rocket, Clock, CheckCircle, Timer, BarChart3, ChevronRight } from "lucide-react";
import SideBar from "../components/Sidebar";
import SummaryApi from "../common";

const CurrentSprint = () => {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const user = useSelector((state) => state?.user?.user);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(SummaryApi.getCurrentSprint.url, { params: { userId: user._id }, withCredentials: true });
                if (res.data.success) setData(res.data.data);
            } catch (e) { console.error(e); } finally { setLoading(false); }
        };
        if(user?._id) fetch();
    }, [user]);

    if (loading) return <div className="h-screen bg-[#05070a] flex items-center justify-center text-blue-500 animate-pulse font-black italic">LOADING SCRUMX...</div>;

    return (
        <div className="flex min-h-screen bg-[#05070a] text-slate-300 selection:bg-blue-500/30">
            <SideBar />
            <main className={`flex-1 ${isOpen ? "ml-64" : "ml-20"} p-10 transition-all duration-500`}>
                
                {data ? (
                    <div className="max-w-6xl mx-auto">
                        {/* --- HEADER SECTION --- */}
                        <div className="relative overflow-hidden bg-[#0d1117] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl mb-10">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -mr-20 -mt-20"></div>
                            
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-blue-500/20 rounded-lg"><Rocket size={20} className="text-blue-400" /></div>
                                        <span className="text-xs font-bold tracking-[0.3em] text-blue-500 uppercase">Latest Work</span>
                                    </div>
                                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">{data.sprint.name}</h1>
                                    <p className="text-slate-500 max-w-lg italic font-medium">"{data.sprint.goal}"</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-4xl font-black text-white">{data.metrics.progress}%</div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Sprint Velocity</div>
                                </div>
                            </div>

                            {/* PRECISE PROGRESS BAR */}
                            <div className="relative w-full h-3 bg-white/5 rounded-full mt-10 overflow-hidden border border-white/5">
                                <div 
                                    className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all duration-1000 ease-out" 
                                    style={{ width: `${data.metrics.progress}%` }}
                                />
                            </div>
                        </div>

                        {/* --- STATS GRID --- */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                            <GlassCard icon={<Clock className="text-blue-400" />} label="Time Load" value={`${data.metrics.totalHours}h`} />
                            <GlassCard icon={<Zap className="text-yellow-400" />} label="Active" value={data.metrics.remaining} />
                            <GlassCard icon={<CheckCircle className="text-emerald-400" />} label="Finished" value={data.metrics.done} />
                            <GlassCard icon={<BarChart3 className="text-purple-400" />} label="Focus" value="High" />
                        </div>

                        {/* --- TASK LIST --- */}
                        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-600 mb-6 px-2">Active Operations</h2>
                        <div className="space-y-4">
                            {data.subtasks.map((task, idx) => (
                                <div key={task._id} className="group relative bg-[#0d1117] hover:bg-[#121821] border border-white/5 p-6 rounded-[1.5rem] transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer overflow-hidden">
                                    <div className="absolute left-0 top-0 h-full w-1 bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                                    
                                    <div className="flex items-center justify-between gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="text-slate-700 font-black text-2xl tracking-tighter">0{idx + 1}</div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">{task.title}</h3>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                                        <Timer size={12} /> {task.estimated_hours || 4}h Est.
                                                    </span>
                                                    <span className="text-[10px] text-slate-600 font-mono tracking-tighter">REF: {task._id.slice(-6)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <div className="text-xs font-black text-slate-400">{task.percent_complete}%</div>
                                                <div className="w-16 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                                                    <div className="h-full bg-blue-500" style={{ width: `${task.percent_complete}%` }} />
                                                </div>
                                            </div>
                                            <ChevronRight className="text-slate-800 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-700">
                        <BarChart3 size={64} className="mb-6 opacity-20" />
                        <h2 className="text-xl font-black uppercase tracking-widest">No Active Mission</h2>
                        <p className="text-sm italic opacity-50 mt-2">Check with Scrum Master for new assignments.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

/* --- REUSABLE GLASS CARD --- */
const GlassCard = ({ icon, label, value }) => (
    <div className="bg-[#0d1117] border border-white/5 p-6 rounded-[1.8rem] hover:border-white/10 transition-colors shadow-xl">
        <div className="flex items-center gap-3 mb-3">
            {icon}
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{label}</span>
        </div>
        <div className="text-2xl font-black text-white">{value}</div>
    </div>
);

export default CurrentSprint;