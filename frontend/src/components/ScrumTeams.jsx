// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { ClipboardCheck, UserCheck, Calendar } from "lucide-react";
// import SideBar from "../components/Sidebar";
// import SummaryApi from "../common";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const ScrumTeams = () => {
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const isOpen = useSelector((state) => state.sidebar.isOpen);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAllTeams = async () => {
//       try {
//         const res = await axios.get(SummaryApi.allTeams.url, { withCredentials: true });
//         if (res.data?.success) {
//           setTeams(res.data.data);
//         } else {
//           toast.error(res.data?.message || "Failed to fetch teams");
//         }
//       } catch (err) {
//         console.error("Error fetching teams:", err);
//         toast.error(err.response?.data?.message || "Failed to fetch teams");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllTeams();
//   }, []);

//   if (loading) return <div className="ml-20 p-6 text-white">Loading teams...</div>;
//   if (!teams?.length) return <div className="ml-20 p-6 text-white">No teams available.</div>;

//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
//       <SideBar />

//       <main className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"} p-6`}>
//         <h1 className="text-3xl font-bold mb-8 text-green-400 flex items-center gap-2">
//           Scrum Dashboard: All Teams
//         </h1>

//         {/* Teams Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {teams.map((team) => (
//             <div
//               key={team._id}
//               className="relative bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-2xl transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:brightness-110 overflow-hidden"
//             >
//               {/* Glow */}
//               <div className="absolute -inset-1 bg-white/5 blur-xl rounded-2xl animate-pulse opacity-20"></div>

//               <div className="z-10 flex flex-col gap-4">
//                 <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2">
//                   <ClipboardCheck /> {team.teamName}
//                 </h2>

//                 <div className="space-y-2 text-gray-200">
//                   <p className="flex items-center gap-2">
//                     <ClipboardCheck /> <span className="font-medium">Project:</span> {team.projectName}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <UserCheck /> <span className="font-medium">Team Leader:</span> {team.teamLeader?.name || "N/A"}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <Calendar /> <span className="font-medium">Completion:</span>{" "}
//                     {team.completionDate ? new Date(team.completionDate).toLocaleDateString() : "N/A"}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <span className="font-medium">Members:</span> {team.members?.length || 0}
//                   </p>
//                 </div>

//                 <button
//       onClick={() => navigate("/Performance")}
//       className="mt-4 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 w-full"
//     >
//       View Team Performance
//     </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ScrumTeams;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  ClipboardCheck, UserCheck, Calendar, Users, 
  ArrowUpRight, Loader2, LayoutGrid, Activity, 
  Search, ScrollText, ShieldCheck
} from "lucide-react";
import SideBar from "../components/Sidebar";
import SummaryApi from "../common";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ScrumTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllTeams = async () => {
      try {
        const res = await axios.get(SummaryApi.allTeams.url, { withCredentials: true });
        if (res.data?.success) {
          setTeams(res.data.data);
        } else {
          toast.error(res.data?.message || "Failed to fetch teams");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch teams");
      } finally {
        setLoading(false);
      }
    };
    fetchAllTeams();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#0b0f1a]">
        <SideBar />
        <div className={`flex-1 flex items-center justify-center transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
          <Loader2 className="text-blue-500 animate-spin" size={40} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
      <SideBar />

      <main className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
        
        {/* ENHANCED SECTION NAVBAR */}
        <header className="h-20 border-b border-white/5 bg-[#111827]/30 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="h-10 w-1 px-0.5 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Team Intelligence</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Scrum Management System</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 focus-within:border-blue-500/50 transition-all">
              <Search size={14} className="text-gray-500" />
              <input 
                type="text" 
                placeholder="Search teams..." 
                className="bg-transparent border-none focus:ring-0 text-xs w-48 ml-2 placeholder:text-gray-600 outline-none"
              />
            </div>
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
               <Activity size={20} className="text-blue-400" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0b0f1a]"></span>
            </button>
          </div>
        </header>

        <section className="p-10">
          <div className="max-w-7xl mx-auto space-y-10">
            
            {/* HERO / STATS SECTION */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="space-y-2">
                <h2 className="text-5xl font-black text-white tracking-tighter">Active Teams</h2>
                <p className="text-gray-500 max-w-md font-medium text-sm">Managing collaboration and workflow for {teams.length} registered scrum units.</p>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#111827] border border-white/5 p-4 rounded-2xl flex items-center gap-4 min-w-[160px]">
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Users size={20}/></div>
                  <div>
                    <p className="text-2xl font-bold text-white">{teams.length}</p>
                    <p className="text-[10px] uppercase text-gray-500 font-bold">Total Units</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TEAMS GRID */}
            {!teams?.length ? (
              <div className="bg-[#111827] border border-white/5 p-20 rounded-[2rem] text-center">
                <Users className="mx-auto text-gray-700 mb-4" size={60} />
                <h3 className="text-xl font-bold text-white">No Squads Found</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teams.map((team) => (
                  <div
                    key={team._id}
                    className="group bg-[#111827] border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/40">
                        <ClipboardCheck className="text-white" size={22} />
                      </div>
                      <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full border border-green-500/20 text-[10px] font-bold uppercase tracking-wider">
                        Online
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{team.teamName}</h3>
                    <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">{team.projectName}</p>

                    {/* TEAM LEADER SECTION */}
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 mb-6">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
                             <ShieldCheck size={16} className="text-blue-400" />
                          </div>
                          <div>
                             <p className="text-[10px] uppercase text-gray-500 font-bold tracking-tighter leading-none mb-1">Team Leader</p>
                             <p className="text-sm font-bold text-gray-200">{team.teamLeader?.name || "Unassigned"}</p>
                          </div>
                       </div>
                    </div>

                    {/* SCROLLABLE MEMBERS LIST */}
                    <div className="flex-1 space-y-3 mb-8">
                      <div className="flex justify-between items-center text-[10px] uppercase text-gray-500 font-black tracking-widest px-1">
                        <span>Squad Members</span>
                        <span>{team.members?.length || 0} Total</span>
                      </div>
                      
                      {/* Scroll Area */}
                      <div className="h-32 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                        {team.members && team.members.length > 0 ? (
                          team.members.map((member, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white/[0.02] border border-white/5 py-2 px-3 rounded-xl hover:bg-white/5 transition-colors group/member">
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center text-[8px] font-bold text-blue-400">
                                  {member.name ? member.name.charAt(0).toUpperCase() : "M"}
                                </div>
                                <span className="text-xs font-medium text-gray-300 group-hover/member:text-white transition-colors">{member.name || "Unknown Member"}</span>
                              </div>
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover/member:bg-blue-500 transition-all"></div>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-gray-600 italic py-4 text-center">No members found</p>
                        )}
                      </div>
                    </div>

                    {/* BOTTOM DETAILS & BUTTON */}
                    <div className="pt-6 border-t border-white/5 mt-auto">
                      <div className="flex items-center justify-between mb-6 px-1">
                        <div className="flex flex-col">
                           <span className="text-[10px] text-gray-500 font-bold uppercase">Estimated Goal</span>
                           <span className="text-xs text-gray-200 font-medium">{team.completionDate ? new Date(team.completionDate).toLocaleDateString() : "TBD"}</span>
                        </div>
                        <Calendar size={18} className="text-gray-600" />
                      </div>

                      <button
                        onClick={() => navigate("/Performance")}
                        className="w-full group/btn flex items-center justify-center gap-3 bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 py-4 rounded-2xl text-sm font-bold transition-all duration-300 active:scale-95 shadow-xl hover:shadow-blue-900/20"
                      >
                        Analysis Report
                        <ArrowUpRight size={18} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ScrumTeams;