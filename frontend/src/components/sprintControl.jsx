import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  User, 
  Users, 
  Layers, 
  Filter, 
  MoreVertical, 
  AlertCircle,
  Search
} from "lucide-react";
import { useSelector } from "react-redux";
import SideBar from "./Sidebar";
import { toast } from "react-toastify";

export default function SprintControlCenter() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Data - Replace with your API call to fetch all sprint tasks
  useEffect(() => {
    const mockTasks = [
      { id: "T-101", story: "Fix Login Auth", user: "John Doe", team: "Alpha", status: "In Progress", priority: "High" },
      { id: "T-102", story: "API Integration", user: "Jane Smith", team: "Beta", status: "Completed", priority: "Critical" },
      { id: "T-103", story: "UI Polish", user: "Mike Ross", team: "Alpha", status: "Pending", priority: "Low" },
    ];
    setTasks(mockTasks);
  }, []);

  const handleAction = (id, action) => {
    toast.info(`Task ${id} marked as ${action}`);
    // Here you would call axios.post(SummaryApi.updateTaskStatus, { id, action })
  };

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200 font-sans">
      <SideBar />
      <main className={`flex-1 transition-all duration-300 p-8 ${isOpen ? "ml-64" : "ml-20"}`}>
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
            <div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">Sprint Control Center</h1>
              <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mt-1 flex items-center gap-2">
                <Layers size={12} /> Active Sprint: Q1_S2_2026
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Search tasks..." 
                  className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-blue-500 outline-none w-64"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-white/5 p-2.5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard label="Total Tasks" value={tasks.length} color="blue" />
            <StatCard label="Completed" value={tasks.filter(t => t.status === "Completed").length} color="green" />
            <StatCard label="Blocked/Aborted" value="0" color="red" />
            <StatCard label="Remaining" value={tasks.filter(t => t.status !== "Completed").length} color="yellow" />
          </div>

          {/* Main Task Table */}
          <div className="bg-[#111827] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] text-[10px] uppercase font-black tracking-widest text-gray-500 border-b border-white/5">
                  <th className="px-6 py-5">Task / User Story</th>
                  <th className="px-6 py-5">Assigned To</th>
                  <th className="px-6 py-5">Team</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-blue-500 font-bold mb-1">{task.id}</span>
                        <span className="text-sm font-semibold text-gray-200">{task.story}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-[10px] font-bold">
                          {task.user.charAt(0)}
                        </div>
                        {task.user}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-xs font-bold text-gray-400">
                        <Users size={14} className="text-blue-500/50" /> {task.team}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleAction(task.id, "Completed")}
                          className="p-2 hover:bg-green-500/10 text-green-500 rounded-lg transition-all"
                          title="Complete Task"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleAction(task.id, "Aborted")}
                          className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-all"
                          title="Abort Task"
                        >
                          <XCircle size={18} />
                        </button>
                        <button className="p-2 hover:bg-white/10 text-gray-400 rounded-lg">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-components
const StatCard = ({ label, value, color }) => {
  const colors = {
    blue: "text-blue-500 bg-blue-500/5 border-blue-500/10",
    green: "text-green-500 bg-green-500/5 border-green-500/10",
    red: "text-red-500 bg-red-500/5 border-red-500/10",
    yellow: "text-yellow-500 bg-yellow-500/5 border-yellow-500/10"
  };
  return (
    <div className={`p-6 rounded-3xl border ${colors[color]} flex flex-col items-center justify-center`}>
      <span className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{label}</span>
      <span className="text-2xl font-black">{value}</span>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    "Completed": "bg-green-500/10 text-green-500 border-green-500/20",
    "In Progress": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "Pending": "bg-gray-500/10 text-gray-500 border-gray-500/20",
    "Aborted": "bg-red-500/10 text-red-500 border-red-500/20"
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${styles[status]}`}>
      {status}
    </span>
  );
};