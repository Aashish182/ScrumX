// import React from "react";
// import SideBar from "../components/Sidebar";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Users, CheckCircle, TrendingUp } from "lucide-react";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
//   PieChart, Pie, Cell, Legend
// } from "recharts";

// const performanceMetrics = [
//   { title: "Team Engagement", value: "85%", icon: <Users size={20} className="text-green-400" /> },
//   { title: "Blockers Resolved", value: "12/15", icon: <CheckCircle size={20} className="text-red-400" /> },
//   { title: "Sprint Velocity", value: "32 Points", icon: <TrendingUp size={20} className="text-yellow-400" /> },
// ];

// const barData = [
//   { name: "Sprint 1", Completed: 20, Pending: 5, Overdue: 2 },
//   { name: "Sprint 2", Completed: 25, Pending: 3, Overdue: 1 },
//   { name: "Sprint 3", Completed: 32, Pending: 2, Overdue: 0 },
//   { name: "Sprint 4", Completed: 28, Pending: 4, Overdue: 1 },
// ];

// const pieData = [
//   { name: "Completed", value: 60 },
//   { name: "Pending", value: 25 },
//   { name: "Overdue", value: 15 },
// ];

// const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

// export default function Performance() {
//   const isOpen = useSelector((state) => state.sidebar.isOpen);
//   const navigate = useNavigate();

//   return (
//     <div className="flex min-h-screen bg-[#121212] text-white">
//       <SideBar />
//       <main className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
//         <div className="p-6">
//           <h1 className="text-2xl font-bold mb-6">Team Performance</h1>

//           {/* Metrics Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//             {performanceMetrics.map((metric, idx) => (
//               <div
//                 key={idx}
//                 className="bg-[#1f1f1f] p-4 rounded-xl shadow hover:bg-[#2a2a2a] flex items-center gap-4"
//               >
//                 <div>{metric.icon}</div>
//                 <div>
//                   <h2 className="font-semibold text-lg">{metric.title}</h2>
//                   <p className="text-gray-400">{metric.value}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Charts Section */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Bar Chart */}
//             <div className="bg-[#1f1f1f] rounded-xl shadow p-6">
//               <h3 className="font-semibold mb-4">Sprint Completion</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
//                   <CartesianGrid stroke="#2a2a2a" />
//                   <XAxis dataKey="name" tick={{ fill: "#cbd5e1" }} />
//                   <YAxis tick={{ fill: "#cbd5e1" }} />
//                   <Tooltip contentStyle={{ backgroundColor: "#1f1f1f", border: "none", color: "#fff" }} />
//                   <Bar
//                     dataKey="Completed"
//                     fill="#22c55e"
//                     cursor="pointer"
//                     onClick={(bar) => {
//                       // Extract sprint number from name
//                       const sprintId = bar.payload.name.split(" ")[1];
//                       navigate(`/sprint/${sprintId}`);
//                     }}
//                   />
//                   <Bar
//                     dataKey="Pending"
//                     fill="#f59e0b"
//                     cursor="pointer"
//                     onClick={(bar) => {
//                       const sprintId = bar.payload.name.split(" ")[1];
//                       navigate(`/sprint/${sprintId}`);
//                     }}
//                   />
//                   <Bar
//                     dataKey="Overdue"
//                     fill="#ef4444"
//                     cursor="pointer"
//                     onClick={(bar) => {
//                       const sprintId = bar.payload.name.split(" ")[1];
//                       navigate(`/sprint/${sprintId}`);
//                     }}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Pie Chart */}
//             <div className="bg-[#1f1f1f] rounded-xl shadow p-6">
//               <h3 className="font-semibold mb-4">Task Distribution</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
//                     {pieData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Legend verticalAlign="bottom" wrapperStyle={{ color: "#cbd5e1" }} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Additional Insights */}
//           <div className="mt-6 bg-[#1f1f1f] rounded-xl shadow p-6">
//             <h3 className="font-semibold mb-4">Insights</h3>
//             <ul className="space-y-3 text-sm text-gray-300">
//               <li>✅ Overall team engagement is above 80%.</li>
//               <li>⚠️ 3 blockers are unresolved from the last sprint.</li>
//               <li>📈 Sprint velocity has improved by 10% compared to previous sprint.</li>
//             </ul>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


import React from "react";
import SideBar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  Users, CheckCircle, TrendingUp, Target, 
  ArrowUpRight, BarChart3, PieChart as PieIcon, 
  Lightbulb, Zap
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const performanceMetrics = [
  { title: "Team Engagement", value: "85%", change: "+2%", icon: <Users size={20} />, color: "text-blue-400", bg: "bg-blue-500/10" },
  { title: "Blockers Resolved", value: "12/15", change: "80%", icon: <CheckCircle size={20} />, color: "text-green-400", bg: "bg-green-500/10" },
  { title: "Sprint Velocity", value: "32 pts", change: "+10%", icon: <TrendingUp size={20} />, color: "text-yellow-400", bg: "bg-yellow-500/10" },
];

const barData = [
  { name: "Sprint 1", Completed: 20, Pending: 5, Overdue: 2 },
  { name: "Sprint 2", Completed: 25, Pending: 3, Overdue: 1 },
  { name: "Sprint 3", Completed: 32, Pending: 2, Overdue: 0 },
  { name: "Sprint 4", Completed: 28, Pending: 4, Overdue: 1 },
];

const pieData = [
  { name: "Completed", value: 60 },
  { name: "Pending", value: 25 },
  { name: "Overdue", value: 15 },
];

const COLORS = ["#3b82f6", "#f59e0b", "#ef4444"]; // Blue, Amber, Red

export default function Performance() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
      <SideBar />

      <main className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
        
        {/* SECTION NAVBAR */}
        <header className="h-20 border-b border-white/5 bg-[#111827]/30 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="h-10 w-1 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Performance Analytics</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Project Velocity & Health</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 px-4 py-1.5 rounded-full">
            <Zap size={14} className="text-blue-400" />
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Live Metrics</span>
          </div>
        </header>

        <section className="p-10 max-w-7xl mx-auto w-full space-y-10">
          
          {/* TOP INTRO */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-white tracking-tighter">Team Efficiency</h2>
              <p className="text-gray-500 max-w-md text-sm">Visualizing delivery trends and workload distribution across recent sprints.</p>
            </div>
          </div>

          {/* 1. METRICS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-[#111827] border border-white/5 p-6 rounded-[2rem] hover:bg-white/[0.03] transition-all flex flex-col gap-4 relative overflow-hidden group"
              >
                <div className={`${metric.bg} ${metric.color} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                  {metric.icon}
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">{metric.title}</p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-black text-white">{metric.value}</h2>
                    <span className="text-[10px] text-green-500 font-bold">{metric.change}</span>
                  </div>
                </div>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={18} className="text-gray-600" />
                </div>
              </div>
            ))}
          </div>

          {/* 2. CHARTS SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Bar Chart - Sprint Completion */}
            <div className="bg-[#111827] border border-white/5 rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-8">
                <BarChart3 className="text-blue-500" size={20} />
                <h3 className="font-bold text-lg text-white">Sprint Completion</h3>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.03)'}}
                      contentStyle={{ backgroundColor: "#1a1f2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} 
                    />
                    <Bar dataKey="Completed" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="Pending" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="Overdue" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart - Task Distribution */}
            <div className="bg-[#111827] border border-white/5 rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-8">
                <PieIcon className="text-purple-500" size={20} />
                <h3 className="font-bold text-lg text-white">Task Distribution</h3>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                        data={pieData} 
                        dataKey="value" 
                        nameKey="name" 
                        cx="50%" cy="50%" 
                        innerRadius={60}
                        outerRadius={90} 
                        stroke="none"
                        paddingAngle={5}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#1a1f2e", border: "none", borderRadius: "12px" }} />
                    <Legend verticalAlign="bottom" align="center" iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 3. ADDITIONAL INSIGHTS */}
          <div className="bg-[#111827] border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="text-yellow-500" size={20} />
              <h3 className="font-bold text-lg text-white">AI Generated Insights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InsightItem 
                    text="Overall team engagement is above 80%, indicating healthy collaboration." 
                    status="positive" 
                />
                <InsightItem 
                    text="3 blockers are unresolved from the last sprint. Priority action required." 
                    status="warning" 
                />
                <InsightItem 
                    text="Sprint velocity has improved by 10% compared to the previous cycle." 
                    status="trend" 
                />
            </div>
          </div>
          
        </section>
      </main>
    </div>
  );
}

// Sub-component for Insight Cards
const InsightItem = ({ text, status }) => {
    const styles = {
        positive: "border-green-500/20 bg-green-500/5 text-green-400",
        warning: "border-red-500/20 bg-red-500/5 text-red-400",
        trend: "border-blue-500/20 bg-blue-500/5 text-blue-400"
    };
    return (
        <div className={`p-4 rounded-2xl border ${styles[status]} text-xs leading-relaxed font-medium`}>
            {text}
        </div>
    );
};
