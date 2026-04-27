import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../common";
import SideBar from "../components/Sidebar";
import { useSelector } from "react-redux";
import {
  PieChart, Pie, BarChart, Bar, XAxis, YAxis,
  Tooltip, Cell, ResponsiveContainer
} from "recharts";
import { ChevronDown, ChevronUp, Activity, User } from "lucide-react";

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

  console.log("DEV DATA", data);
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
                    <h2 className="text-lg font-bold text-white">
                      {dev.developerName}
                    </h2>

                    <p className="text-xs text-gray-400">
                      Total: {dev.total} | Done: {dev.done} | Blocked: {dev.blocked}
                    </p>
                  </div>
                </div>

                {openDev === dev.developerId ? <ChevronUp /> : <ChevronDown />}
              </div>

              {/* EXPANDED */}
              {openDev === dev.developerId && (

                <div className="p-6 grid md:grid-cols-2 gap-6">

                  {/* PIE */}
                  <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                    <h3 className="text-sm font-bold mb-3 text-white">
                      Standup Activity
                    </h3>

                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={dev.standupChart} dataKey="value" outerRadius={70}>
                          <Cell fill={COLORS.present} />
                          <Cell fill={COLORS.missed} />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* BAR */}
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
                  </div>

                  {/* 🔥 LATEST STANDUP */}
                  <div className="md:col-span-2 bg-black/30 border border-white/10 rounded-xl p-4">
                    <h3 className="text-sm font-bold mb-3 text-white">
                      Latest Standup
                    </h3>

                    {dev.latestStandup ? (
                      <div className="text-xs bg-white/5 p-3 rounded">
                        {dev.latestStandup.text}
                        <p className="text-[10px] text-gray-500 mt-2">
                          {new Date(dev.latestStandup.date).toLocaleString()}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500">
                        No standup submitted
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