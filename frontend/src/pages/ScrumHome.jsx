


// import React, { useState, useEffect } from "react";
// import { 
//   Search, Bell, Calendar, AlertTriangle, Users, 
//   BarChart3, CheckSquare, MoreVertical, Flag, TrendingUp 
// } from "lucide-react";
// import SideBar from "../components/Sidebar";
// import { useSelector } from "react-redux";
// import { MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
// // import axios from "axios"; // 👈 DB CONNECT: Uncomment for backend
// // import SummaryApi from "../common"; // 👈 DB CONNECT: Uncomment for backend

// const ScrumMasterDashboard = () => {
//   const isOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector((state) => state?.user?.user);

//   /* -----------------------------------------------------------
//      DUMMY DATA (Replace these with DB data later)
//   ----------------------------------------------------------- */
//   const dummyTeams = [
//     { _id: "t1", name: "Team Alpha", project: "E-Commerce App", velocity: "42pts" },
//     { _id: "t2", name: "Team Phoenix", project: "AI Chatbot", velocity: "38pts" },
//     { _id: "t3", name: "Team Cyber", project: "Security Audit", velocity: "25pts" }
//   ];

//   // State to track which team's data we are viewing
//   const [selectedTeam, setSelectedTeam] = useState(dummyTeams[0]);

//   /* -----------------------------------------------------------
//      DATABASE CONNECT LOGIC (Commented for future use)
//   ----------------------------------------------------------- */
//   /*
//   const [teamStats, setTeamStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchScrumData = async () => {
//       if(!selectedTeam) return;
//       try {
//         setLoading(true);
//         // Example: const res = await axios.get(`${SummaryApi.get_team_stats.url}/${selectedTeam._id}`);
//         // if (res.data.success) setTeamStats(res.data.data);
//       } catch (err) { 
//         console.error("Error fetching team data:", err); 
//       } finally { 
//         setLoading(false); 
//       }
//     };
//     fetchScrumData();
//   }, [selectedTeam]); // Re-run whenever the team is changed
//   */

//   const masterStats = [
//     { title: "Team Velocity", value: selectedTeam.velocity, status: "+12% vs last", icon: <TrendingUp className="text-green-400" /> },
//     { title: "Active Blockers", value: "3", status: "Needs Attention", icon: <AlertTriangle className="text-red-400" /> },
//     { title: "Sprint Progress", value: "72%", status: "On Track", icon: <BarChart3 className="text-blue-400" /> },
//     { title: "Bot Submissions", value: "8/12", status: "Daily Standup", icon: <MessageSquare className="text-purple-400" /> },
//   ];

//   return (
//     <div className="flex min-h-screen bg-[#121212] text-white">
//       <SideBar />

//       <main className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
        
//         {/* HEADER SECTION */}
//         <header className="flex items-center justify-between px-6 py-4 bg-[#1b1b1b] border-b border-gray-700">
//           <div>
//             <h1 className="text-2xl font-bold text-green-400">Scrum Control Center</h1>
//             <div className="flex items-center gap-2 mt-1">
//               <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-green-500/30">
//                 Current: {selectedTeam.name}
//               </span>
//               <span className="text-[10px] text-gray-500">•</span>
//               <span className="text-[10px] text-gray-400 italic">{selectedTeam.project}</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-6">
//             {/* TEAM SELECTOR DROPDOWN */}
//             <div className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-2 rounded-lg border border-white/10 hover:border-green-500/50 transition-all shadow-md">
//               <Users size={14} className="text-green-400" />
//               <select 
//                 className="bg-transparent text-xs text-gray-200 outline-none cursor-pointer font-medium"
//                 value={selectedTeam.name}
//                 onChange={(e) => setSelectedTeam(dummyTeams.find(t => t.name === e.target.value))}
//               >
//                 {dummyTeams.map(team => (
//                   <option key={team._id} value={team.name} className="bg-[#1b1b1b]">
//                     {team.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex items-center gap-4 border-l border-gray-700 pl-6">
//               <Bell className="cursor-pointer text-gray-400 hover:text-white transition-colors" size={20} />
//               <MoreVertical className="cursor-pointer text-gray-400 hover:text-white" size={20} />
//             </div>
//           </div>
//         </header>

//         {/* MAIN BODY */}
//         <div className="flex flex-1 overflow-hidden">
          
//           {/* LEFT CONTENT AREA */}
//           <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            
//             {/* STATS ROW */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//               {masterStats.map((card, i) => (
//                 <div key={i} className="bg-[#1f1f1f] rounded-xl p-5 border border-white/5 hover:bg-[#252525] transition-all shadow-lg group">
//                   <div className="mb-3 p-2 w-fit bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
//                     {card.icon}
//                   </div>
//                   <p className="text-xs text-gray-400 font-medium">{card.title}</p>
//                   <h2 className="text-2xl font-bold text-white mt-1">{card.value}</h2>
//                   <div className={`mt-2 text-[10px] font-bold uppercase tracking-wider ${card.title === "Active Blockers" ? "text-red-400" : "text-green-400"}`}>
//                     {card.status}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* TEAM PROGRESS / BURNDOWN CHART */}
//             <div className="p-6 bg-[#1f1f1f] rounded-xl shadow-lg border border-white/5 mb-6">
//               <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-lg font-bold flex items-center gap-2 text-blue-400">
//                   <BarChart3 size={20} /> {selectedTeam.name} - Sprint Burndown
//                 </h2>
//                 <div className="text-[10px] text-gray-500 font-bold uppercase bg-white/5 px-3 py-1 rounded">
//                    Sprint #14 (Current)
//                 </div>
//               </div>
              
//               <div className="h-64 w-full bg-[#181818] rounded-lg border border-dashed border-white/10 flex items-center justify-center relative group">
//                  {/* Decorative bars representing a chart */}
//                  <div className="absolute inset-x-10 bottom-4 flex items-end justify-around h-48 opacity-20 group-hover:opacity-40 transition-opacity">
//                     <div className="w-10 bg-green-500 h-[90%] rounded-t-sm"></div>
//                     <div className="w-10 bg-green-500 h-[75%] rounded-t-sm"></div>
//                     <div className="w-10 bg-green-500 h-[60%] rounded-t-sm"></div>
//                     <div className="w-10 bg-green-500 h-[45%] rounded-t-sm"></div>
//                     <div className="w-10 bg-blue-500 h-[30%] rounded-t-sm animate-pulse"></div>
//                  </div>
//                  <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] relative z-10">
//                    Performance Visualization Module
//                  </p>
//               </div>
//             </div>

//             {/* BOT SUBMISSIONS TABLE */}
//             <div className="bg-[#1f1f1f] rounded-xl border border-white/5 shadow-xl overflow-hidden">
//                <div className="p-4 bg-[#252525] border-b border-white/5 flex justify-between items-center">
//                   <h3 className="text-xs font-bold uppercase tracking-widest text-gray-300">Daily Updates: {selectedTeam.name}</h3>
//                   <button className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded hover:bg-green-500 hover:text-white transition-all">Export Report</button>
//                </div>
//                <table className="w-full text-left text-sm">
//                   <thead className="text-[10px] uppercase text-gray-500 bg-[#121212]/50">
//                     <tr>
//                       <th className="px-6 py-4">Developer</th>
//                       <th className="px-6 py-4">Current Task</th>
//                       <th className="px-6 py-4">Blocker Status</th>
//                       <th className="px-6 py-4">Last Sync</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-white/5">
//                     {[
//                       { name: "John Doe", status: "Dashboard UI", blocker: "None", time: "2m ago", color: "bg-blue-500" },
//                       { name: "Sarah Smith", status: "Auth API", blocker: "Connection Error", time: "15m ago", urgent: true, color: "bg-purple-500" },
//                       { name: "Mike Ross", status: "Unit Testing", blocker: "None", time: "1h ago", color: "bg-orange-500" },
//                     ].map((row, i) => (
//                       <tr key={i} className="hover:bg-white/5 transition-colors group">
//                         <td className="px-6 py-4 flex items-center gap-3">
//                            <div className={`w-7 h-7 rounded-full ${row.color} flex items-center justify-center text-[10px] font-bold`}>
//                               {row.name.charAt(0)}
//                            </div>
//                            <span className="font-medium group-hover:text-green-400 transition-colors">{row.name}</span>
//                         </td>
//                         <td className="px-6 py-4 text-gray-400 text-xs">{row.status}</td>
//                         <td className="px-6 py-4">
//                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${row.urgent ? "bg-red-500/20 text-red-500 border border-red-500/30" : "bg-gray-500/20 text-gray-400 border border-white/10"}`}>
//                              {row.blocker}
//                            </span>
//                         </td>
//                         <td className="px-6 py-4 text-[10px] text-gray-600">{row.time}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                </table>
//             </div>
//           </div>

//           {/* RIGHT SIDEBAR - TEAM FOCUS */}
//           <aside className="w-80 bg-[#1b1b1b] border-l border-gray-700 p-6 hidden xl:flex flex-col gap-8 overflow-y-auto">
            
//             {/* URGENT ALERTS */}
//             <div>
//               <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Urgent Attention</h3>
//               <div className="space-y-4">
//                 <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl">
//                   <div className="flex items-center gap-2 mb-2 text-red-500">
//                     <Flag size={14} fill="currentColor" />
//                     <span className="text-[10px] font-bold uppercase">Critical Blocker</span>
//                   </div>
//                   <p className="text-xs font-bold text-white mb-1">Sarah Smith (Auth API)</p>
//                   <p className="text-[11px] text-gray-400 leading-relaxed italic">"Blocked by database migration delay. Needs immediate sync."</p>
//                   <div className="mt-4 flex gap-2">
//                     <button className="text-[10px] bg-red-600 text-white px-3 py-1.5 rounded font-bold hover:bg-red-500 transition-colors">Resolve</button>
//                     <button className="text-[10px] bg-[#2a2a2a] text-gray-300 px-3 py-1.5 rounded font-bold hover:bg-[#333]">Details</button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* PERFORMANCE SNAPSHOT */}
//             <div>
//               <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">{selectedTeam.name} Health</h3>
//               <div className="space-y-4">
//                 <div className="bg-[#2a2a2a] p-4 rounded-xl border border-white/5">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-xs text-gray-400">Team Capacity</span>
//                     <span className="text-xs font-bold text-blue-400">92%</span>
//                   </div>
//                   <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
//                     <div className="bg-blue-500 h-full w-[92%]" />
//                   </div>
//                 </div>
//                 <div className="bg-[#2a2a2a] p-4 rounded-xl border border-white/5">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-xs text-gray-400">Commitment Reliability</span>
//                     <span className="text-xs font-bold text-green-400">High</span>
//                   </div>
//                   <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
//                     <div className="bg-green-500 h-full w-[85%]" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* UPCOMING EVENTS */}
//             <div className="mt-auto bg-gradient-to-br from-[#1b1b1b] to-[#252525] border border-gray-700 p-5 rounded-xl">
//               <div className="flex gap-3 items-start">
//                 <Calendar size={18} className="text-green-400 shrink-0" />
//                 <div>
//                   <p className="text-sm font-bold text-white">Sprint Review</p>
//                   <p className="text-[11px] text-gray-500 mt-1">Friday, Jan 10 · 2:00 PM</p>
//                   <button className="mt-4 w-full bg-green-600/10 text-green-400 border border-green-500/30 text-[10px] font-bold py-2 rounded uppercase tracking-wider hover:bg-green-600 hover:text-white transition-all">
//                     Generate Agenda
//                   </button>
//                 </div>
//               </div>
//             </div>

//           </aside>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ScrumMasterDashboard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { 
//   Bell, Calendar, AlertTriangle, Users, BarChart3, 
//   CheckSquare, MoreVertical, Flag, TrendingUp,
//   MessageSquare, Clock, Zap, Target, ArrowUpRight
// } from "lucide-react";
// import SideBar from "../components/Sidebar";
// import SummaryApi from "../common";

// const ScrumMasterDashboard = () => {
//   const isOpen = useSelector((state) => state.sidebar.isOpen);
  
//   // -- State Management --
//   const [teams, setTeams] = useState([]);
//   const [selectedTeam, setSelectedTeam] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [dashboardData, setDashboardData] = useState({
//     subtasks: [],
//     sprintInfo: { number: 0, goal: "" },
//     metrics: {
//       velocity: 0,
//       dailyProgress: 0,
//       capacity: 0,
//       totalHours: 0,
//       blockerCount: 0
//     }
//   });

//   // 1. Fetch initial teams
//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const res = await axios.get(SummaryApi.allTeams.url, { withCredentials: true });
//         if (res.data.success) {
//           setTeams(res.data.data);
//           setSelectedTeam(res.data.data[0]);
//         }
//       } catch (err) { console.error("Teams fetch error:", err); }
//     };
//     fetchTeams();
//   }, []);

//   // 2. Calculate Everything whenever a team is selected or data changes
//   useEffect(() => {
//     if (selectedTeam) fetchAndCalculateData();
//   }, [selectedTeam]);

//   const fetchAndCalculateData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${SummaryApi.teamPerformance.url}/${selectedTeam._id}`, { withCredentials: true });
      
//       if (res.data.success) {
//         const { subtasks, sprintPoints, totalTeamMembers } = res.data.data;

//         // --- CALCULATION LOGIC ---
        
//         // A. Daily Progress: (Done Subtasks / Total Subtasks) * 100
//         const totalSubtasks = subtasks.length;
//         const doneSubtasks = subtasks.filter(s => s.status === "Done").length;
//         const progress = totalSubtasks > 0 ? Math.round((doneSubtasks / totalSubtasks) * 100) : 0;

//         // B. Capacity: (Hours assigned / (Members * 6hrs * 10days))
//         const assignedHours = subtasks.reduce((sum, s) => sum + (Number(s.estimatedHours) || 0), 0);
//         const maxCapacity = (totalTeamMembers || 5) * 60; 
//         const capacityLoad = Math.round((assignedHours / maxCapacity) * 100);

//         // C. Blockers
//         const blockers = subtasks.filter(s => s.status === "Blocked");

//         setDashboardData({
//           subtasks,
//           sprintInfo: res.data.data.sprintInfo,
//           metrics: {
//             velocity: sprintPoints, // Story points for the whole sprint
//             dailyProgress: progress,
//             capacity: capacityLoad,
//             totalHours: assignedHours,
//             blockerCount: blockers.length
//           }
//         });
//       }
//     } catch (err) { console.error("Calculation error:", err); }
//     finally { setLoading(false); }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
//       <SideBar />

//       <main className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
        
//         {/* HEADER SECTION */}
//         <header className="flex items-center justify-between px-8 py-6 bg-[#111827]/50 border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
//           <div className="flex items-center gap-4">
//             <div className="w-1.5 h-8 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)]"></div>
//             <div>
//               <h1 className="text-xl font-black text-white tracking-tight">Scrum Control Center</h1>
//               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Live: {selectedTeam?.teamName}</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-6">
//             <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
//               <Users size={16} className="text-green-400" />
//               <select 
//                 className="bg-transparent text-sm font-bold outline-none cursor-pointer"
//                 value={selectedTeam?._id}
//                 onChange={(e) => setSelectedTeam(teams.find(t => t._id === e.target.value))}
//               >
//                 {teams.map(t => <option key={t._id} value={t._id} className="bg-[#111827]">{t.teamName}</option>)}
//               </select>
//             </div>
//             <Zap size={20} className="text-yellow-500 animate-pulse" />
//           </div>
//         </header>

//         <div className="flex flex-1 overflow-hidden">
          
//           <div className="flex-1 p-8 overflow-y-auto custom-scrollbar space-y-8">
            
//             {/* TOP STATS - THE BIG FOUR */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <MetricCard 
//                 label="Sprint Velocity" 
//                 value={`${dashboardData.metrics.velocity} SP`} 
//                 trend="+8% from last" 
//                 icon={<TrendingUp className="text-blue-400" />} 
//               />
//               <MetricCard 
//                 label="Daily Progress" 
//                 value={`${dashboardData.metrics.dailyProgress}%`} 
//                 trend={`${dashboardData.subtasks.filter(s=>s.status==="Done").length} Tasks Done`} 
//                 icon={<CheckSquare className="text-green-400" />} 
//               />
//               <MetricCard 
//                 label="Active Blockers" 
//                 value={dashboardData.metrics.blockerCount} 
//                 trend="Critical Issues" 
//                 icon={<AlertTriangle className="text-red-400" />} 
//                 danger={dashboardData.metrics.blockerCount > 0}
//               />
//               <MetricCard 
//                 label="Workload" 
//                 value={`${dashboardData.metrics.totalHours}h`} 
//                 trend={`${dashboardData.metrics.capacity}% capacity`} 
//                 icon={<Clock className="text-purple-400" />} 
//               />
//             </div>

//             {/* LIVE SUBTASK TRACKER */}
//             <div className="bg-[#111827] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
//               <div className="p-7 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
//                 <div className="flex items-center gap-3">
//                   <Target size={18} className="text-blue-500" />
//                   <h3 className="text-sm font-black uppercase tracking-[0.1em] text-white">Daily Subtask Pulse</h3>
//                 </div>
//                 <button className="text-[10px] bg-blue-600/10 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-bold uppercase">
//                   Daily Report
//                 </button>
//               </div>
//               <table className="w-full text-left">
//                 <thead className="bg-black/20 text-[10px] uppercase text-gray-500 font-black tracking-widest">
//                   <tr>
//                     <th className="px-8 py-5">Assignee</th>
//                     <th className="px-8 py-5">Subtask</th>
//                     <th className="px-8 py-5 text-center">Hours</th>
//                     <th className="px-8 py-5">Status</th>
//                     <th className="px-8 py-5">Progress</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-white/5">
//                   {dashboardData.subtasks.map((task, i) => (
//                     <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
//                       <td className="px-8 py-5">
//                         <div className="flex items-center gap-3">
//                           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
//                             {task.assigneeName?.[0]}
//                           </div>
//                           <span className="font-bold text-gray-200 group-hover:text-white">{task.assigneeName}</span>
//                         </div>
//                       </td>
//                       <td className="px-8 py-5 text-xs text-gray-400 max-w-xs truncate">{task.title}</td>
//                       <td className="px-8 py-5 text-center text-xs font-mono text-blue-400">{task.estimatedHours}h</td>
//                       <td className="px-8 py-5">
//                         <StatusBadge status={task.status} />
//                       </td>
//                       <td className="px-8 py-5 text-right">
//                         <div className="flex items-center gap-4">
//                            <div className="flex-1 bg-white/5 h-1 rounded-full overflow-hidden min-w-[80px]">
//                               <div 
//                                 className={`h-full transition-all duration-1000 ${task.status === "Done" ? "bg-green-500" : task.status === "Blocked" ? "bg-red-500" : "bg-blue-500"}`}
//                                 style={{ width: task.status === "Done" ? "100%" : "20%" }}
//                               />
//                            </div>
//                            <span className="text-[10px] font-black text-gray-500">{task.status === "Done" ? "100%" : "0%"}</span>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//          {/* SIDEBAR ANALYTICS */}
//           <aside className="w-96 bg-[#111827]/30 border-l border-white/5 p-8 hidden xl:flex flex-col gap-10 overflow-y-auto">
            
//             {/* 1. SPRINT COUNTDOWN */}
//             <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 rounded-[2rem] border border-white/5 shadow-xl">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Sprint Timeline</h3>
//                 <Clock size={14} className="text-blue-400" />
//               </div>
//               <div className="flex items-baseline gap-2">
//                 <span className="text-3xl font-black text-white">04</span>
//                 <span className="text-xs font-bold text-gray-500 uppercase">Days Left</span>
//               </div>
//               <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
//                 <div className="h-full bg-blue-500 w-[65%] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
//               </div>
//               <p className="text-[10px] text-gray-500 mt-3 italic text-center text-balance font-medium">
//                 Ends Jan 14, 2026 • Sprint #14
//               </p>
//             </div>

//             {/* 2. TEAM HEALTH GAUGES */}
//             <div>
//               <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Team Health Snapshot</h3>
//               <div className="space-y-8">
//                 <Gauge label="Total Capacity" percent={dashboardData.metrics.capacity} color="blue" />
//                 <Gauge label="Daily Reliability" percent={dashboardData.metrics.dailyProgress} color="green" />
//                 {/* NEW: Blocker Impact Gauge */}
//                 <Gauge 
//                   label="Blocker Impact" 
//                   percent={Math.min(dashboardData.metrics.blockerCount * 25, 100)} 
//                   color="red" 
//                 />
//               </div>
//             </div>

//             {/* 3. RESOURCE LOAD (Who is assigned the most hours) */}
//             <div>
//               <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Resource Allocation</h3>
//               <div className="space-y-4">
//                 {/* Example of mapping through members to show hour load */}
//                 {selectedTeam?.members?.slice(0, 3).map((member, i) => (
//                   <div key={i} className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-[8px] font-bold text-gray-400">
//                         {member.name[0]}
//                       </div>
//                       <span className="text-[11px] font-bold text-gray-300">{member.name}</span>
//                     </div>
//                     <span className="text-[10px] font-mono text-gray-500">8h / 12h</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* 4. CRITICAL BLOCKERS AREA */}
//             <div>
//               <h3 className="text-[10px] font-black text-red-500/70 uppercase tracking-widest mb-6 flex items-center gap-2">
//                 <Flag size={12} /> Priority Blockers
//               </h3>
//               <div className="space-y-4">
//                 {dashboardData.subtasks.filter(s => s.status === "Blocked").length > 0 ? (
//                   dashboardData.subtasks.filter(s => s.status === "Blocked").map((blocker, idx) => (
//                     <div key={idx} className="bg-red-500/5 border border-red-500/10 p-5 rounded-[1.5rem] relative group">
//                       <div className="flex justify-between items-start mb-2">
//                         <p className="text-xs font-black text-white">{blocker.assigneeName}</p>
//                         <AlertTriangle size={12} className="text-red-500" />
//                       </div>
//                       <p className="text-[11px] text-gray-400 mt-1 italic leading-relaxed">"{blocker.title}"</p>
//                       <button className="mt-4 w-full py-2.5 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white text-[10px] font-black rounded-xl transition-all border border-red-500/20">
//                         FORCE SYNC
//                       </button>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-6 bg-green-500/5 border border-green-500/10 rounded-2xl">
//                     <CheckSquare size={20} className="text-green-500 mx-auto mb-2 opacity-50" />
//                     <p className="text-[10px] font-bold text-green-500/70 uppercase">No Active Blockers</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* 5. QUICK ACTIONS / MINI BURNDOWN */}
//             <div className="mt-auto pt-6 border-t border-white/5">
//               <div className="flex gap-2">
//                   <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black py-3 rounded-xl transition-all">
//                     SPRINT LOG
//                   </button>
//                   <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20">
//                     EXPORT PDF
//                   </button>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </main>
//     </div>
//   );
// };

// // -- UI SUB-COMPONENTS --

// const MetricCard = ({ label, value, trend, icon, danger }) => (
//   <div className={`bg-[#111827] border p-7 rounded-[2.5rem] transition-all group hover:bg-white/[0.02] ${danger ? 'border-red-500/40 ring-4 ring-red-500/5' : 'border-white/5'}`}>
//     <div className="flex justify-between items-start mb-4">
//       <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">{icon}</div>
//       <ArrowUpRight size={16} className="text-gray-700 group-hover:text-gray-400" />
//     </div>
//     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</p>
//     <h2 className="text-3xl font-black text-white mt-1 tracking-tighter">{value}</h2>
//     <p className={`text-[10px] mt-2 font-bold ${danger ? 'text-red-400' : 'text-green-500'}`}>{trend}</p>
//   </div>
// );

// const StatusBadge = ({ status }) => {
//   const styles = {
//     "Done": "bg-green-500/10 text-green-500 border-green-500/20",
//     "Blocked": "bg-red-500/10 text-red-500 border-red-500/20",
//     "To-do": "bg-blue-500/10 text-blue-400 border-blue-500/20"
//   };
//   return (
//     <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase border ${styles[status] || styles["To-do"]}`}>
//       {status}
//     </span>
//   );
// };

// const Gauge = ({ label, percent, color }) => (
//   <div className="space-y-3">
//     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
//       <span className="text-gray-500">{label}</span>
//       <span className={color === 'blue' ? 'text-blue-400' : 'text-green-400'}>{percent}%</span>
//     </div>
//     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
//       <div 
//         className={`h-full rounded-full transition-all duration-1000 ${color === 'blue' ? 'bg-blue-500' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]'}`}
//         style={{ width: `${percent}%` }}
//       />
//     </div>
//   </div>
// );

// export default ScrumMasterDashboard;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { 
//   Bell, Calendar, AlertTriangle, Users, BarChart3, 
//   CheckSquare, MoreVertical, Flag, TrendingUp,
//   MessageSquare, Clock, Zap, Target, ArrowUpRight,
//   ShieldAlert, Activity, Coffee, ChevronRight
// } from "lucide-react";
// import SideBar from "../components/Sidebar";
// import SummaryApi from "../common";

// const ScrumMasterDashboard = () => {
//   const isOpen = useSelector((state) => state.sidebar.isOpen);
  
//   const [teams, setTeams] = useState([]);
//   const [selectedTeam, setSelectedTeam] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [dashboardData, setDashboardData] = useState({
//     subtasks: [],
//     sprintInfo: { number: 0, goal: "" },
//     metrics: { velocity: 0, dailyProgress: 0, capacity: 0, totalHours: 0, blockerCount: 0 }
//   });

//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const res = await axios.get(SummaryApi.allTeams.url, { withCredentials: true });
//         if (res.data.success) {
//           setTeams(res.data.data);
//           setSelectedTeam(res.data.data[0]);
//         }
//       } catch (err) { console.error("Teams fetch error:", err); }
//     };
//     fetchTeams();
//   }, []);

//   useEffect(() => {
//     if (selectedTeam) fetchAndCalculateData();
//   }, [selectedTeam]);

//   const fetchAndCalculateData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${SummaryApi.teamPerformance.url}/${selectedTeam._id}`, { withCredentials: true });
      
//       if (res.data.success) {
//         const { subtasks, sprintPoints, totalTeamMembers } = res.data.data;

//         const totalSubtasks = subtasks.length;
//         const doneSubtasks = subtasks.filter(s => s.status === "Done").length;
//         const progress = totalSubtasks > 0 ? Math.round((doneSubtasks / totalSubtasks) * 100) : 0;

//         const assignedHours = subtasks.reduce((sum, s) => sum + (Number(s.estimatedHours) || 0), 0);
//         const maxCapacity = (totalTeamMembers || 5) * 60; 
//         const capacityLoad = Math.round((assignedHours / maxCapacity) * 100);

//         setDashboardData({
//           subtasks,
//           sprintInfo: res.data.data.sprintInfo,
//           metrics: {
//             velocity: sprintPoints,
//             dailyProgress: progress,
//             capacity: capacityLoad,
//             totalHours: assignedHours,
//             blockerCount: subtasks.filter(s => s.status === "Blocked").length
//           }
//         });
//       }
//     } catch (err) { console.error("Calculation error:", err); }
//     finally { setLoading(false); }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#07090F] text-slate-300 font-sans selection:bg-indigo-500/30">
//       <SideBar />

//       <main className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${isOpen ? "ml-64" : "ml-20"}`}>
        
//         {/* ULTRA-MODERN HEADER */}
//         <header className="flex items-center justify-between px-10 py-6 bg-[#0B0F1A]/80 border-b border-white/5 backdrop-blur-xl sticky top-0 z-[60]">
//           <div className="flex items-center gap-5">
//             <div className="relative">
//               <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center border border-indigo-500/30 shadow-[0_0_20px_rgba(79,70,229,0.2)]">
//                 <Activity className="text-indigo-400" size={24} />
//               </div>
//               <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0B0F1A] animate-pulse"></span>
//             </div>
//             <div>
//               <h1 className="text-2xl font-black text-white tracking-tight leading-none">Scrum Command</h1>
//               <div className="flex items-center gap-2 mt-1">
//                 <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Sector:</span>
//                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{selectedTeam?.teamName || "Initializing..."}</p>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="group flex items-center gap-3 bg-white/[0.03] border border-white/10 px-5 py-2.5 rounded-2xl hover:border-indigo-500/50 transition-all cursor-pointer">
//               <Users size={16} className="text-slate-400 group-hover:text-indigo-400" />
//               <select 
//                 className="bg-transparent text-xs font-black outline-none cursor-pointer text-slate-200 uppercase tracking-tighter"
//                 value={selectedTeam?._id}
//                 onChange={(e) => setSelectedTeam(teams.find(t => t._id === e.target.value))}
//               >
//                 {teams.map(t => <option key={t._id} value={t._id} className="bg-[#0B0F1A]">{t.teamName}</option>)}
//               </select>
//             </div>
//             <button className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all relative">
//                 <Bell size={20} />
//                 <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full"></span>
//             </button>
//           </div>
//         </header>

//         <div className="flex flex-1 overflow-hidden p-8 gap-8">
          
//           <div className="flex-1 overflow-y-auto custom-scrollbar space-y-8 pr-2">
            
//             {/* PERFORMANCE METRICS GRID */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <MetricCard 
//                 label="Velocity" 
//                 value={`${dashboardData.metrics.velocity}`} 
//                 sub="Story Points"
//                 trend="+12% vs Avg" 
//                 icon={<Zap size={20} className="text-amber-400" />} 
//                 color="amber"
//               />
//               <MetricCard 
//                 label="Progress" 
//                 value={`${dashboardData.metrics.dailyProgress}%`} 
//                 sub="Sprint Completion"
//                 trend="On Track" 
//                 icon={<Target size={20} className="text-emerald-400" />} 
//                 color="emerald"
//               />
//               <MetricCard 
//                 label="Blockers" 
//                 value={dashboardData.metrics.blockerCount} 
//                 sub="Active Impediments"
//                 trend="Needs Sync" 
//                 icon={<ShieldAlert size={20} className="text-rose-400" />} 
//                 danger={dashboardData.metrics.blockerCount > 0}
//                 color="rose"
//               />
//               <MetricCard 
//                 label="Load" 
//                 value={`${dashboardData.metrics.totalHours}h`} 
//                 sub="Assigned Effort"
//                 trend={`${dashboardData.metrics.capacity}% Capacity`} 
//                 icon={<Clock size={20} className="text-indigo-400" />} 
//                 color="indigo"
//               />
//             </div>

//             {/* MAIN DATA TABLE - SUBTASK PULSE */}
//             <div className="bg-[#0B0F1A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
//               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
//               <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
//                 <div className="flex items-center gap-4">
//                   <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
//                     <BarChart3 size={20} className="text-indigo-500" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-black uppercase tracking-widest text-white">Daily Execution Stream</h3>
//                     <p className="text-[10px] text-slate-500 font-bold">Real-time subtask synchronization</p>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                     <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/5">Filter</button>
//                     <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-600/20">Sync All</button>
//                 </div>
//               </div>
              
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left">
//                   <thead className="bg-black/20 text-[10px] uppercase text-slate-500 font-black tracking-[0.2em]">
//                     <tr>
//                       <th className="px-8 py-6">Owner</th>
//                       <th className="px-8 py-6">Execution Unit (Subtask)</th>
//                       <th className="px-8 py-6 text-center">Load</th>
//                       <th className="px-8 py-6">Status</th>
//                       <th className="px-8 py-6">Integrity</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-white/5">
//                     {dashboardData.subtasks.map((task, i) => (
//                       <tr key={i} className="hover:bg-indigo-500/[0.02] transition-colors group cursor-default">
//                         <td className="px-8 py-5">
//                           <div className="flex items-center gap-3">
//                             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px]">
//                               <div className="w-full h-full rounded-xl bg-[#0B0F1A] flex items-center justify-center text-[10px] font-black text-white">
//                                 {task.assigneeName?.[0]}
//                               </div>
//                             </div>
//                             <span className="text-xs font-black text-slate-200 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{task.assigneeName}</span>
//                           </div>
//                         </td>
//                         <td className="px-8 py-5">
//                           <p className="text-xs font-bold text-slate-400 group-hover:text-slate-200 transition-colors max-w-sm line-clamp-1">{task.title}</p>
//                         </td>
//                         <td className="px-8 py-5 text-center">
//                            <span className="text-[10px] font-black bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-md border border-indigo-500/20">{task.estimatedHours}h</span>
//                         </td>
//                         <td className="px-8 py-5">
//                           <StatusBadge status={task.status} />
//                         </td>
//                         <td className="px-8 py-5">
//                           <div className="flex items-center gap-3">
//                              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden min-w-[100px]">
//                                 <div 
//                                   className={`h-full transition-all duration-1000 ${task.status === "Done" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : task.status === "Blocked" ? "bg-rose-500" : "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"}`}
//                                   style={{ width: task.status === "Done" ? "100%" : "30%" }}
//                                 />
//                              </div>
//                              <span className="text-[10px] font-black text-slate-500 italic">{task.status === "Done" ? "100%" : "Active"}</span>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           {/* ANALYTICS SIDEBAR */}
//           <aside className="w-[360px] hidden xl:flex flex-col gap-6 overflow-y-auto custom-scrollbar">
            
//             {/* COUNTDOWN CARD */}
//             <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[2.5rem] shadow-xl shadow-indigo-900/20 relative overflow-hidden group">
//               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
//                 <Clock size={80} />
//               </div>
//               <div className="relative z-10">
//                 <h3 className="text-[10px] font-black text-indigo-100 uppercase tracking-[0.2em] mb-4">Sprint Deadline</h3>
//                 <div className="flex items-end gap-2">
//                   <span className="text-5xl font-black text-white tracking-tighter">04</span>
//                   <span className="text-sm font-bold text-indigo-200 uppercase mb-2">Days left</span>
//                 </div>
//                 <div className="mt-6 bg-white/20 h-2 rounded-full overflow-hidden">
//                   <div className="bg-white h-full w-2/3 shadow-[0_0_15px_white]" />
//                 </div>
//                 <p className="text-[10px] text-indigo-100 mt-4 font-bold uppercase tracking-widest text-center">Release Cycle v.1.4.2</p>
//               </div>
//             </div>

//             {/* BLOCKER RADAR */}
//             <section className="bg-[#0B0F1A] border border-white/5 rounded-[2.5rem] p-7">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Blocker Radar</h3>
//                 <ShieldAlert size={16} className="text-rose-500" />
//               </div>
              
//               <div className="space-y-4">
//                 {dashboardData.subtasks.filter(s => s.status === "Blocked").length > 0 ? (
//                   dashboardData.subtasks.filter(s => s.status === "Blocked").map((blocker, idx) => (
//                     <div key={idx} className="bg-rose-500/[0.03] border border-rose-500/10 p-5 rounded-2xl group hover:border-rose-500/30 transition-all">
//                       <div className="flex justify-between items-start">
//                         <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">{blocker.assigneeName}</span>
//                         <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></div>
//                       </div>
//                       <p className="text-[11px] text-slate-300 font-bold mt-2 leading-relaxed">"{blocker.title}"</p>
//                       <button className="mt-4 w-full py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white text-[10px] font-black rounded-xl transition-all border border-rose-500/20">
//                         Request Update
//                       </button>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="flex flex-col items-center justify-center py-10 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-[2rem] border-dashed">
//                     <Coffee size={32} className="text-emerald-500/20 mb-3" />
//                     <p className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest text-center leading-relaxed">System Clear<br/>No Blockers Detected</p>
//                   </div>
//                 )}
//               </div>
//             </section>

//             {/* QUICK TEAM HEALTH */}
//             <section className="bg-[#0B0F1A] border border-white/5 rounded-[2.5rem] p-7 mt-auto">
//                 <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Health Snapshot</h3>
//                 <div className="space-y-6">
//                     <HealthBar label="Velocity Consistency" percent={82} color="indigo" />
//                     <HealthBar label="Capacity Utilization" percent={dashboardData.metrics.capacity} color="amber" />
//                     <HealthBar label="Code Review Speed" percent={64} color="purple" />
//                 </div>
//                 <button className="w-full mt-8 py-4 bg-white/[0.03] hover:bg-indigo-600 text-slate-400 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all border border-white/5 flex items-center justify-center gap-2 group">
//                     Full Analytics <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/>
//                 </button>
//             </section>

//           </aside>
//         </div>
//       </main>
      
//       <style>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 4px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(99,102,241,0.3); }
//       `}</style>
//     </div>
//   );
// };

// // -- STYLED UI COMPONENTS --

// const MetricCard = ({ label, value, sub, trend, icon, danger, color }) => {
//   const colorMap = {
//     amber: "text-amber-400 bg-amber-400/10 border-amber-500/20 shadow-amber-500/5",
//     emerald: "text-emerald-400 bg-emerald-400/10 border-emerald-500/20 shadow-emerald-500/5",
//     rose: "text-rose-400 bg-rose-400/10 border-rose-500/20 shadow-rose-500/5",
//     indigo: "text-indigo-400 bg-indigo-400/10 border-indigo-500/20 shadow-indigo-500/5"
//   };

//   return (
//     <div className={`bg-[#0B0F1A] border border-white/5 p-7 rounded-[2.5rem] transition-all group hover:-translate-y-1 hover:bg-white/[0.02] relative overflow-hidden ${danger ? 'ring-2 ring-rose-500/20' : ''}`}>
//       <div className="flex justify-between items-start relative z-10">
//         <div className={`p-3 rounded-2xl ${colorMap[color]}`}>{icon}</div>
//         <ArrowUpRight size={16} className="text-slate-700 group-hover:text-slate-400 transition-colors" />
//       </div>
//       <div className="mt-6 relative z-10">
//         <h2 className="text-4xl font-black text-white tracking-tighter">{value}</h2>
//         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{label}</p>
//         <div className="flex items-center justify-between mt-4">
//             <span className="text-[10px] font-bold text-slate-400">{sub}</span>
//             <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${danger ? 'text-rose-400 bg-rose-400/10' : 'text-emerald-400 bg-emerald-400/10'}`}>{trend}</span>
//         </div>
//       </div>
//       <div className={`absolute -bottom-4 -right-4 w-24 h-24 blur-3xl opacity-10 rounded-full ${color === 'rose' ? 'bg-rose-500' : 'bg-indigo-500'}`}></div>
//     </div>
//   );
// };

// const StatusBadge = ({ status }) => {
//   const styles = {
//     "Done": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
//     "Blocked": "bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]",
//     "To-do": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
//   };
//   return (
//     <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${styles[status] || styles["To-do"]}`}>
//       {status}
//     </span>
//   );
// };

// const HealthBar = ({ label, percent, color }) => {
//     const colors = {
//         indigo: "bg-indigo-500 shadow-indigo-500/40",
//         amber: "bg-amber-500 shadow-amber-500/40",
//         purple: "bg-purple-500 shadow-purple-500/40"
//     };
//     return (
//         <div className="space-y-3">
//             <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
//                 <span className="text-slate-500">{label}</span>
//                 <span className="text-slate-200">{percent}%</span>
//             </div>
//             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
//                 <div 
//                     className={`h-full rounded-full transition-all duration-1000 shadow-lg ${colors[color]}`}
//                     style={{ width: `${percent}%` }}
//                 />
//             </div>
//         </div>
//     );
// };

// export default ScrumMasterDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { 
  AlertTriangle, Users, CheckSquare, TrendingUp, 
  Clock, Target, ArrowUpRight, Zap, Flag 
} from "lucide-react";
import SideBar from "../components/Sidebar";
import SummaryApi from "../common";

// --- UI SUB-COMPONENTS ---

const MetricCard = ({ label, value, trend, icon, danger }) => (
  <div className={`bg-[#111827] border p-7 rounded-[2.5rem] transition-all group hover:bg-white/[0.02] ${danger ? 'border-red-500/40 ring-4 ring-red-500/5' : 'border-white/5'}`}>
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">{icon}</div>
      <ArrowUpRight size={16} className="text-gray-700 group-hover:text-gray-400" />
    </div>
    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</p>
    <h2 className="text-3xl font-black text-white mt-1 tracking-tighter">{value}</h2>
    <p className={`text-[10px] mt-2 font-bold ${danger ? 'text-red-400' : 'text-green-500'}`}>{trend}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    "Done": "bg-green-500/10 text-green-500 border-green-500/20",
    "Blocked": "bg-red-500/10 text-red-500 border-red-500/20",
    "To Do": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "In Progress": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
  };
  return (
    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase border ${styles[status] || styles["To Do"]}`}>
      {status}
    </span>
  );
};

const Gauge = ({ label, percent, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
      <span className="text-gray-500">{label}</span>
      <span className={color === 'blue' ? 'text-blue-400' : color === 'red' ? 'text-red-400' : 'text-green-400'}>
        {percent}%
      </span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-1000 ${
            color === 'blue' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 
            color === 'red' ? 'bg-red-500' : 
            'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]'
        }`}
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);

// --- MAIN COMPONENT ---

const ScrumMasterDashboard = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    subtasks: [],
    sprintInfo: { name: "No Active Sprint", goal: "Select a team to view details" },
    metrics: { velocity: 0, dailyProgress: 0, capacity: 0, totalHours: 0, blockerCount: 0 }
  });

  // 1. Fetch all available teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(SummaryApi.allTeams.url, { withCredentials: true });
        if (res.data.success) {
          setTeams(res.data.data);
          if (res.data.data.length > 0) setSelectedTeam(res.data.data[0]);
        }
      } catch (err) {
        console.error("Teams fetch error:", err);
      }
    };
    fetchTeams();
  }, []);

  // 2. Refresh data whenever the team in the dropdown changes
  useEffect(() => {
    if (selectedTeam?._id) {
      fetchAndCalculateData(selectedTeam._id);
    }
  }, [selectedTeam]);

  const fetchAndCalculateData = async (teamId) => {
    try {
      setLoading(true);
      const res = await axios.get(`${SummaryApi.teamPerformance.url}/${teamId}`, { withCredentials: true });
      
      if (res.data.success) {
        const { subtasks, sprintPoints, totalTeamMembers, sprintInfo } = res.data.data;

        const total = subtasks.length;
        const avgProgress = total > 0 
          ? Math.round(subtasks.reduce((acc, s) => acc + (s.percent_complete || 0), 0) / total) 
          : 0;

        const assignedHours = subtasks.reduce((sum, s) => sum + (Number(s.estimatedHours) || 0), 0);
        const maxCapacity = (totalTeamMembers || 5) * 40; // Assuming 40h per week per member
        const capacityLoad = Math.round((assignedHours / maxCapacity) * 100);

        setDashboardData({
          subtasks,
          sprintInfo: sprintInfo || { name: "Sprint Active", goal: "Complete team tasks" },
          metrics: {
            velocity: sprintPoints || 0,
            dailyProgress: avgProgress,
            capacity: Math.min(capacityLoad, 100),
            totalHours: assignedHours,
            blockerCount: subtasks.filter(s => s.status === "Blocked").length
          }
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getResourceAllocation = () => {
    const allocation = {};
    dashboardData.subtasks.forEach(task => {
        const name = task.assigneeName || "Unassigned";
        allocation[name] = (allocation[name] || 0) + (task.estimatedHours || 0);
    });
    return Object.entries(allocation);
  };

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
      <SideBar />

      <main 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-500 ease-in-out ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        
        {/* HEADER */}
        <header className="flex items-center justify-between px-8 py-6 bg-[#111827]/50 border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-8 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)]"></div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">Scrum Control Center</h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Team: {selectedTeam?.teamName}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl group hover:border-blue-500/50">
              <Users size={16} className="text-blue-400" />
              <select 
                className="bg-transparent text-sm font-bold outline-none cursor-pointer text-white"
                value={selectedTeam?._id || ""}
                onChange={(e) => setSelectedTeam(teams.find(t => t._id === e.target.value))}
              >
                {teams.map(t => <option key={t._id} value={t._id} className="bg-[#111827]">{t.teamName}</option>)}
              </select>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 p-8 overflow-y-auto space-y-8">
            
            {/* METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard label="Velocity" value={`${dashboardData.metrics.velocity} SP`} trend="Sprint Capacity" icon={<TrendingUp className="text-blue-400" />} />
              <MetricCard label="Progress" value={`${dashboardData.metrics.dailyProgress}%`} trend="Average Complete" icon={<CheckSquare className="text-green-400" />} />
              <MetricCard label="Blockers" value={dashboardData.metrics.blockerCount} trend="Priority Help" icon={<AlertTriangle className="text-red-400" />} danger={dashboardData.metrics.blockerCount > 0} />
              <MetricCard label="Workload" value={`${dashboardData.metrics.totalHours}h`} trend={`${dashboardData.metrics.capacity}% capacity`} icon={<Clock className="text-purple-400" />} />
            </div>

            {/* SUBTASK TABLE */}
            <div className="bg-[#111827] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="p-7 border-b border-white/5 flex items-center gap-3">
                <Target size={18} className="text-blue-500" />
                <h3 className="text-sm font-black uppercase text-white">Team Member Subtasks</h3>
              </div>
              <table className="w-full text-left">
                <thead className="bg-black/20 text-[10px] uppercase text-gray-500 font-black tracking-widest">
                  <tr>
                    <th className="px-8 py-5">Assignee</th>
                    <th className="px-8 py-5">Subtask</th>
                    <th className="px-8 py-5 text-center">Hours</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Completion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {dashboardData.subtasks.map((task) => (
                    <tr key={task._id} className="hover:bg-white/[0.02] group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                            {task.assigneeName?.[0] || "?"}
                          </div>
                          <span className="font-bold text-gray-200">{task.assigneeName}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-xs text-gray-400 truncate max-w-xs">{task.title}</td>
                      <td className="px-8 py-5 text-center text-xs font-mono text-blue-400">{task.estimatedHours}h</td>
                      <td className="px-8 py-5"><StatusBadge status={task.status} /></td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-4">
                          <div className="w-24 bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ${task.status === "Done" ? "bg-green-500" : "bg-blue-500"}`}
                              style={{ width: `${task.percent_complete}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-black text-gray-500 w-8">{task.percent_complete}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {dashboardData.subtasks.length === 0 && (
                  <div className="p-20 text-center text-gray-600 uppercase text-[10px] font-bold">No data found</div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR ANALYTICS */}
          <aside className="w-96 bg-[#111827]/30 border-l border-white/5 p-8 hidden xl:flex flex-col gap-10">
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 rounded-[2rem] border border-white/5 shadow-xl">
              <h3 className="text-[10px] font-black text-blue-400 uppercase mb-2">Sprint Goal</h3>
              <p className="text-xs text-gray-400 italic">"{dashboardData.sprintInfo.goal}"</p>
            </div>

            <div className="space-y-8">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Health Gauges</h3>
              <Gauge label="Project Capacity" percent={dashboardData.metrics.capacity} color="blue" />
              <Gauge label="Overall Progress" percent={dashboardData.metrics.dailyProgress} color="green" />
              <Gauge label="Blocker Risk" percent={Math.min(dashboardData.metrics.blockerCount * 25, 100)} color="red" />
            </div>

            <div>
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Resource Allocation</h3>
              <div className="space-y-4">
                {getResourceAllocation().map(([name, hours]) => (
                  <div key={name} className="flex justify-between items-center bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    <span className="text-[11px] font-bold text-gray-300">{name}</span>
                    <span className="text-[10px] font-mono text-blue-400">{hours}h</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ScrumMasterDashboard;