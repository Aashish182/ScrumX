import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import SummaryApi from "../common";

import {
  Users, CheckCircle, TrendingUp,
  BarChart3, PieChart as PieIcon,
  Lightbulb, Zap, AlertTriangle
} from "lucide-react";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#3b82f6", "#f59e0b", "#ef4444"];

export default function Performance() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const { teamId } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${SummaryApi.teamPerformanceAnalytics.url}/${teamId}`
      );
      setData(res.data.data);
    };

    fetchData();
  }, [teamId]);

  if (!data) {
    return (
      <div className="flex min-h-screen bg-[#0b0f1a] items-center justify-center text-white">
        Loading performance...
      </div>
    );
  }

  const metrics = [
    {
      title: "Engagement",
      value: data.metrics.engagement,
      icon: <Users size={20} />,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Blocked",
      value: data.metrics.blockers,
      icon: <CheckCircle size={20} />,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Velocity",
      value: data.metrics.velocity,
      icon: <TrendingUp size={20} />,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Overdue",
      value: data.metrics.overdue,
      icon: <AlertTriangle size={20} />,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
      <SideBar />

      <main className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
        
        {/* HEADER */}
        <header className="h-20 border-b border-white/5 bg-[#111827]/40 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="h-10 w-1 bg-blue-600 rounded-full shadow-lg"></div>
            <div>
              <h1 className="text-xl font-bold text-white">Performance Analytics</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                Sprint Health & Productivity
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 px-4 py-1.5 rounded-full">
            <Zap size={14} className="text-blue-400" />
            <span className="text-[10px] text-blue-400 uppercase">Live Metrics</span>
          </div>
        </header>

        <section className="p-10 max-w-7xl mx-auto space-y-10">

          {/* TITLE */}
          <div>
            <h2 className="text-5xl font-black text-white tracking-tight">Team Performance</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Real-time insights into sprint execution and team productivity.
            </p>
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-white/5 p-6 rounded-[2rem] hover:bg-white/[0.03] transition-all group relative overflow-hidden"
              >
                <div className={`${m.bg} ${m.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  {m.icon}
                </div>

                <p className="text-[10px] uppercase text-gray-500 mt-4 tracking-widest font-bold">
                  {m.title}
                </p>
                <h2 className="text-3xl font-black text-white mt-1">{m.value}</h2>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100">
                  <TrendingUp size={16} className="text-gray-600" />
                </div>
              </div>
            ))}
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* BAR */}
            <div className="bg-[#111827] border border-white/5 rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="text-blue-400" />
                <h3 className="text-white font-bold">Sprint Completion</h3>
              </div>

              <div className="h-72">
                <ResponsiveContainer>
                  <BarChart data={data.barData}>
                    <CartesianGrid stroke="#ffffff08" />

                    {/* ✅ FIXED XAXIS */}
                    <XAxis
                      dataKey="name"
                      stroke="#888"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) =>
                        value.length > 15 ? value.substring(0, 15) + "..." : value
                      }
                    />

                    <YAxis stroke="#888" />

                    {/* ✅ TOOLTIP WITH FULL NAME */}
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1f2e",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                      }}
                      formatter={(value, name, props) => [
                        value,
                        `${props.payload.name} - ${name}`,
                      ]}
                    />

                    <Bar dataKey="Completed" fill="#3b82f6" radius={[6,6,0,0]} />
                    <Bar dataKey="Pending" fill="#f59e0b" radius={[6,6,0,0]} />
                    <Bar dataKey="Overdue" fill="#ef4444" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* PIE */}
            <div className="bg-[#111827] border border-white/5 rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-6">
                <PieIcon className="text-purple-400" />
                <h3 className="text-white font-bold">Task Distribution</h3>
              </div>

              <div className="h-72">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={data.pieData} dataKey="value" outerRadius={90}>
                      {data.pieData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* INSIGHTS */}
          <div className="bg-[#111827] border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="text-yellow-400" />
              <h3 className="text-white font-bold">AI Insights</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Insight text={`Team engagement is ${data.metrics.engagement}`} type="good" />
              <Insight text={`${data.metrics.blockers} tasks are blocked`} type="warn" />
              <Insight text={`${data.metrics.overdue} tasks are overdue`} type="bad" />
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}

// 🔹 Insight Card
const Insight = ({ text, type }) => {
  const styles = {
    good: "border-green-500/20 bg-green-500/5 text-green-400",
    warn: "border-yellow-500/20 bg-yellow-500/5 text-yellow-400",
    bad: "border-red-500/20 bg-red-500/5 text-red-400",
  };

  return (
    <div className={`p-4 rounded-2xl border ${styles[type]} text-sm`}>
      {text}
    </div>
  );
};