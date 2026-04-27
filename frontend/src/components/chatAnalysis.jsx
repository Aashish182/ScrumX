

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SummaryApi from "../common";
// import SideBar from "../components/Sidebar";
// import { useSelector } from "react-redux";
// import {
//   PieChart, Pie, BarChart, Bar, XAxis, YAxis,
//   Tooltip, Cell, ResponsiveContainer
// } from "recharts";
// import { ChevronDown, ChevronUp, Activity } from "lucide-react";

// const COLORS = {
//   present: "#22c55e",
//   missed: "#ef4444",
//   done: "#3b82f6",
//   blocked: "#f97316",
//   progress: "#a855f7",
// };

// const ChatAnalysis = () => {
//   const isOpen = useSelector((state) => state.sidebar.isOpen);
//   const [data, setData] = useState([]);
//   const [openDev, setOpenDev] = useState(null);

//   useEffect(() => {
//     const fetch = async () => {
//       const res = await axios.get(SummaryApi.getChatAnalysis.url, {
//         withCredentials: true,
//       });
//       if (res.data.success) setData(res.data.data);
//     };
//     fetch();
//   }, []);

//   const toggle = (id) => {
//     setOpenDev(openDev === id ? null : id);
//   };

//   return (
//     <div className="flex min-h-screen bg-black text-white">
//       <SideBar />

//       <main className={`flex-1 p-6 ${isOpen ? "ml-64" : "ml-20"}`}>
//         <h1 className="text-2xl font-bold mb-6">
//           Scrum Master Control Panel
//         </h1>

//         <div className="space-y-4">

//           {data.map((dev) => (
//             <div
//               key={dev.developerId}
//               className="bg-[#141414] border border-white/10 rounded-xl p-4"
//             >

//               {/* HEADER ROW (CLICKABLE) */}
//               <div
//                 onClick={() => toggle(dev.developerId)}
//                 className="flex justify-between items-center cursor-pointer"
//               >
//                 <div>
//                   <h2 className="text-lg font-bold">
//                     👤 {dev.developerName}
//                     <span className="text-xs text-blue-400 ml-2">
//                       ({dev.roleId})
//                     </span>
//                   </h2>
//                   <p className="text-xs text-gray-400">
//                     Total Tasks: {dev.total} | Done: {dev.done} | Blocked: {dev.blocked}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <Activity className="text-green-400" />

//                   {openDev === dev.developerId ? (
//                     <ChevronUp />
//                   ) : (
//                     <ChevronDown />
//                   )}
//                 </div>
//               </div>

//               {/* EXPAND SECTION */}
//               {openDev === dev.developerId && (
//                 <div className="mt-6 grid md:grid-cols-2 gap-6">

//                   {/* PIE CHART - STANDUP */}
//                   <div className="bg-black/40 p-4 rounded-lg border border-white/10">
//                     <h3 className="text-sm font-bold mb-2">
//                       📅 Standup Activity
//                     </h3>

//                     <ResponsiveContainer width="100%" height={200}>
//                       <PieChart>
//                         <Pie
//                           data={dev.standupChart}
//                           dataKey="value"
//                           outerRadius={70}
//                         >
//                           <Cell fill={COLORS.present} />
//                           <Cell fill={COLORS.missed} />
//                         </Pie>
//                       </PieChart>
//                     </ResponsiveContainer>

//                     <div className="text-xs mt-2 space-y-1">
//                       <p><span className="text-green-400">●</span> Present</p>
//                       <p><span className="text-red-400">●</span> Missed</p>
//                     </div>
//                   </div>

//                   {/* BAR CHART - TASK STATUS */}
//                   <div className="bg-black/40 p-4 rounded-lg border border-white/10">
//                     <h3 className="text-sm font-bold mb-2">
//                       📊 Task Breakdown
//                     </h3>

//                     <ResponsiveContainer width="100%" height={200}>
//                       <BarChart
//                         data={[
//                           { name: "Done", value: dev.done },
//                           { name: "Blocked", value: dev.blocked },
//                           { name: "In Progress", value: dev.inProgress },
//                         ]}
//                       >
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Bar dataKey="value">
//                           <Cell fill={COLORS.done} />
//                           <Cell fill={COLORS.blocked} />
//                           <Cell fill={COLORS.progress} />
//                         </Bar>
//                       </BarChart>
//                     </ResponsiveContainer>

//                     {/* LEGEND */}
//                     <div className="text-xs mt-2 space-y-1">
//                       <p><span className="text-blue-400">■</span> Done</p>
//                       <p><span className="text-orange-400">■</span> Blocked</p>
//                       <p><span className="text-purple-400">■</span> In Progress</p>
//                     </div>
//                   </div>

//                   {/* CHAT / UPDATES */}
//                   <div className="md:col-span-2 bg-black/30 p-4 rounded-lg border border-white/10 max-h-40 overflow-y-auto">
//                     <h3 className="text-sm font-bold mb-2">
//                       💬 Latest Standup Updates
//                     </h3>

//                     {(dev.updates || []).slice(0, 3).map((u, i) => (
//                         <div key={i} className="text-xs bg-white/5 p-2 rounded mb-2">
//                             {u.text}
//                         </div>
//                     ))}
//                   </div>

//                 </div>
//               )}

//             </div>
//           ))}

//         </div>
//       </main>
//     </div>
//   );
// };

// export default ChatAnalysis;



import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../common";
import SideBar from "../components/Sidebar";
import { useSelector } from "react-redux";
import {
  PieChart, Pie, BarChart, Bar, XAxis, YAxis,
  Tooltip, Cell, ResponsiveContainer
} from "recharts";
import { ChevronDown, ChevronUp, Activity, Users, User } from "lucide-react";

const COLORS = {
  present: "#22c55e",
  missed: "#ef4444",
  done: "#3b82f6",
  blocked: "#f97316",
  progress: "#a855f7",
};

const ChatAnalysis = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [data, setData] = useState([]);
  const [openDev, setOpenDev] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(SummaryApi.getChatAnalysis.url, {
        withCredentials: true,
      });
      if (res.data.success) setData(res.data.data);
    };
    fetch();
  }, []);

  const toggle = (id) => {
    setOpenDev(openDev === id ? null : id);
  };

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
      <SideBar />

      <main className={`flex-1 ${isOpen ? "ml-64" : "ml-20"} p-8`}>

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Activity className="text-blue-500" />
            Scrum Chat Analysis
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Developer productivity + standup tracking
          </p>
        </div>

        {/* DEV LIST */}
        <div className="space-y-6">

          {data.map((dev) => (

            <div
              key={dev.developerId}
              className="bg-gradient-to-br from-[#111827] to-[#0b0f1a] border border-white/10 rounded-2xl overflow-hidden shadow-lg"
            >

              {/* HEADER */}
              <div
                onClick={() => toggle(dev.developerId)}
                className="p-5 flex justify-between items-center cursor-pointer border-b border-white/10 hover:bg-white/5 transition"
              >

                <div className="flex items-center gap-4">

                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <User className="text-blue-400" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      {dev.developerName}
                      <span className="text-xs text-blue-400">
                        ({dev.roleId})
                      </span>
                    </h2>

                    <p className="text-xs text-gray-400">
                      Total: {dev.total} | Done: {dev.done} | Blocked: {dev.blocked}
                    </p>
                  </div>

                </div>

                {openDev === dev.developerId ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}

              </div>

              {/* EXPANDED SECTION */}
              {openDev === dev.developerId && (

                <div className="p-6 grid md:grid-cols-2 gap-6">

                  {/* PIE CHART */}
                  <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                    <h3 className="text-sm font-bold mb-3 text-white">
                      Standup Activity
                    </h3>

                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={dev.standupChart}
                          dataKey="value"
                          outerRadius={70}
                        >
                          <Cell fill={COLORS.present} />
                          <Cell fill={COLORS.missed} />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="text-xs mt-2 text-gray-400">
                      🟢 Present | 🔴 Missed
                    </div>
                  </div>

                  {/* BAR CHART */}
                  <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                    <h3 className="text-sm font-bold mb-3 text-white">
                      Task Breakdown
                    </h3>

                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={[
                          { name: "Done", value: dev.done },
                          { name: "Blocked", value: dev.blocked },
                          { name: "Progress", value: dev.inProgress },
                        ]}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value">
                          <Cell fill={COLORS.done} />
                          <Cell fill={COLORS.blocked} />
                          <Cell fill={COLORS.progress} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>

                    <div className="text-xs mt-2 text-gray-400">
                      🔵 Done | 🟠 Blocked | 🟣 In Progress
                    </div>
                  </div>

                  {/* STANDUP LOGS */}
                  <div className="md:col-span-2 bg-black/30 border border-white/10 rounded-xl p-4 max-h-44 overflow-y-auto">
                    <h3 className="text-sm font-bold mb-3 text-white">
                      Latest Standups
                    </h3>

                    {(dev.updates || []).slice(0, 3).length > 0 ? (
                      dev.updates.slice(0, 3).map((u, i) => (
                        <div
                          key={i}
                          className="text-xs bg-white/5 p-2 rounded mb-2"
                        >
                          {u.text}
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500">
                        No standup updates
                      </p>
                    )}

                  </div>

                </div>
              )}

            </div>

          ))}

        </div>

      </main>
    </div>
  );
};

export default ChatAnalysis;