

import React, { useState, useEffect } from "react";
import { Search, Bell, Calendar, CheckCircle } from "lucide-react";
import SideBar from "../components/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";

const DeveloperHome = ({ userId, teamId }) => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [tabView, setTabView] = useState(false);
  const [teamData, setTeamData] = useState({});
  const [projectProgress, setProjectProgress] = useState(0);

  // Fetch questions and team/project data
  useEffect(() => {
    // Check today's questions
    axios.get(`/api/questions/today/${userId}`).then(res => {
      if (res.data.length === 0) setTabView(true); // Already answered
      else setQuestions(res.data);
    });

    // Fetch team and project progress
    axios.get(`/api/team/${teamId}`).then(res => {
      setTeamData(res.data);
      setProjectProgress(res.data.project.progress || 0);
    });
  }, [userId, teamId]);

  const submitAnswers = () => {
    axios.post('/api/questions/answer', { userId, answers })
      .then(() => setTabView(true)); // Move to tab view after submission
  };

  return (
    <div className="flex min-h-screen bg-[#121212] text-white">
      <SideBar />

      <main className={`flex-1 flex flex-col ${isOpen ? "ml-64" : "ml-20"}`}>
        <header className="flex items-center justify-between px-6 py-4 bg-[#1b1b1b] border-b border-gray-700">
          <h1 className="text-2xl font-bold">Developer Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute top-2.5 left-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-3 py-2 rounded-md bg-[#2a2a2a] text-sm text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
            <Bell className="cursor-pointer text-gray-300 hover:text-white" />
            <Calendar className="cursor-pointer text-gray-300 hover:text-white" />
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto">
            {!tabView ? (
              <div className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Daily Questions</h2>
                {questions.map((q, i) => (
                  <div key={i} className="mb-4">
                    <p className="font-medium">{q.questionText}</p>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 rounded-md bg-[#2a2a2a] text-white"
                      onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })}
                    />
                  </div>
                ))}
                <button
                  className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 mt-2"
                  onClick={submitAnswers}
                >
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {/* Tabs */}
                <div className="flex gap-4 mb-4">
                  <button className="px-4 py-2 bg-[#2a2a2a] rounded-md hover:bg-[#374151]">Team</button>
                  <button className="px-4 py-2 bg-[#2a2a2a] rounded-md hover:bg-[#374151]">Project Progress</button>
                  <button className="px-4 py-2 bg-[#2a2a2a] rounded-md hover:bg-[#374151]">Past Answers</button>
                </div>

                {/* Team Details */}
                <div className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg">
                  <h2 className="text-lg font-semibold mb-3">Team Members</h2>
                  <ul className="space-y-2">
                    {teamData.members?.map((member, i) => (
                      <li key={i} className="bg-[#2a2a2a] p-3 rounded-md">{member.name}</li>
                    ))}
                  </ul>
                </div>

                {/* Project Progress */}
                <div className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg">
                  <h2 className="text-lg font-semibold mb-3">Project Progress</h2>
                  <div className="w-full h-6 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${projectProgress}%` }}
                    />
                  </div>
                  <p className="text-sm mt-2">{projectProgress}% Completed</p>
                </div>

                {/* Past Answers */}
                <div className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg">
                  <h2 className="text-lg font-semibold mb-3">Past Daily Answers</h2>
                  <ul className="space-y-2">
                    {teamData.pastAnswers?.map((ans, i) => (
                      <li key={i} className="bg-[#2a2a2a] p-3 rounded-md">
                        <p><strong>Q:</strong> {ans.question}</p>
                        <p><strong>A:</strong> {ans.answer}</p>
                        <p className="text-xs text-gray-400">{ans.date}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeveloperHome;
