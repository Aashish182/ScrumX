// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { Layout, Box, Layers, ChevronRight, Users, CheckCircle2 } from "lucide-react";
// import SideBar from "../components/Sidebar";
// import SummaryApi from "../common";
// import { toast } from "react-toastify";

// const SprintControl = () => {
//     const isOpen = useSelector((state) => state.sidebar.isOpen);
//     const [sprints, setSprints] = useState([]);
//     const [teams, setTeams] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchInitialData();
//     }, []);

//     const fetchInitialData = async () => {
//         try {
//             const [sprintRes, teamRes] = await Promise.all([
//                 axios.get(SummaryApi.allSprints.url, { withCredentials: true }),
//                 axios.get(SummaryApi.allTeams.url, { withCredentials: true })
//             ]);
//             if (sprintRes.data.success) setSprints(sprintRes.data.data);
//             if (teamRes.data.success) setTeams(teamRes.data.data);
//         } catch (err) {
//             toast.error("Failed to load sprint data");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleTeamAssignment = async (subtaskId, teamId) => {
//         try {
//             const res = await axios.patch(SummaryApi.updateSubtaskTeam.url, 
//                 { subtaskId, teamId }, 
//                 { withCredentials: true }
//             );
//             if (res.data.success) {
//                 toast.success("Team assigned successfully");
//                 fetchInitialData(); // Refresh to show changes
//             }
//         } catch (err) {
//             toast.error("Assignment failed");
//         }
//     };

//     return (
//         <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200 overflow-x-hidden">
//             <SideBar />
            
//             <main className={`flex-1 transition-all duration-500 ${isOpen ? "ml-64" : "ml-20"} p-8`}>
//                 <header className="mb-10 flex justify-between items-end">
//                     <div>
//                         <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Sprint Control</h1>
//                         <p className="text-emerald-500 font-mono text-xs uppercase tracking-[0.3em]">Lifecycle Management</p>
//                     </div>
//                     <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-[10px] font-bold uppercase text-gray-400">
//                         Total Sprints: {sprints.length}
//                     </div>
//                 </header>

//                 <div className="space-y-12">
//                     {sprints.map((sprint) => (
//                         <section key={sprint._id} className="bg-[#111827] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
//                             {/* Sprint Header */}
//                             <div className="p-8 bg-gradient-to-r from-blue-600/10 to-transparent flex justify-between items-center border-b border-white/5">
//                                 <div className="flex items-center gap-5">
//                                     <div className="p-4 bg-blue-500/20 rounded-2xl text-blue-400">
//                                         <Layers size={24} />
//                                     </div>
//                                     <div>
//                                         <h2 className="text-xl font-black text-white">{sprint.name}</h2>
//                                         <p className="text-xs text-gray-500 font-medium">Goal: {sprint.goal}</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex gap-4">
//                                     <div className="text-right">
//                                         <p className="text-[10px] text-gray-500 font-black uppercase">Duration</p>
//                                         <p className="text-xs font-bold text-gray-300">
//                                             {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Subtasks List */}
//                             <div className="p-4 overflow-x-auto">
//                                 <table className="w-full text-left">
//                                     <thead className="text-[10px] uppercase text-gray-500 font-black tracking-widest border-b border-white/5">
//                                         <tr>
//                                             <th className="px-6 py-4">Subtask Description</th>
//                                             <th className="px-6 py-4">Status</th>
//                                             <th className="px-6 py-4">Assign Team</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="divide-y divide-white/5">
//                                         {sprint.subtasks?.map((task) => (
//                                             <tr key={task._id} className="hover:bg-white/[0.01] group transition-all">
//                                                 <td className="px-6 py-5">
//                                                     <div className="flex items-center gap-3">
//                                                         <ChevronRight size={14} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
//                                                         <span className="text-sm font-bold text-gray-300">{task.title}</span>
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-6 py-5">
//                                                     <span className={`text-[10px] font-black px-3 py-1 rounded-lg border ${
//                                                         task.status === 'Done' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5' : 'border-white/10 text-gray-500'
//                                                     }`}>
//                                                         {task.status}
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-6 py-5">
//                                                     <div className="relative group/select">
//                                                         <select 
//                                                             className="bg-[#0b0f1a] border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-gray-300 outline-none hover:border-blue-500/50 transition-all cursor-pointer appearance-none pr-10 w-48"
//                                                             value={task.team_id || ""}
//                                                             onChange={(e) => handleTeamAssignment(task._id, e.target.value)}
//                                                         >
//                                                             <option value="">Unassigned</option>
//                                                             {teams.map(team => (
//                                                                 <option key={team._id} value={team._id}>
//                                                                     {team.teamName}
//                                                                 </option>
//                                                             ))}
//                                                         </select>
//                                                         <Users size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </section>
//                     ))}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default SprintControl;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Layers, Users, ChevronRight, Loader2 } from "lucide-react";
import SideBar from "../components/Sidebar";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SprintControl = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [sprints, setSprints] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [sprintRes, teamRes] = await Promise.all([
        axios.get(SummaryApi.allSprints.url, { withCredentials: true }),
        axios.get(SummaryApi.allTeams.url, { withCredentials: true })
      ]);

      if (sprintRes.data.success) setSprints(sprintRes.data.data);
      if (teamRes.data.success) setTeams(teamRes.data.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAssign = async (subtaskId, teamId) => {
    try {
      const res = await axios.patch(SummaryApi.updateSubtaskTeam.url, 
        { subtaskId, teamId }, 
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Team updated");
        fetchData();
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading) return (
    <div className="flex h-screen bg-[#0b0f1a] items-center justify-center">
      <Loader2 className="animate-spin text-blue-500" size={48} />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
      <SideBar />
      <main className={`flex-1 transition-all duration-500 ${isOpen ? "ml-64" : "ml-20"} p-8`}>
        <header className="mb-10">
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Sprint Control</h1>
          <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
        </header>

        <div className="space-y-10">
          {sprints.map((sprint) => (
            <div key={sprint._id} className="bg-[#111827] border border-white/5 rounded-[2rem] overflow-hidden shadow-xl">
              <div className="p-6 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Layers className="text-blue-500" />
                  <h2 className="text-xl font-bold text-white">{sprint.name}</h2>
                </div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{sprint.goal}</span>
              </div>

              <div className="p-4">
                <table className="w-full text-left">
                  <thead className="text-[10px] text-gray-500 font-black uppercase tracking-widest border-b border-white/5">
                    <tr>
                      <th className="px-6 py-4">Subtask</th>
                      <th className="px-6 py-4">Assign Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sprint.subtasks?.map((task) => (
                      <tr key={task._id} className="border-b border-white/5 hover:bg-white/[0.01]">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <ChevronRight size={14} className="text-blue-500" />
                            <span className="text-sm font-semibold">{task.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            className="bg-[#0b0f1a] border border-white/10 rounded-lg px-3 py-2 text-xs font-bold outline-none text-gray-300 focus:border-blue-500"
                            value={task.team_id || ""}
                            onChange={(e) => handleAssign(task._id, e.target.value)}
                          >
                            <option value="">Select Team</option>
                            {teams.map(team => (
                              <option key={team._id} value={team._id}>{team.teamName}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SprintControl;