import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { MessageSquare, Clock } from "lucide-react";

const Standups = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStandups = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/standups");
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching standups", err);
      }
    };

    fetchStandups();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
      <SideBar />

      <main className={`flex-1 ${isOpen ? "ml-64" : "ml-20"} p-8`}>

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <MessageSquare className="text-blue-500" />
            Standup History
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            All developer standup updates
          </p>
        </div>

        {/* LIST */}
        <div className="space-y-4">

          {data.length === 0 && (
            <p className="text-gray-500 text-sm">No standups found</p>
          )}

          {data.map((item) => (
            <div
              key={item._id}
              className="bg-[#111827] border border-white/10 p-5 rounded-2xl shadow"
            >
              {/* Message */}
              <p className="text-sm text-white">
                {item.raw_message}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
                <span>Developer: {item.developer_id}</span>

                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {new Date(item.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          ))}

        </div>

      </main>
    </div>
  );
};

export default Standups;