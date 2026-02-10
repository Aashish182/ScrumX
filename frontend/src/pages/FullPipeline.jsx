// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SideBar from "../components/Sidebar";

// export default function FullPipeline() {
//   const [sentence, setSentence] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState("");
//   const [confirmed, setConfirmed] = useState(false);
//   const [insertedData, setInsertedData] = useState(null);
//   const navigate = useNavigate();

//   // --- Step 1: Run pipeline ---
//   const handleSubmit = async () => {
//     if (!sentence.trim()) {
//       setError("Please enter your standup sentence.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResponse(null);
//     setConfirmed(false);
//     setInsertedData(null);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/fullpipeline/run", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           sentence,
//           employee_id: 1,
//           confirm_insert: 0,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.detail || "Server error");
//       setResponse(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Step 2: Confirm Insert into DB ---
//   const handleConfirmInsert = async (confirm) => {
//     if (!confirm) {
//       setConfirmed(true);
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("http://127.0.0.1:8000/fullpipeline/run", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           sentence,
//           employee_id: 1,
//           confirm_insert: 1,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.detail || "Server error");
//       setInsertedData(data);
//       setConfirmed(true);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100">
//       {/* ✅ Sidebar */}
//       <SideBar />

//       {/* ✅ Main content area */}
//       <div className="flex-1 p-10 overflow-y-auto">
//         <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">
//           {/* Header */}
//           <header className="text-center mb-8">
//             <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-sky-400 text-transparent bg-clip-text">
//               Daily Standup Board
//             </h1>
//             <p className="text-gray-300 mt-2 text-sm">
//               Track, log, and analyze your daily standup updates effortlessly.
//             </p>
//           </header>

//           {/* Chat/Input Section */}
//           <div className="space-y-6">
//             <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-inner">
//               <textarea
//                 rows="4"
//                 className="w-full bg-transparent border border-gray-600 rounded-xl p-4 text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-400 resize-none"
//                 placeholder="Type your daily standup here..."
//                 value={sentence}
//                 onChange={(e) => setSentence(e.target.value)}
//               />
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className={`mt-4 w-full py-3 rounded-xl font-semibold text-white transition-all ${
//                   loading
//                     ? "bg-gray-600 cursor-not-allowed"
//                     : "bg-gradient-to-r from-indigo-500 to-sky-500 hover:opacity-90 hover:scale-[1.02]"
//                 }`}
//               >
//                 {loading ? "Processing..." : "Submit Standup"}
//               </button>
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="text-center bg-red-500/10 text-red-300 border border-red-400/30 py-3 px-4 rounded-xl text-sm">
//                 {error}
//               </div>
//             )}

//             {/* Response Section */}
//             {response && !confirmed && (
//               <div className="space-y-5">
//                 <div className="flex flex-col items-start">
//                   <div className="bg-indigo-600/20 border border-indigo-500/40 px-5 py-4 rounded-2xl max-w-lg shadow-sm">
//                     <p className="text-indigo-300 font-semibold mb-2">
//                       Assistant Response
//                     </p>
//                     <p className="text-gray-100">
//                       <span className="font-medium">Intent:</span> {response.intent}
//                     </p>

//                     {Object.keys(response.entities || {}).length > 0 && (
//                       <div className="mt-3 text-sm">
//                         <p className="font-medium text-indigo-200">Entities:</p>
//                         <ul className="list-disc list-inside text-gray-300">
//                           {Object.entries(response.entities).map(([key, val]) => (
//                             <li key={key}>
//                               <span className="font-semibold text-gray-100">{key}</span>: {val}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex justify-center gap-4 mt-4">
//                   {response.intent === "log_update" && (
//                     <>
//                       <button
//                         onClick={() => handleConfirmInsert(true)}
//                         className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium shadow hover:scale-105 transition"
//                       >
//                         Save to Database
//                       </button>
//                       <button
//                         onClick={() => handleConfirmInsert(false)}
//                         className="bg-gradient-to-r from-rose-500 to-red-600 text-white px-6 py-3 rounded-xl font-medium shadow hover:scale-105 transition"
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   )}

//                   {response.intent === "query_update" && (
//                     <button
//                       onClick={() => navigate("/standups")}
//                       className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-medium shadow hover:scale-105 transition"
//                     >
//                       View Logs
//                     </button>
//                   )}

//                   {response.intent === "update_entry" && (
//                     <button
//                       onClick={() => navigate("/standups")}
//                       className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium shadow hover:scale-105 transition"
//                     >
//                       Edit Standup
//                     </button>
//                   )}

//                   {response.intent === "unknown" && (
//                     <p className="text-gray-400 italic text-center w-full">
//                       Couldn’t determine intent. Try rephrasing your message.
//                     </p>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Success */}
//             {confirmed && insertedData && (
//               <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl shadow-lg">
//                 <h3 className="text-xl font-semibold text-emerald-300 mb-2">
//                   Standup Saved Successfully
//                 </h3>
//                 <p className="text-gray-100">
//                   <strong>Intent:</strong> {insertedData.intent}
//                 </p>
//                 <ul className="list-disc list-inside text-gray-300 mt-2">
//                   {Object.entries(insertedData.entities).map(([key, val]) => (
//                     <li key={key}>
//                       <b>{key}</b>: {val}
//                     </li>
//                   ))}
//                 </ul>
//                 <p className="mt-3 text-gray-200">
//                   <strong>ID:</strong> {insertedData.standup_id}
//                 </p>
//                 <button
//                   onClick={() => navigate("/standups")}
//                   className="mt-5 bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 rounded-xl font-medium text-white hover:scale-105 transition"
//                 >
//                   View / Edit Standup
//                 </button>
//               </div>
//             )}

//             {/* Cancelled */}
//             {confirmed && !insertedData && (
//               <div className="bg-gray-600/20 border border-gray-500/30 p-5 rounded-2xl text-center">
//                 <h3 className="text-gray-300 font-medium">Entry not saved.</h3>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { MessageSquare, Send, History, CheckCircle2, AlertCircle } from "lucide-react";
import SideBar from "../components/Sidebar";

export default function FullPipeline() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.sidebar?.isOpen);
  const user = useSelector(state => state?.user?.user);

  const handleChat = async () => {
    if (!message.trim()) return;
    if (!user?._id) {
      setError("Please log in to update tasks.");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const res = await axios.post("http://127.0.0.1:5002/chat", {
        developer_id: user?._id,
        message: message,
      });

      setResponse(res.data);
      setMessage(""); // Clear input on success
    } catch (err) {
      setError("AI Service unreachable. Ensure Port 5002 is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-100 font-sans">
      <SideBar />
      
      <main className={`flex-1 transition-all duration-300 p-8 ${isOpen ? "ml-64" : "ml-20"}`}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              ScrumX AI Assistant
            </h1>
            <p className="text-slate-400 mt-2">Update your daily progress using natural language</p>
          </div>

          <div className="grid gap-6">
            {/* Input Card */}
            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-3xl shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-blue-400 font-semibold">
                <MessageSquare size={20} />
                <span>What have you worked on today?</span>
              </div>
              
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Example: I finished the login API and started working on the sidebar..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition h-32 resize-none"
              />

              <button
                onClick={handleChat}
                disabled={loading || !message.trim()}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                {loading ? "Analyzing..." : <><Send size={18} /> Update Standup</>}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-2xl flex items-center gap-3 text-red-400">
                <AlertCircle size={20} />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* AI Response Card */}
            {response && (
              <div className="bg-slate-800/80 border border-blue-500/30 p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold text-lg">
                  <CheckCircle2 size={24} />
                  <span>AI Processing Result</span>
                </div>
                
                <div className="text-slate-200 whitespace-pre-line leading-relaxed text-lg italic">
                  {response.reply}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700 flex flex-wrap gap-4">
                  <button 
                    onClick={() => navigate("/standups")}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition"
                  >
                    <History size={16} /> View Standup History
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}