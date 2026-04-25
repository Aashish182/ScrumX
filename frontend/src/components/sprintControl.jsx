import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Layers,
  Users,
  User,
  ChevronRight,
  Loader2,
  CheckCircle2
} from "lucide-react";
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
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async (subtaskId, field, value) => {
    try {
      const payload = { subtaskId };
      payload[field] = value;

      const res = await axios.patch(
        SummaryApi.updateSubtask.url,
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Updated");
        fetchData();
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0b0f1a]">
        <Loader2 className="animate-spin text-blue-500" size={50} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
      <SideBar />

      <main className={`flex-1 ${isOpen ? "ml-64" : "ml-20"} p-8`}>

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Layers className="text-blue-500" />
            Sprint Control
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage sprints, teams & assignments
          </p>
        </div>

        {/* SPRINT CARDS */}
        <div className="space-y-8">

          {sprints.map((sprint) => (

            <div
              key={sprint._id}
              className="bg-gradient-to-br from-[#111827] to-[#0b0f1a] border border-white/10 rounded-2xl shadow-xl overflow-hidden"
            >

              {/* SPRINT HEADER */}
              <div className="p-5 flex justify-between items-center border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Layers className="text-blue-400" />
                  <h2 className="text-lg font-bold text-white">
                    {sprint.name}
                  </h2>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {sprint.goal}
                </span>
              </div>

              {/* TABLE */}
              <div className="p-4 overflow-x-auto">

                <table className="w-full text-left">

                  <thead className="text-xs text-gray-500 uppercase">
                    <tr>
                      <th className="p-3">Subtask</th>
                      <th className="p-3">Team</th>
                      <th className="p-3">Developer</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {sprint.subtasks?.map((st) => {

                      const team = teams.find(t => t._id === st.team_id);
                      const members = team?.members || [];

                      return (
                        <tr
                          key={st._id}
                          className="border-t border-white/5 hover:bg-white/[0.02] transition"
                        >

                          {/* SUBTASK */}
                          <td className="p-3 flex items-center gap-2">
                            <ChevronRight size={14} className="text-blue-400" />
                            <span className="font-medium">{st.title}</span>
                          </td>

                          {/* TEAM */}
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Users size={14} className="text-purple-400" />

                              <select
                                value={st.team_id || ""}
                                onChange={(e) =>
                                  handleUpdate(st._id, "teamId", e.target.value)
                                }
                                className="bg-black border border-white/10 px-2 py-1 text-xs rounded"
                              >
                                <option value="">Team</option>
                                {teams.map(t => (
                                  <option key={t._id} value={t._id}>
                                    {t.teamName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>

                          {/* DEVELOPER */}
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <User size={14} className="text-green-400" />

                              <select
                                value={st.assignee_id || ""}
                                disabled={!st.team_id}
                                onChange={(e) =>
                                  handleUpdate(st._id, "assigneeId", e.target.value)
                                }
                                className="bg-black border border-white/10 px-2 py-1 text-xs rounded"
                              >
                                <option value="">Developer</option>
                                {members.map(m => (
                                  <option key={m._id} value={m._id}>
                                    {m.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>

                          {/* STATUS */}
                          <td className="p-3">
                            {st.status === "Done" ? (
                              <span className="flex items-center gap-1 text-green-400 text-xs">
                                <CheckCircle2 size={14} /> Done
                              </span>
                            ) : (
                              <span className="text-yellow-400 text-xs">
                                {st.status}
                              </span>
                            )}
                          </td>

                        </tr>
                      );
                    })}

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