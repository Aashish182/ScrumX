import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // To listen to sidebar state
import SideBar from '../components/Sidebar'; // Ensure this path is correct
import { 
  Trophy, TrendingUp, Users, Zap, Award, 
  ChevronDown, Plus, ThumbsUp, MessageCircleOff 
} from 'lucide-react';

const Retrospectives = () => {
  // Redux State: Listen to the sidebar toggle
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  const [selectedTeam, setSelectedTeam] = useState("Alpha Team");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const teams = ["Alpha Team", "Beta Project", "Mobile App Core", "Design Systems"];

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
      
      {/* 1. YOUR SHARED SIDEBAR COMPONENT */}
      <SideBar />

      {/* 2. MAIN CONTENT AREA 
          Dynamic Margin: ml-64 when open, ml-20 when closed to match your sidebar width
      */}
      <main 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        
        {/* TOP NAV / TEAM SELECTION */}
        <header className="h-16 border-b border-white/5 bg-[#111827]/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-lg hover:bg-white/10 transition-all text-sm"
            >
              <Users size={16} className="text-blue-400" />
              <span className="font-medium">{selectedTeam}</span>
              <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-12 left-0 w-56 bg-[#1a1f2e] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                {teams.map((team, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedTeam(team);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-400 hover:bg-blue-600 hover:text-white transition-colors border-b border-white/5 last:border-0"
                  >
                    {team}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white leading-none">Aashish Gupta</p>
                <p className="text-[10px] text-blue-500 uppercase tracking-widest mt-1">Lead Developer</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 border-2 border-white/10" />
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <section className="flex-1 p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Project Summary Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
              <div>
                <h2 className="text-4xl font-extrabold text-white tracking-tight">Project Wrap-up</h2>
                <p className="text-gray-500 mt-1 italic">Reviewing performance metrics for {selectedTeam}</p>
              </div>
              <div className="bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-xl border border-yellow-500/20 text-xs font-bold flex items-center gap-2">
                <Award size={16}/> SPRINT CHAMPION
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Velocity", val: "42 pts", icon: <TrendingUp size={20} className="text-blue-400"/> },
                { label: "Say/Do Ratio", val: "98%", icon: <Zap size={20} className="text-yellow-400"/> },
                { label: "Bug Free", val: "100%", icon: <Award size={20} className="text-green-400"/> },
                { label: "Hours Saved", val: "120h", icon: <Trophy size={20} className="text-purple-400"/> },
              ].map((s, i) => (
                <div key={i} className="bg-[#111827] border border-white/5 p-6 rounded-2xl hover:bg-white/10 transition-all">
                  <div className="mb-4">{s.icon}</div>
                  <p className="text-2xl font-black text-white">{s.val}</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Retrospective Feedback */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111827] border border-green-500/20 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2 text-green-400 text-lg">
                    <ThumbsUp size={20} /> What Went Well
                  </h3>
                  <Plus size={18} className="cursor-pointer text-gray-500 hover:text-green-400" />
                </div>
                <div className="space-y-3">
                  <p className="bg-green-500/5 p-3 rounded-lg border border-green-500/10 text-sm">Real-time socket communication was flawless.</p>
                  <p className="bg-green-500/5 p-3 rounded-lg border border-green-500/10 text-sm">Team collaboration on UI design was very efficient.</p>
                </div>
              </div>

              <div className="bg-[#111827] border border-red-500/20 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2 text-red-400 text-lg">
                    <MessageCircleOff size={20} /> Improvements
                  </h3>
                  <Plus size={18} className="cursor-pointer text-gray-500 hover:text-red-400" />
                </div>
                <div className="space-y-3">
                  <p className="bg-red-500/5 p-3 rounded-lg border border-red-500/10 text-sm">Initial database schema changes caused some delays.</p>
                  <p className="bg-red-500/5 p-3 rounded-lg border border-red-500/10 text-sm">API documentation needs to be more consistent.</p>
                </div>
              </div>
            </div>

            {/* Performance Table */}
            <div className="bg-[#111827] border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-10">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-bold text-white">Contributor Analytics</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-black/20 text-[10px] uppercase text-gray-500 tracking-widest font-bold">
                    <tr>
                      <th className="px-6 py-4">Developer</th>
                      <th className="px-6 py-4">Efficiency</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {["Aashish Gupta", "John Doe", "Jane Smith"].map((name, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-900/50 border border-blue-500/30 flex items-center justify-center text-[10px] font-bold">
                            {name[0]}
                          </div>
                          <span className="text-sm font-medium text-gray-200">{name}</span>
                        </td>
                        <td className="px-6 py-4">
                           <div className="w-24 bg-white/10 h-1.5 rounded-full">
                              <div className="bg-blue-500 h-full w-[80%] rounded-full"></div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-500 font-bold uppercase">MVP Candidate</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Retrospectives;