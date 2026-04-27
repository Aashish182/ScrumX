

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Users, UserCheck, Calendar, ClipboardCheck, Star } from "lucide-react";
// import SideBar from "../components/Sidebar"; 
// import SummaryApi from "../common";
// import { useSelector } from "react-redux";

// const TeamMembers = () => {
//   const [teamData, setTeamData] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // 2. Get the Sidebar state from Redux instead of local useState
//   const isOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector((state) => state?.user?.user);

//   useEffect(() => {
//     const fetchTeamData = async () => {
//       try {
//         const res = await axios.post(
//           SummaryApi.teamdetail.url,
//           { memberId: user._id },
//           { withCredentials: true }
//         );

//         if (res.data?.success) {
//           setTeamData(res.data.data);
//         } else {
//           toast.error(res.data?.message || "Failed to fetch team data");
//         }
//       } catch (err) {
//         console.error("Error fetching team:", err);
//         toast.error(err.response?.data?.message || "Failed to fetch team data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?._id) fetchTeamData();
//   }, [user]);

//   if (loading)
//     return (
//       <div className="flex bg-[#1E1E1E] min-h-screen text-white">
//         <SideBar />
//         <div className={`flex-1 p-6 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
//           Loading team details...
//         </div>
//       </div>
//     );

//   if (!teamData)
//     return (
//       <div className="flex bg-[#1E1E1E] min-h-screen text-white">
//         <SideBar />
//         <div className={`flex-1 p-6 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
//           No team data available.
//         </div>
//       </div>
//     );

//   return (
//     <div className="flex min-h-screen bg-[#121212] text-white">
//       {/* 3. The Sidebar handles its own isOpen internally via Redux */}
//       <SideBar />

//       <main
//         className={`flex-1 transition-all duration-300 ${
//           isOpen ? "ml-64" : "ml-20"
//         } p-8`}
//       >
//         {/* Header */}
//         <h1 className="text-3xl font-bold mb-8 text-blue-400 flex items-center gap-3 animate-fade-in">
//           <Users size={32} /> My Team
//         </h1>

//         {/* Project Card */}
//         <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl p-8 mb-10 overflow-hidden">
//           <div className="absolute top-0 right-0 p-4 opacity-10">
//              <ClipboardCheck size={120} />
//           </div>
          
//           <div className="relative z-10">
//             <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
//                Project: <span className="text-blue-300">{teamData.projectName || "N/A"}</span>
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <p className="flex items-center gap-3 text-gray-300 text-lg">
//                 <Calendar className="text-blue-400" size={20} /> 
//                 <span>Deadline: <b className="text-white">{teamData.completionDate ? new Date(teamData.completionDate).toLocaleDateString() : "N/A"}</b></span>
//               </p>

//               <p className="flex items-center gap-3 text-gray-300 text-lg">
//                 <UserCheck className="text-green-400" size={20} /> 
//                 <span>Lead: <b className="text-white">{teamData.teamLeader?.name || "N/A"}</b></span>
//                 <Star className="text-yellow-400 fill-yellow-400" size={16} />
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Team Members Grid */}
//         <h3 className="text-xl font-semibold mb-6 text-gray-400 uppercase tracking-widest text-sm">Members ({teamData.members?.length || 0})</h3>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {teamData.members?.length > 0 ? (
//             teamData.members.map((member) => {
//               const isLeader = member._id === teamData.teamLeader?._id;

//               return (
//                 <div
//                   key={member._id}
//                   className={`relative group rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 border ${
//                     isLeader ? "border-blue-500/50 bg-blue-500/5" : "border-white/10 bg-white/5"
//                   } hover:bg-white/10 hover:border-white/20`}
//                 >
//                   {/* Leader Badge */}
//                   {isLeader && (
//                     <span className="absolute top-3 right-3 bg-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
//                       Lead
//                     </span>
//                   )}

//                   {/* Avatar */}
//                   <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-inner ${
//                     isLeader ? "bg-blue-600" : "bg-gray-700"
//                   }`}>
//                     {member.name?.charAt(0) || "U"}
//                   </div>

//                   {/* Info */}
//                   <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">
//                     {member.name}
//                   </h3>
//                   <p className="text-xs text-gray-500 mb-3 truncate w-full">{member.email}</p>
                  
//                   <div className="mt-auto pt-4 w-full border-t border-white/5 space-y-1">
//                     <p className="text-[11px] uppercase text-gray-400 font-bold tracking-tighter">
//                       {member.role || "Developer"}
//                     </p>
//                     <p className="text-[10px] text-gray-600">
//                       Since {member.joinDate ? new Date(member.joinDate).toLocaleDateString() : "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p className="text-gray-500 italic">No members found in this team.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TeamMembers;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Users, UserCheck, Calendar, ClipboardCheck, Star, MessageSquare, ShieldCheck } from "lucide-react";
import SideBar from "../components/Sidebar"; 
import SummaryApi from "../common";
import { useSelector } from "react-redux";
import TeamChat from "./TeamChat";

const TeamMembers = () => {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("members"); 
  
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await axios.post(
          SummaryApi.teamdetail.url,
          { memberId: user._id },
          { withCredentials: true }
        );

        if (res.data?.success) {
          setTeamData(res.data.data);
        } else {
          toast.error(res.data?.message || "Failed to fetch team data");
        }
      } catch (err) {
        console.error("Error fetching team:", err);
        toast.error(err.response?.data?.message || "Failed to fetch team data");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchTeamData();
  }, [user]);

  if (loading)
    return (
      <div className="flex bg-[#0b0f1a] min-h-screen text-white">
        <SideBar />
        <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
           <div className="space-y-6 animate-pulse">
              <div className="h-10 bg-white/5 rounded-xl w-1/4"></div>
              <div className="h-40 bg-white/5 rounded-3xl w-full"></div>
              <div className="grid grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-white/5 rounded-2xl"></div>)}
              </div>
           </div>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-white selection:bg-blue-500/30">
      <SideBar />

      <main className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"} p-8`}>
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <div className="h-1.5 w-8 bg-blue-500 rounded-full"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Workspace Hub</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
              {activeTab === "members" ? "Team Intelligence" : "Secure Channel"}
            </h1>
          </div>

          {/* TAB SWITCHER */}
          <div className="flex bg-[#111827] border border-white/10 p-1.5 rounded-2xl shadow-2xl">
            <button
              onClick={() => setActiveTab("members")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-bold text-xs uppercase tracking-widest ${
                activeTab === "members" 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Users size={16} /> Members
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-bold text-xs uppercase tracking-widest ${
                activeTab === "chat" 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <MessageSquare size={16} /> Chat
            </button>
          </div>
        </div>

        {activeTab === "members" ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* PROJECT SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-[#111827] to-[#0b0f1a] border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="absolute -top-10 -right-10 opacity-5">
                   <ClipboardCheck size={240} />
                </div>
                
                <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Current Project Focus</h2>
                <h3 className="text-3xl font-black mb-6 text-white tracking-tighter">
                  {teamData?.projectName || "System Core"}
                </h3>

                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                    <Calendar className="text-blue-400" size={18} /> 
                    <div>
                      <p className="text-[9px] uppercase font-black text-gray-500 tracking-wider">Target Date</p>
                      <p className="text-sm font-bold text-gray-200">{teamData?.completionDate ? new Date(teamData.completionDate).toLocaleDateString() : "Pending"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                    <ShieldCheck className="text-emerald-400" size={18} /> 
                    <div>
                      <p className="text-[9px] uppercase font-black text-gray-500 tracking-wider">Team Lead</p>
                      <p className="text-sm font-bold text-emerald-400">{teamData?.teamLeader?.name || "None"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center">
                 <p className="text-5xl font-black text-blue-500 mb-1">{teamData?.members?.length || 0}</p>
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Personnel</p>
              </div>
            </div>

            {/* MEMBER LIST */}
            <div>
               <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">Directory</h3>
                  <div className="h-[1px] flex-1 bg-white/10"></div>
               </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {teamData?.members?.map((member) => {
                  const isLeader = member._id === teamData.teamLeader?._id;
                  return (
                    <div
                      key={member._id}
                      className={`group relative rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-500 border ${
                        isLeader 
                        ? "border-blue-500/30 bg-gradient-to-b from-blue-600/10 to-transparent shadow-lg shadow-blue-500/5" 
                        : "border-white/5 bg-[#111827]/50"
                      } hover:border-blue-500/50 hover:bg-[#111827] hover:-translate-y-2`}
                    >
                      {isLeader && (
                        <div className="absolute top-5 left-5">
                          <Star className="text-blue-500 fill-blue-500" size={14} />
                        </div>
                      )}

                      <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black mb-6 transition-all duration-500 ${
                        isLeader 
                        ? "bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] ring-4 ring-blue-500/20" 
                        : "bg-gray-800 group-hover:bg-gray-700"
                      }`}>
                        {member.name?.charAt(0) || "U"}
                      </div>

                      <h3 className="font-black text-lg mb-1 tracking-tight group-hover:text-blue-400 transition-colors uppercase">
                        {member.name}
                      </h3>
                      <p className="text-[10px] text-gray-500 mb-6 font-bold uppercase tracking-tighter">
                        {member.email}
                      </p>
                      
                      <div className="mt-auto w-full pt-6 border-t border-white/5">
                        <div className={`text-[10px] font-black uppercase tracking-widest py-1.5 rounded-lg mb-2 ${
                          isLeader ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "text-gray-400"
                        }`}>
                          {member.role || "Developer"}
                        </div>
                        <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">
                          Joined {member.joinDate ? new Date(member.joinDate).toLocaleDateString() : "System"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* CHAT MODULE */
          <div className="animate-in zoom-in-95 duration-300 h-[calc(100vh-250px)]">
            <div className="h-full bg-[#111827] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
               <TeamChat teamId={teamData?._id} user={user} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeamMembers;