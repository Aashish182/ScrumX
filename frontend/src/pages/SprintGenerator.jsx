// import React, { useState } from "react";
// import axios from "axios";
// import { Loader2 } from "lucide-react";
// import { useSelector } from "react-redux";
// import Sidebar from "../components/Sidebar";

// export default function SprintGeneration() {
//   const [projectName, setProjectName] = useState("");
//   const [projectDesc, setProjectDesc] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState("");
//   const isOpen = useSelector((state) => state.sidebar.isOpen);

//   const handleGenerate = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.post("http://localhost:5000/generate_sprint", {
//         project_name: projectName,
//         project_description: projectDesc,
//       });
//       setResponse(res.data);
//     } catch (err) {
//       setError(err.response?.data?.error || "Error generating sprint");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#121212] text-white">
//       <Sidebar />
//       <main className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
//         {/* Header */}
//         <header className="flex items-center justify-between px-6 py-4 bg-[#1b1b1b] border-b border-gray-700">
//           <h2 className="text-2xl font-bold text-blue-400">🌀 Sprint Generator</h2>
//         </header>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-3xl mx-auto bg-[#1f1f1f] border border-white/10 rounded-2xl shadow-lg p-6">
//             <label className="block mb-2 font-medium">Project Name</label>
//             <input
//               value={projectName}
//               onChange={(e) => setProjectName(e.target.value)}
//               placeholder="Enter project name..."
//               className="w-full p-3 mb-4 rounded-lg bg-[#2a2a2a] text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
//             />

//             <label className="block mb-2 font-medium">Project Description</label>
//             <textarea
//               value={projectDesc}
//               onChange={(e) => setProjectDesc(e.target.value)}
//               placeholder="Describe the project..."
//               className="w-full p-3 h-28 rounded-lg bg-[#2a2a2a] text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
//             />

//             <button
//               onClick={handleGenerate}
//               disabled={loading}
//               className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 rounded-lg text-white font-semibold hover:scale-105 transition-all flex items-center justify-center"
//             >
//               {loading ? <Loader2 className="animate-spin mr-2" /> : "Generate Sprint"}
//             </button>

//             {error && <p className="text-red-400 mt-4">{error}</p>}

//             {response && (
//               <div className="mt-6 bg-[#2a2a2a] p-6 rounded-2xl border border-white/10">
//                 <h3 className="text-xl font-semibold text-blue-300">Sprint Details:</h3>
//                 <pre className="text-gray-200 mt-3 overflow-auto text-sm max-h-96">
//                   {JSON.stringify(response.sprint_details, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import axios from "axios";
// import { Loader2, Plus, Trash2 } from "lucide-react";
// import { useSelector } from "react-redux";
// import SideBar from "../components/Sidebar";

// export default function SprintGeneration() {
//   const isOpen = useSelector((state) => state.sidebar.isOpen);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [response, setResponse] = useState(null);

//   const [form, setForm] = useState({
//     project_id: 1,
//     sprint_name: "",
//     sprint_length_days: 10,
//     team_size: 4
//   });

//   const [stories, setStories] = useState([
//     { story_id: "US1", title: "", description: "", priority: "High" }
//   ]);

//   const handleStoryChange = (index, field, value) => {
//     const updated = [...stories];
//     updated[index][field] = value;
//     setStories(updated);
//   };

//   const addStory = () => {
//     setStories([
//       ...stories,
//       { story_id: `US${stories.length + 1}`, title: "", description: "", priority: "Medium" }
//     ]);
//   };

//   const removeStory = (index) => {
//     setStories(stories.filter((_, i) => i !== index));
//   };

//   const handleGenerate = async () => {
//     setLoading(true);
//     setError("");
//     setResponse(null);

//     try {
//       const res = await axios.post("http://localhost:5000/generate_sprint", {
//         ...form,
//         user_stories: stories
//       });

//       setResponse(res.data);
//     } catch (err) {
//       setError(err.response?.data?.error || "Failed to generate sprint");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#121212] text-white">
//       <SideBar />
//       <main
//         className={`flex-1 transition-all duration-300 ${
//           isOpen ? "ml-64" : "ml-20"
//         }`}
//       >
//         {/* Header */}
//         <header className="px-6 py-4 bg-[#1b1b1b] border-b border-gray-700">
//           <h2 className="text-2xl font-bold text-blue-400">🌀 Sprint Generator</h2>
//         </header>

//         <div className="p-6 max-w-5xl mx-auto space-y-6">
//           {/* Sprint Details */}
//           <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10">
//             <h3 className="text-lg font-semibold mb-4 text-blue-300">
//               Sprint Configuration
//             </h3>

//             <input
//               placeholder="Sprint Name"
//               className="w-full p-3 mb-3 rounded bg-[#2a2a2a] border border-gray-600"
//               value={form.sprint_name}
//               onChange={(e) =>
//                 setForm({ ...form, sprint_name: e.target.value })
//               }
//             />

//             <div className="grid grid-cols-1 gap-4">
//               <p>Number Of Days:</p><input
//                 type="number"
//                 placeholder="Sprint Length (days)"
//                 className="p-3 rounded bg-[#2a2a2a] border border-gray-600"
//                 value={form.sprint_length_days}
//                 onChange={(e) =>
//                   setForm({ ...form, sprint_length_days: Number(e.target.value) })
//                 }
//               />
//               <p>Team Size:</p>
//               <input
//                 type="number"
//                 placeholder="Team Size"
//                 className="p-3 rounded bg-[#2a2a2a] border border-gray-600"
//                 value={form.team_size}
//                 onChange={(e) =>
//                   setForm({ ...form, team_size: Number(e.target.value) })
//                 }
//               />
//             </div>
//           </div>

//           {/* User Stories */}
//           <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10">
//             <h3 className="text-lg font-semibold mb-4 text-blue-300">
//               User Stories
//             </h3>

//             {stories.map((story, index) => (
//               <div
//                 key={index}
//                 className="mb-4 p-4 bg-[#2a2a2a] rounded-xl border border-gray-700"
//               >
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="font-semibold">{story.story_id}</span>
//                   {stories.length > 1 && (
//                     <Trash2
//                       onClick={() => removeStory(index)}
//                       className="cursor-pointer text-red-400 hover:text-red-600"
//                     />
//                   )}
//                 </div>

//                 <input
//                   placeholder="Story Title"
//                   className="w-full p-2 mb-2 rounded bg-[#1f1f1f]"
//                   value={story.title}
//                   onChange={(e) =>
//                     handleStoryChange(index, "title", e.target.value)
//                   }
//                 />

//                 <textarea
//                   placeholder="Story Description"
//                   className="w-full p-2 mb-2 rounded bg-[#1f1f1f]"
//                   value={story.description}
//                   onChange={(e) =>
//                     handleStoryChange(index, "description", e.target.value)
//                   }
//                 />

//                 <select
//                   className="p-2 rounded bg-[#1f1f1f]"
//                   value={story.priority}
//                   onChange={(e) =>
//                     handleStoryChange(index, "priority", e.target.value)
//                   }
//                 >
//                   <option>High</option>
//                   <option>Medium</option>
//                   <option>Low</option>
//                 </select>
//               </div>
//             ))}

//             <button
//               onClick={addStory}
//               className="flex items-center text-blue-400 hover:text-blue-600"
//             >
//               <Plus className="mr-2" /> Add Story
//             </button>
//           </div>

//           {/* Generate Button */}
//           <button
//             onClick={handleGenerate}
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-xl font-semibold flex items-center justify-center hover:scale-105 transition"
//           >
//             {loading ? <Loader2 className="animate-spin mr-2" /> : "Generate Sprint"}
//           </button>

//           {/* Response */}
//           {error && <p className="text-red-400">{error}</p>}

//           {response && (
//             <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10">
//               <h3 className="text-xl font-semibold text-green-400 mb-2">
//                 Sprint Created Successfully ✅
//               </h3>
//               <p>
//                 <strong>Sprint ID:</strong> {response.sprint_id}
//               </p>
//               <p className="mt-2">
//                 <strong>Goal:</strong> {response.goal}
//               </p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import axios from "axios";
// import { Loader2, Plus, Trash2 } from "lucide-react";
// import { useSelector } from "react-redux";
// import SideBar from "../components/Sidebar";

// export default function SprintGeneration() {
//   const isOpen = useSelector((state) => state.sidebar?.isOpen);
  
//   // Safe selector with multiple fallbacks
//   const user = useSelector((state) => state.auth?.user || state.login?.user || {}); 
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [response, setResponse] = useState(null);

//   const [form, setForm] = useState({
//     // 2. Ensure this is a string that can be converted to an ObjectId
//     project_id: "65b2f1a2c3d4e5f6a7b8c9d0", 
//     sprint_name: "",
//     sprint_length_days: 10,
//     team_size: 4
//   });

//   const [stories, setStories] = useState([
//     { story_id: "US1", title: "", description: "", priority: "High" }
//   ]);

//   const handleStoryChange = (index, field, value) => {
//     const updated = [...stories];
//     updated[index][field] = value;
//     setStories(updated);
//   };

//   const addStory = () => {
//     setStories([
//       ...stories,
//       { story_id: `US${stories.length + 1}`, title: "", description: "", priority: "Medium" }
//     ]);
//   };

//   const removeStory = (index) => {
//     setStories(stories.filter((_, i) => i !== index));
//   };

//   const handleGenerate = async () => {
//     setLoading(true);
//     setError("");
//     setResponse(null);

//     try {
//       // 3. Updated URL to Port 5001 and added developer_id
//       const res = await axios.post("http://localhost:5001/generate_sprint", {
//         ...form,
//         developer_id: user?._id || user?.id, // Added this line
//         user_stories: stories
//       });

//       setResponse(res.data);
//     } catch (err) {
//       // Improved error logging
//       console.error("Sprint Gen Error:", err);
//       setError(err.response?.data?.error || "Failed to generate sprint. Is Port 5001 running?");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#121212] text-white">
//       <SideBar />
//       <main className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
//         <header className="px-6 py-4 bg-[#1b1b1b] border-b border-gray-700">
//           <h2 className="text-2xl font-bold text-blue-400">🌀 Sprint Generator</h2>
//         </header>

//         <div className="p-6 max-w-5xl mx-auto space-y-6">
//           {/* Sprint Details */}
//           <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10">
//             <h3 className="text-lg font-semibold mb-4 text-blue-300">Sprint Configuration</h3>
//             <input
//               placeholder="Sprint Name"
//               className="w-full p-3 mb-3 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:border-blue-500"
//               value={form.sprint_name}
//               onChange={(e) => setForm({ ...form, sprint_name: e.target.value })}
//             />
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Number Of Days:</label>
//                 <input
//                   type="number"
//                   className="w-full p-3 rounded bg-[#2a2a2a] border border-gray-600"
//                   value={form.sprint_length_days}
//                   onChange={(e) => setForm({ ...form, sprint_length_days: Number(e.target.value) })}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Team Size:</label>
//                 <input
//                   type="number"
//                   className="w-full p-3 rounded bg-[#2a2a2a] border border-gray-600"
//                   value={form.team_size}
//                   onChange={(e) => setForm({ ...form, team_size: Number(e.target.value) })}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* User Stories */}
//           <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10">
//             <h3 className="text-lg font-semibold mb-4 text-blue-300">User Stories</h3>
//             {stories.map((story, index) => (
//               <div key={index} className="mb-4 p-4 bg-[#2a2a2a] rounded-xl border border-gray-700">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="font-semibold text-blue-400">{story.story_id}</span>
//                   {stories.length > 1 && (
//                     <Trash2
//                       onClick={() => removeStory(index)}
//                       className="cursor-pointer text-red-400 hover:text-red-600 w-5 h-5"
//                     />
//                   )}
//                 </div>
//                 <input
//                   placeholder="Story Title"
//                   className="w-full p-2 mb-2 rounded bg-[#1f1f1f] border border-gray-700"
//                   value={story.title}
//                   onChange={(e) => handleStoryChange(index, "title", e.target.value)}
//                 />
//                 <textarea
//                   placeholder="Story Description"
//                   className="w-full p-2 mb-2 rounded bg-[#1f1f1f] border border-gray-700"
//                   value={story.description}
//                   onChange={(e) => handleStoryChange(index, "description", e.target.value)}
//                 />
//                 <select
//                   className="p-2 rounded bg-[#1f1f1f] border border-gray-700 text-sm"
//                   value={story.priority}
//                   onChange={(e) => handleStoryChange(index, "priority", e.target.value)}
//                 >
//                   <option>High</option>
//                   <option>Medium</option>
//                   <option>Low</option>
//                 </select>
//               </div>
//             ))}
//             <button
//               onClick={addStory}
//               className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium transition"
//             >
//               <Plus className="mr-1 w-4 h-4" /> Add Another Story
//             </button>
//           </div>

//           {/* Generate Button */}
//           <button
//             onClick={handleGenerate}
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-xl font-bold flex items-center justify-center hover:opacity-90 transition disabled:opacity-50"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="animate-spin mr-2" />
//                 AI is breaking down tasks...
//               </>
//             ) : (
//               "Generate AI Sprint"
//             )}
//           </button>

//           {/* Feedback */}
//           {error && (
//             <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200">
//               {error}
//             </div>
//           )}

//           {response && (
//             <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-green-500/30 animate-in fade-in zoom-in">
//               <h3 className="text-xl font-bold text-green-400 mb-2 flex items-center">
//                 Sprint Created Successfully ✅
//               </h3>
//               <div className="space-y-1 text-gray-300">
//                 <p><strong>Sprint ID:</strong> <span className="text-white">{response.sprint_id}</span></p>
//                 {response.goal && <p><strong>Goal:</strong> <span className="text-white">{response.goal}</span></p>}
//                 <p className="text-sm text-gray-500 mt-2 italic">
//                   AI has populated your Task and Subtask boards automatically.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, Plus, Trash2, Send } from "lucide-react";
import { useSelector } from "react-redux";
import SideBar from "../components/Sidebar";
import SummaryApi from "../common";

export default function SprintGeneration() {
  const isOpen = useSelector((state) => state.sidebar?.isOpen);
  const user = useSelector((state) => state.auth?.user || state.login?.user || {}); 
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);

  // --- NEW STATE FOR DYNAMIC ASSIGNMENT ---
  const [assignments, setAssignments] = useState([]);
  const [teamMembers, setTeamMembers] = useState([
    { id: "dev_01", name: "John (Dev)" },
    { id: "test_01", name: "Sarah (Tester)" },
    { id: "analyst_01", name: "Mike (Analyst)" }
  ]);

  const [form, setForm] = useState({
    project_id: "65b2f1a2c3d4e5f6a7b8c9d0", 
    sprint_name: "",
    sprint_length_days: 10,
    team_size: 4
  });

  const [stories, setStories] = useState([
    { story_id: "US1", title: "", description: "", priority: "High" }
  ]);

  const handleStoryChange = (index, field, value) => {
    const updated = [...stories];
    updated[index][field] = value;
    setStories(updated);
  };

  const addStory = () => {
    setStories([
      ...stories,
      { story_id: `US${stories.length + 1}`, title: "", description: "", priority: "Medium" }
    ]);
  };

  const removeStory = (index) => {
    setStories(stories.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await axios.post("http://localhost:5001/generate_sprint", {
        ...form,
        developer_id: user?._id || user?.id,
        user_stories: stories
      });

      setResponse(res.data);

      // Map generated tasks for assignment
      if (res.data.tasks) {
        setAssignments(res.data.tasks.map(t => ({ 
          task_id: t.id, 
          title: t.title, 
          assigned_to: "", 
          role: "Developer" 
        })));
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to generate sprint.");
    } finally {
      setLoading(false);
    }
  };

  // --- NEW FUNCTION TO SEND NOTIFICATIONS ---
  const sendNotifications = async () => {
    try {
      setLoading(true);
      setLoading(true);
    await axios({
        url: SummaryApi.sendSubtaskNotifications.url,
        method: SummaryApi.sendSubtaskNotifications.method, // "POST"
        data: {
            sprint_id: response.sprint_id,
            assignments: assignments
        },
        withCredentials: true 
    });
      alert("Notifications sent to all selected members!");
    } catch (err) {
      setError("Failed to send notifications.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#121212] text-white">
      <SideBar />
      <main className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
        <header className="px-6 py-4 bg-[#1b1b1b] border-b border-gray-700">
          <h2 className="text-2xl font-bold text-blue-400">🌀 Sprint Generator</h2>
        </header>

        <div className="p-6 max-w-5xl mx-auto space-y-6">
          {/* Sprint Details */}
          <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Sprint Configuration</h3>
            <input
              placeholder="Sprint Name"
              className="w-full p-3 mb-3 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:border-blue-500"
              value={form.sprint_name}
              onChange={(e) => setForm({ ...form, sprint_name: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Number Of Days:</label>
                <input
                  type="number"
                  className="w-full p-3 rounded bg-[#2a2a2a] border border-gray-600"
                  value={form.sprint_length_days}
                  onChange={(e) => setForm({ ...form, sprint_length_days: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Team Size:</label>
                <input
                  type="number"
                  className="w-full p-3 rounded bg-[#2a2a2a] border border-gray-600"
                  value={form.team_size}
                  onChange={(e) => setForm({ ...form, team_size: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>

          {/* User Stories */}
          <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-blue-300">User Stories</h3>
            {stories.map((story, index) => (
              <div key={index} className="mb-4 p-4 bg-[#2a2a2a] rounded-xl border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-blue-400">{story.story_id}</span>
                  {stories.length > 1 && (
                    <Trash2
                      onClick={() => removeStory(index)}
                      className="cursor-pointer text-red-400 hover:text-red-600 w-5 h-5"
                    />
                  )}
                </div>
                <input
                  placeholder="Story Title"
                  className="w-full p-2 mb-2 rounded bg-[#1f1f1f] border border-gray-700"
                  value={story.title}
                  onChange={(e) => handleStoryChange(index, "title", e.target.value)}
                />
                <textarea
                  placeholder="Story Description"
                  className="w-full p-2 mb-2 rounded bg-[#1f1f1f] border border-gray-700"
                  value={story.description}
                  onChange={(e) => handleStoryChange(index, "description", e.target.value)}
                />
                <select
                  className="p-2 rounded bg-[#1f1f1f] border border-gray-700 text-sm"
                  value={story.priority}
                  onChange={(e) => handleStoryChange(index, "priority", e.target.value)}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            ))}
            <button
              onClick={addStory}
              className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium transition"
            >
              <Plus className="mr-1 w-4 h-4" /> Add Another Story
            </button>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-xl font-bold flex items-center justify-center hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Generate AI Sprint"}
          </button>

          {/* Feedback & Assignment Area */}
          {error && (
            <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200">
              {error}
            </div>
          )}

          {response && (
            <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-green-500/30 animate-in fade-in zoom-in">
              <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
                Sprint Generated! Now Assign Tasks ✅
              </h3>
              
              {/* Dynamic Task List for Assignment */}
              <div className="space-y-4">
                {assignments.map((task, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row gap-3 p-3 bg-[#2a2a2a] rounded-lg border border-gray-700">
                    <div className="flex-1 text-sm">{task.title}</div>
                    <div className="flex gap-2">
                      <select 
                        className="bg-[#121212] text-xs p-1 rounded border border-gray-600"
                        onChange={(e) => {
                          const newAs = [...assignments];
                          newAs[idx].role = e.target.value;
                          setAssignments(newAs);
                        }}
                      >
                        <option>Developer</option>
                        <option>Tester</option>
                        <option>Analyst</option>
                      </select>
                      <select 
                        className="bg-[#121212] text-xs p-1 rounded border border-blue-500 text-blue-400"
                        onChange={(e) => {
                          const newAs = [...assignments];
                          newAs[idx].assigned_to = e.target.value;
                          setAssignments(newAs);
                        }}
                      >
                        <option value="">Select Member</option>
                        {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={sendNotifications}
                className="mt-6 w-full bg-green-400 hover:bg-green-500 p-3 rounded-xl font-bold transition flex items-center justify-center"
              >
                <Send className="mr-2 w-4 h-4"/> Notify Team Members
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}