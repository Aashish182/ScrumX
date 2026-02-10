
// // import React, { useState } from "react";
// // import { Search, Bell, Calendar, CheckCircle } from "lucide-react";
// // import SideBar from "../components/Temp";
// // import { useSelector } from "react-redux";
// // import { ChevronLeft, ChevronRight } from "lucide-react";
// // import daily from '../asset/daily.jpg';
// // import person from '../asset/person.jpg';
// // import metric from '../asset/metric.jpg';
// // import discuss from '../asset/discuss.jpg';
// // import meeting from '../asset/meeting.jpg';

// // const DeveloperHome = () => {
// //   const isOpen = useSelector((state) => state.sidebar.isOpen);
// //   const [currentMonth, setCurrentMonth] = useState(new Date());

// //   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// //   const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
// //   const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
// //   const daysInMonth = endOfMonth.getDate();
// //   const startDay = startOfMonth.getDay();

// //   const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
// //   const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
// //   const monthYear = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

// //   const events = [
// //     { date: 3, title: "Retrospective", subtitle: "Sprint 10 Feedback", status: "Scheduled" },
// //     { date: 10, title: "Action Items Review", subtitle: "Check progress", status: "Pending" },
// //     { date: 22, title: "Team Feedback Meeting", subtitle: "Discuss improvements", status: "Planned" },
// //   ];

// //   return (
// //     <div className="flex min-h-screen bg-[#121212] text-white">
// //       <SideBar />

// //       <main className={`flex-1 flex flex-col ${isOpen ? "ml-64" : "ml-20"}`}>
// //         {/* Header */}
// //         <header className="flex items-center justify-between px-6 py-4 bg-[#1b1b1b] border-b border-gray-700">
// //           <h1 className="text-2xl font-bold">Retrospectives</h1>
// //           <div className="flex items-center gap-4">
// //             <div className="relative">
// //               <Search className="absolute top-2.5 left-2.5 text-gray-400" size={18} />
// //               <input
// //                 type="text"
// //                 placeholder="Search retrospectives"
// //                 className="pl-8 pr-3 py-2 rounded-md bg-[#2a2a2a] text-sm text-white placeholder-gray-400 focus:outline-none"
// //               />
// //             </div>
// //             <Bell className="cursor-pointer text-gray-300 hover:text-white" />
// //             <Calendar className="cursor-pointer text-gray-300 hover:text-white" />
// //           </div>
// //         </header>

// //         {/* Body */}
// //         <div className="flex flex-1 overflow-hidden">
// //           {/* Left: Top Cards + Calendar */}
// //           <div className="flex-1 p-6 overflow-y-auto">
// //             {/* Top Cards */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
// //               {[
// //                 { title: "Daily Standup", subtitle: "Share updates", status: "Session 1/5", img: daily },
// //                 { title: "Retrospective", subtitle: "What went well?", status: "Session 2/5", img: person },
// //                 { title: "Team Metrics", subtitle: "Review progress", status: "Weekly report", img: metric },
// //                 { title: "Feedback Session", subtitle: "Discuss with AI Bot", status: "Scheduled", img: discuss },
// //               ].map((card, i) => (
// //                 <div key={i} className="bg-[#1f1f1f] rounded-xl p-4 shadow hover:bg-[#2a2a2a]">
// //                   <img src={card.img} alt={card.title} className="w-full h-24 object-cover rounded-lg mb-3" />
// //                   <h2 className="font-semibold">{card.title}</h2>
// //                   <p className="text-sm text-gray-400">{card.subtitle}</p>
// //                   <div className="mt-2 text-xs text-gray-500">{card.status}</div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Calendar Section */}
// //             <div className="p-6 bg-[#1f1f1f] rounded-xl shadow-lg">
// //               <div className="flex justify-between items-center mb-4">
// //                 <button onClick={prevMonth} className="p-2 rounded-full hover:bg-[#2a2a2a]"><ChevronLeft size={20} className="text-gray-400" /></button>
// //                 <h2 className="text-lg font-semibold text-white">{monthYear}</h2>
// //                 <button onClick={nextMonth} className="p-2 rounded-full hover:bg-[#2a2a2a]"><ChevronRight size={20} className="text-gray-400" /></button>
// //               </div>

// //               <div className="grid grid-cols-7 text-center text-sm mb-2 font-semibold text-gray-400">
// //                 {daysOfWeek.map((day, i) => <div key={i} className="py-1">{day}</div>)}
// //               </div>

// //               <div className="grid grid-cols-7 gap-2 text-sm">
// //                 {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
// //                 {Array.from({ length: daysInMonth }, (_, i) => {
// //                   const dayNumber = i + 1;
// //                   const today = new Date();
// //                   const isToday = today.getDate() === dayNumber && today.getMonth() === currentMonth.getMonth() && today.getFullYear() === currentMonth.getFullYear();
// //                   const event = events.find(e => e.date === dayNumber);

// //                   return (
// //                     <div key={i} className={`p-2 rounded-lg transition cursor-pointer flex flex-col items-start ${isToday ? "bg-blue-600 text-white font-bold shadow-md" : "bg-[#2a2a2a] hover:bg-[#374151] text-gray-300"}`}>
// //                       <div className="text-xs font-semibold mb-1">{dayNumber}</div>
// //                       {event && (
// //                         <div className="bg-[#111111] text-white text-xs rounded-md p-1 w-full shadow-inner">
// //                           <div className="font-semibold">{event.title}</div>
// //                           <div className="text-gray-400">{event.subtitle}</div>
// //                           <div className="text-gray-500 text-[10px]">{event.status}</div>
// //                         </div>
// //                       )}
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Sidebar */}
// //           <aside className="w-80 bg-[#1b1b1b] border-l border-gray-700 p-6 flex flex-col gap-6 overflow-y-auto">
// //             {/* Current Retrospective */}
// //             <div>
// //               <h3 className="font-semibold mb-3">Current Retrospective</h3>
// //               <div className="bg-[#2a2a2a] p-4 rounded-lg">
// //                 <img src={meeting} alt="Retrospective" className="w-full h-28 object-cover rounded mb-3" />
// //                 <p className="text-sm font-medium">Sprint 10 Feedback</p>
// //                 <p className="text-xs text-gray-400">Participants: 12/15 · In Progress</p>
// //               </div>
// //             </div>

// //             {/* Performance Metrics */}
// //             <div>
// //               <h3 className="font-semibold mb-3">Performance</h3>
// //               <ul className="space-y-2 text-sm">
// //                 <li className="flex justify-between bg-[#2a2a2a] p-3 rounded-md">
// //                   <span>Team Engagement</span>
// //                   <span className="text-green-400">85%</span>
// //                 </li>
// //                 <li className="flex justify-between bg-[#2a2a2a] p-3 rounded-md">
// //                   <span>Blockers Identified</span>
// //                   <span className="text-red-400">3</span>
// //                 </li>
// //                 <li className="flex justify-between bg-[#2a2a2a] p-3 rounded-md">
// //                   <span>Action Items</span>
// //                   <span className="text-yellow-400">5</span>
// //                 </li>
// //               </ul>
// //             </div>

// //             {/* Inbox */}
// //             <div>
// //               <h3 className="font-semibold mb-3">Inbox</h3>
// //               <div className="bg-[#2a2a2a] p-4 rounded-lg flex items-start gap-2">
// //                 <CheckCircle className="text-green-400 mt-0.5" size={18} />
// //                 <p className="text-sm">
// //                   Retrospective summary is ready! <br />
// //                   <span className="text-xs text-gray-400">For assistance, contact the AI Bot.</span>
// //                 </p>
// //               </div>
// //             </div>
// //           </aside>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default DeveloperHome;


// import React, { useState, useEffect, useRef } from "react";
// import SideBar from "../components/Sidebar";
// import { useSelector } from "react-redux";
// import { UserCheck, CheckSquare, Clock, AlertTriangle } from "lucide-react";

// const DeveloperHome = () => {
//   const isOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector((state) => state.user.user);

//   const [standupStarted, setStandupStarted] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [botTyping, setBotTyping] = useState(false);

//   const chatEndRef = useRef(null);

//   const botQuestions = [
//     "Hi! What did you work on yesterday? 💻",
//     "Any blockers or challenges you faced? ⚠️",
//     "What are your tasks for today? 📅",
//   ];

//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, botTyping]);

//   const handleStartStandup = () => {
//     setStandupStarted(true);
//     setBotTyping(true);
//     setTimeout(() => {
//       setMessages([{ sender: "bot", text: botQuestions[0], time: new Date() }]);
//       setBotTyping(false);
//     }, 1000);
//   };

//   const handleSendMessage = () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input, time: new Date() };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     if (questionIndex + 1 < botQuestions.length) {
//       setBotTyping(true);
//       setTimeout(() => {
//         setQuestionIndex((prev) => prev + 1);
//         const botMessage = {
//           sender: "bot",
//           text: botQuestions[questionIndex + 1],
//           time: new Date(),
//         };
//         setMessages((prev) => [...prev, botMessage]);
//         setBotTyping(false);
//       }, 1200);
//     } else {
//       setBotTyping(true);
//       setTimeout(() => {
//         const botMessage = {
//           sender: "bot",
//           text: "🎉 Great! Your daily standup is complete. Have a productive day!",
//           time: new Date(),
//         };
//         setMessages((prev) => [...prev, botMessage]);
//         setBotTyping(false);
//       }, 1200);
//     }
//   };

//   const formatTime = (date) => {
//     const d = new Date(date);
//     return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
//       <SideBar />

//       <main className={`flex-1 ${isOpen ? "ml-64" : "ml-20"} p-6`}>
//         {!standupStarted ? (
//           <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-10 rounded-xl shadow-2xl w-full max-w-2xl mx-auto mt-12 text-center animate-fade-in">
//             <UserCheck size={50} className="mx-auto mb-4 text-green-400" />
//             <h1 className="text-4xl font-bold mb-4 text-green-400">
//               Hi {user?.name || "Developer"}!
//             </h1>
//             <p className="text-lg mb-6 text-gray-300">
//               I hope you completed your tasks yesterday. ✅
//             </p>
//             <p className="text-lg mb-6 text-gray-300">
//               Can we start the daily standup to acknowledge your project progress?
//             </p>
//             <button
//               onClick={handleStartStandup}
//               className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
//             >
//               Start Daily Standup
//             </button>
//           </div>
//         ) : (
//           <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-2xl mx-auto mt-12 flex flex-col h-[600px]">
//             <h1 className="text-3xl font-bold mb-4 flex items-center gap-2 text-green-400">
//               <CheckSquare size={28} /> Daily Standup
//             </h1>
//             <div className="flex-1 overflow-y-auto mb-4 flex flex-col space-y-3 px-2">
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`flex ${
//                     msg.sender === "user" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div className="flex items-end gap-2">
//                     {msg.sender === "bot" && (
//                       <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-black font-bold">
//                         B
//                       </div>
//                     )}
//                     <div
//                       className={`p-3 rounded-lg max-w-[70%] shadow-md relative ${
//                         msg.sender === "user"
//                           ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
//                           : "bg-gray-700 text-white border-l-4 border-green-400"
//                       }`}
//                     >
//                       <span>{msg.text}</span>
//                       <span className="absolute text-xs text-gray-300 bottom-1 right-2">
//                         {formatTime(msg.time)}
//                       </span>
//                     </div>
//                     {msg.sender === "user" && (
//                       <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
//                         {user?.name?.charAt(0) || "U"}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}

//               {botTyping && (
//                 <div className="flex justify-start items-center gap-2">
//                   <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-black font-bold">
//                     B
//                   </div>
//                   <div className="bg-gray-700 text-white p-3 rounded-lg max-w-[40%] relative animate-pulse">
//                     <span className="flex space-x-1">
//                       <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
//                       <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></span>
//                       <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-400"></span>
//                     </span>
//                   </div>
//                 </div>
//               )}
//               <div ref={chatEndRef}></div>
//             </div>

//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 className="flex-1 p-3 rounded-lg bg-gray-700 text-white focus:outline-none placeholder-gray-400"
//                 placeholder="Type your answer..."
//                 onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-green-500 hover:bg-green-600 px-4 py-3 rounded-lg font-semibold transition-transform transform hover:scale-105"
//               >
//                 Send
//               </button>
//             </div>

//             <div className="flex justify-between mt-2 text-gray-400 text-sm">
//               <span>
//                 <Clock size={16} /> Scrum Bot
//               </span>
//               <span>
//                 <AlertTriangle size={16} /> Standup Reminder
//               </span>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default DeveloperHome;




// import React, { useState, useEffect } from "react";
// import { Search, Bell, Calendar, CheckCircle, Layout, Flame, Zap, ChevronLeft, ChevronRight, MessageSquare, Clock } from "lucide-react";
// import SideBar from "../components/Sidebar";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import SummaryApi from "../common";
// import { NavLink } from "react-router-dom";

// const DeveloperDashboard = () => {
//   // 1. REDUX STATE
//   const isOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector((state) => state?.user?.user);

//   // 2. COMPONENT STATE
//   const [dbData, setDbData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   // 3. CALENDAR CALCULATIONS (Defined inside the component scope)
//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
//   const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
//   const daysInMonth = endOfMonth.getDate();
//   const startDay = startOfMonth.getDay();

//   const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
//   const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
//   const monthYear = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

//   // 4. DATABASE FETCH
//   useEffect(() => {
//     if (user?._id) {
//         fetchDevData();
//     }
//   }, [user, currentMonth]); // Refetch if month changes

//   const fetchDevData = async () => {
//     try {
//       // Note: Replace with your actual endpoint from SummaryApi
//       const res = await axios.get(`${SummaryApi.dev_stats.url}/${user._id}`);
//       if (res.data.success) {
//         setDbData(res.data.data);
//       }
//     } catch (err) {
//       console.error("Dashboard Load Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 5. DATA MAPPING
//   const topCards = [
//     { 
//       title: "Active Sprint", 
//       subtitle: dbData?.activeSprint?.sprintName || "Sprint #14", 
//       status: "4 Days Left", 
//       icon: <Zap className="text-yellow-400" /> 
//     },
//     { 
//       title: "My Tasks", 
//       subtitle: "Sprint Allocation", 
//       status: `${dbData?.stats?.totalTasks || 0} Tasks Total`, 
//       icon: <Layout className="text-blue-400" /> 
//     },
//     { 
//       title: "Blockers", 
//       subtitle: "Action Required", 
//       status: `${dbData?.stats?.blockers || 0} Active`, 
//       icon: <Flame className="text-red-400" /> 
//     },
//     { 
//         title: "Velocity", 
//         subtitle: "Last 3 Sprints", 
//         status: "Avg: 12pts", 
//         icon: <CheckCircle className="text-green-400" /> 
//     },
//   ];

//   if (loading) return <div className="min-h-screen bg-[#121212] flex items-center justify-center text-blue-500 font-bold tracking-widest animate-pulse text-xs uppercase">Initialising Mission Control...</div>;

//   return (
//     <div className="flex min-h-screen bg-[#121212] text-white">
//       <SideBar />

//       <main className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
//         {/* Header */}
//         <header className="flex items-center justify-between px-6 py-4 bg-[#1b1b1b] border-b border-gray-700">
//           <div>
//             <h1 className="text-2xl font-bold">Developer Mission Control</h1>
//             <p className="text-xs text-gray-400 uppercase tracking-tighter">Viewing as: {user?.role?.replace('_', ' ') || "Developer"}</p>
//           </div>
//           <div className="flex items-center gap-6">
//             <div className="relative hidden md:block">
//               <Search className="absolute top-2.5 left-2.5 text-gray-400" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search tasks..."
//                 className="pl-9 pr-4 py-2 rounded-md bg-[#2a2a2a] text-sm text-white focus:outline-none border border-transparent focus:border-blue-500/50"
//               />
//             </div>
//           </div>
//         </header>

//         <div className="flex flex-1 overflow-hidden">
//           <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            
//             {/* Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//               {topCards.map((card, i) => (
//                 <div key={i} className="bg-[#1f1f1f] rounded-xl p-5 border border-white/5 group hover:bg-white/[0.02] transition-all shadow-lg">
//                   <div className="mb-3 p-2 w-fit bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">{card.icon}</div>
//                   <h2 className="font-semibold text-gray-200">{card.title}</h2>
//                   <p className="text-sm text-gray-400">{card.subtitle}</p>
//                   <div className="mt-2 text-xs font-bold text-blue-500">{card.status}</div>
//                 </div>
//               ))}
//             </div>

//             {/* Calendar */}
//             <div className="p-6 bg-[#1f1f1f] rounded-xl shadow-lg border border-white/5">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-lg font-bold flex items-center gap-2">
//                   <Calendar size={20} className="text-blue-500" /> Sprint Timeline
//                 </h2>
//                 <div className="flex items-center gap-3">
//                   <button onClick={prevMonth} className="p-1.5 rounded-md hover:bg-[#2a2a2a] bg-[#121212] border border-white/5"><ChevronLeft size={18}/></button>
//                   <span className="text-sm font-medium w-32 text-center text-gray-300">{monthYear}</span>
//                   <button onClick={nextMonth} className="p-1.5 rounded-md hover:bg-[#2a2a2a] bg-[#121212] border border-white/5"><ChevronRight size={18}/></button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-7 text-center text-[10px] mb-3 font-bold text-gray-500 uppercase tracking-widest">
//                 {daysOfWeek.map((day) => <div key={day}>{day}</div>)}
//               </div>

//               <div className="grid grid-cols-7 gap-2">
//                 {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
//                 {Array.from({ length: daysInMonth }, (_, i) => {
//                   const day = i + 1;
//                   const dayEvents = dbData?.monthlyTasks?.filter(t => new Date(t.dueDate).getDate() === day);
//                   const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth.getMonth();

//                   return (
//                     <div key={i} className={`min-h-[90px] p-2 rounded-lg border transition-all ${isToday ? "border-blue-500 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-white/5 bg-[#262626]"}`}>
//                       <span className={`text-xs font-bold ${isToday ? "text-blue-400" : "text-gray-500"}`}>{day}</span>
//                       {dayEvents?.map((event, idx) => (
//                         <div key={idx} className="mt-1 bg-blue-600/20 border border-blue-500/30 rounded p-1.5 text-[9px] text-blue-100 truncate">
//                           {event.title}
//                         </div>
//                       ))}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar */}
//           <aside className="w-80 bg-[#1b1b1b] border-l border-gray-700 p-6 hidden xl:flex flex-col gap-8 overflow-y-auto custom-scrollbar">
//             {/* 1. FOCUS TASK & TRACKER */}
//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Focus Task</h3>
//                 <span className="text-[10px] font-bold text-blue-500 px-2 py-0.5 bg-blue-500/10 rounded-full">ACTIVE</span>
//               </div>
              
//               {dbData?.stats?.focusTask ? (
//                 <div className="bg-[#2a2a2a] p-4 rounded-2xl border border-white/5 shadow-inner">
//                   <p className="text-sm font-bold text-white mb-1">{dbData.stats.focusTask.title}</p>
//                   <p className="text-[10px] text-gray-500 mb-4 flex items-center gap-1">
//                     <Clock size={10} /> 2h 15m logged today
//                   </p>
                  
//                   <div className="space-y-2">
//                     <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
//                       <div className="bg-blue-500 h-full w-[65%] shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
//                     </div>
//                     <div className="flex justify-between items-center text-[9px] font-bold">
//                       <span className="text-gray-500">PROGRESS</span>
//                       <span className="text-blue-400">65%</span>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-6 border-2 border-dashed border-white/5 rounded-2xl">
//                   <p className="text-xs text-gray-500 italic">No task in focus</p>
//                   <button className="mt-2 text-[10px] text-blue-500 font-bold hover:underline">Pick a task</button>
//                 </div>
//               )}
//             </div>

//             {/* 2. PULL REQUESTS MONITOR */}
//             <div>
//               <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Pull Requests</h3>
//               <div className="space-y-3">
//                 {[
//                   { id: 'PR-102', title: 'Auth Fix', status: 'Reviewing', color: 'text-yellow-500' },
//                   { id: 'PR-105', title: 'Nav UI', status: 'Approved', color: 'text-green-500' }
//                 ].map((pr) => (
//                   <div key={pr.id} className="group flex items-center justify-between p-3 bg-[#232323] hover:bg-[#2a2a2a] rounded-xl border border-white/5 transition-colors cursor-pointer">
//                     <div>
//                       <p className="text-[11px] font-bold text-gray-200 group-hover:text-white">{pr.id}</p>
//                       <p className="text-[10px] text-gray-500">{pr.title}</p>
//                     </div>
//                     <span className={`text-[9px] font-black uppercase ${pr.color}`}>{pr.status}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* 3. UPCOMING MILESTONES */}
//             <div>
//               <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Upcoming</h3>
//               <div className="space-y-4">
//                 <div className="flex gap-3">
//                   <div className="flex flex-col items-center">
//                     <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
//                     <div className="w-px h-full bg-gray-800" />
//                   </div>
//                   <div>
//                     <p className="text-[11px] font-bold text-gray-300">Sprint Demo</p>
//                     <p className="text-[10px] text-gray-500">Tomorrow, 10:00 AM</p>
//                   </div>
//                 </div>
//                 <div className="flex gap-3">
//                   <div className="flex flex-col items-center">
//                     <div className="w-2 h-2 rounded-full bg-gray-600 mt-1.5" />
//                   </div>
//                   <div>
//                     <p className="text-[11px] font-bold text-gray-300">Code Freeze</p>
//                     <p className="text-[10px] text-gray-500">Friday, Jan 12</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* 4. QUICK ACTIONS UTILITY */}
//             <div className="mt-4">
//               <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Utilities</h3>
//               <div className="grid grid-cols-2 gap-2">
                
//                 {/* Updated Team Chat Button */}
//                 <NavLink 
//                   to="/TeamMembers" 
//                   className="flex flex-col items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all group"
//                 >
//                   <MessageSquare size={16} className="text-gray-400 group-hover:text-blue-400 mb-1 transition-colors" />
//                   <span className="text-[9px] font-bold text-gray-400 group-hover:text-gray-200">TEAM CHAT</span>
//                 </NavLink>

//                 <button className="flex flex-col items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all group">
//                   <Layout size={16} className="text-gray-400 group-hover:text-purple-400 mb-1" />
//                   <span className="text-[9px] font-bold text-gray-400 group-hover:text-gray-200">DOCS</span>
//                 </button>
                
//               </div>
//             </div>

//             {/* 5. STANDUP BOT ACTION (Sticky Bottom) */}
//             <div className="mt-auto bg-gradient-to-br from-indigo-600 to-blue-700 p-5 rounded-2xl shadow-xl shadow-blue-900/20 relative overflow-hidden group">
//               <Zap className="absolute -right-4 -top-4 w-20 h-20 text-white/10 rotate-12 group-hover:scale-110 transition-transform" />
//               <div className="relative z-10">
//                 <div className="flex items-center gap-2 mb-2">
//                   <CheckCircle size={16} className="text-blue-200" />
//                   <p className="text-xs font-black text-white uppercase tracking-wider">Standup Ready</p>
//                 </div>
//                 <p className="text-[10px] text-blue-100/80 leading-relaxed mb-4">
//                   We've compiled your 2 PRs and 1 resolved blocker into a draft.
//                 </p>
//                 <button className="w-full bg-white text-blue-700 text-[10px] font-black py-2.5 rounded-lg uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-lg">
//                   Sync with Bot
//                 </button>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </main>
//     </div>
//   );
// };

// // CRITICAL: Ensure this is at the bottom
// export default DeveloperDashboard;



import React, { useState, useEffect, useRef } from "react";
import { Search, Bell, Calendar, CheckCircle, Layout, Flame, Zap, ChevronLeft, ChevronRight, MessageSquare, Clock, X, Check } from "lucide-react";
import SideBar from "../components/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import SummaryApi from "../common"; // Ensure this has our new routes
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify"; // Optional for feedback

const DeveloperDashboard = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector(state => state?.user?.user);

  // 1. STATE DEFINITIONS
  const [dbData, setDbData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef(null);

  // 2. CALENDAR CALCULATIONS (Fixes: daysOfWeek, startDay, daysInMonth, monthYear)
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const daysInMonth = endOfMonth.getDate();
  const startDay = startOfMonth.getDay();
  const monthYear = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // 3. CALENDAR NAVIGATION (Fixes: prevMonth, nextMonth)
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  // 4. DATA MAPPING (Fixes: topCards)
  const topCards = [
    { 
      title: "Active Sprint", 
      subtitle: dbData?.activeSprint?.sprintName || "Sprint #14", 
      status: "4 Days Left", 
      icon: <Zap className="text-yellow-400" /> 
    },
    { 
      title: "My Tasks", 
      subtitle: "Sprint Allocation", 
      status: `${dbData?.stats?.totalTasks || 0} Tasks Total`, 
      icon: <Layout className="text-blue-400" /> 
    },
    { 
      title: "Blockers", 
      subtitle: "Action Required", 
      status: `${dbData?.stats?.blockers || 0} Active`, 
      icon: <Flame className="text-red-400" /> 
    },
    { 
        title: "Velocity", 
        subtitle: "Last 3 Sprints", 
        status: "Avg: 12pts", 
        icon: <CheckCircle className="text-green-400" /> 
    },
  ];

  // 5. FETCH LOGIC (useEffect and functions)
  useEffect(() => {
    if (user?._id) {
      fetchDevData();
      fetchNotifications();
    }
  }, [user, currentMonth]);

  // Fetch "Pending" subtasks assigned to this user
  const fetchNotifications = async () => {
    try {
      const response = await axios({
          url: SummaryApi.getPendingInvitations.url,
          method: SummaryApi.getPendingInvitations.method,
          withCredentials: true 
      });
      if (response.data.success) {
        setNotifications(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching invitations", err);
    }
  };
  
  
  const note=user?._id; // Debugging line
  console.log("Current User ID (note):", note); // Debugging line
  const handleResponse = async (subtaskId, isAccepted) => {
    try {
      const response = await axios({
          url: SummaryApi.respondToSubtask.url,
          method: SummaryApi.respondToSubtask.method,
          data: { subtaskId, accept: isAccepted, userId: note },
          withCredentials: true
      });

      if (response.data.success) {
        // Remove from local list and refresh dashboard data
        setNotifications(prev => prev.filter(item => item._id !== subtaskId));
        fetchDevData(); 
        toast.success(isAccepted ? "Task Accepted!" : "Task Rejected");
      }
    } catch (err) {
      toast.error("Action failed");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ... (Your existing calendar calculations and fetchDevData remain the same)
  const fetchDevData = async () => { /* your existing code */ setLoading(false); };

  return (
    <div className="flex min-h-screen bg-[#121212] text-white">
      <SideBar />

      <main className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-[#1b1b1b] border-b border-gray-700 relative z-50">
          <div>
            <h1 className="text-2xl font-bold">Mission Control</h1>
            <p className="text-[10px] text-blue-500 font-bold uppercase">Role: {user?.role || "Developer"}</p>
          </div>

          <div className="flex items-center gap-6">
             {/* NOTIFICATION ICON WITH BADGE */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setShowNotif(!showNotif)}
                className="relative p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Bell size={22} />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-[#1b1b1b] animate-bounce">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* DROPDOWN MENU */}
              {showNotif && (
                <div className="absolute right-0 mt-3 w-80 bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-gray-700 bg-[#252525]">
                    <h3 className="text-sm font-bold">New Task Invitations</h3>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-500 text-xs italic">
                        No new tasks for now.
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div key={notif._id} className="p-4 border-b border-gray-800 hover:bg-white/[0.02] transition-colors">
                          <p className="text-xs font-bold text-blue-400 mb-1">{notif.title}</p>
                          <p className="text-[10px] text-gray-400 mb-3 line-clamp-2">{notif.description}</p>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleResponse(notif._id, true)}
                              className="flex-1 flex items-center justify-center gap-1 bg-green-600/20 text-green-500 text-[10px] font-bold py-1.5 rounded hover:bg-green-600 hover:text-white transition-all"
                            >
                              <Check size={12} /> ACCEPT
                            </button>
                            <button 
                              onClick={() => handleResponse(notif._id, false)}
                              className="flex-1 flex items-center justify-center gap-1 bg-red-600/20 text-red-500 text-[10px] font-bold py-1.5 rounded hover:bg-red-600 hover:text-white transition-all"
                            >
                              <X size={12} /> REJECT
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative hidden md:block">
              <Search className="absolute top-2.5 left-2.5 text-gray-400" size={18} />
              <input type="text" placeholder="Search tasks..." className="pl-9 pr-4 py-2 rounded-md bg-[#2a2a2a] text-sm focus:outline-none" />
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            
             {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {topCards.map((card, i) => (
                    <div key={i} className="bg-[#1f1f1f] rounded-xl p-5 border border-white/5 group hover:bg-white/[0.02] transition-all shadow-lg">
                      <div className="mb-3 p-2 w-fit bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">{card.icon}</div>
                      <h2 className="font-semibold text-gray-200">{card.title}</h2>
                      <p className="text-sm text-gray-400">{card.subtitle}</p>
                      <div className="mt-2 text-xs font-bold text-blue-500">{card.status}</div>
                    </div>
                  ))}
                </div>

                {/* Calendar */}
                <div className="p-6 bg-[#1f1f1f] rounded-xl shadow-lg border border-white/5">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <Calendar size={20} className="text-blue-500" /> Sprint Timeline
                    </h2>
                    <div className="flex items-center gap-3">
                      <button onClick={prevMonth} className="p-1.5 rounded-md hover:bg-[#2a2a2a] bg-[#121212] border border-white/5"><ChevronLeft size={18}/></button>
                      <span className="text-sm font-medium w-32 text-center text-gray-300">{monthYear}</span>
                      <button onClick={nextMonth} className="p-1.5 rounded-md hover:bg-[#2a2a2a] bg-[#121212] border border-white/5"><ChevronRight size={18}/></button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 text-center text-[10px] mb-3 font-bold text-gray-500 uppercase tracking-widest">
                    {daysOfWeek.map((day) => <div key={day}>{day}</div>)}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const day = i + 1;
                      const dayEvents = dbData?.monthlyTasks?.filter(t => new Date(t.dueDate).getDate() === day);
                      const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth.getMonth();

                      return (
                        <div key={i} className={`min-h-[90px] p-2 rounded-lg border transition-all ${isToday ? "border-blue-500 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-white/5 bg-[#262626]"}`}>
                          <span className={`text-xs font-bold ${isToday ? "text-blue-400" : "text-gray-500"}`}>{day}</span>
                          {dayEvents?.map((event, idx) => (
                            <div key={idx} className="mt-1 bg-blue-600/20 border border-blue-500/30 rounded p-1.5 text-[9px] text-blue-100 truncate">
                              {event.title}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <aside className="w-80 bg-[#1b1b1b] border-l border-gray-700 p-6 hidden xl:flex flex-col gap-8 overflow-y-auto custom-scrollbar">
                {/* 1. FOCUS TASK & TRACKER */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Focus Task</h3>
                    <span className="text-[10px] font-bold text-blue-500 px-2 py-0.5 bg-blue-500/10 rounded-full">ACTIVE</span>
                  </div>
                  
                  {dbData?.stats?.focusTask ? (
                    <div className="bg-[#2a2a2a] p-4 rounded-2xl border border-white/5 shadow-inner">
                      <p className="text-sm font-bold text-white mb-1">{dbData.stats.focusTask.title}</p>
                      <p className="text-[10px] text-gray-500 mb-4 flex items-center gap-1">
                        <Clock size={10} /> 2h 15m logged today
                      </p>
                      
                      <div className="space-y-2">
                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full w-[65%] shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-bold">
                          <span className="text-gray-500">PROGRESS</span>
                          <span className="text-blue-400">65%</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 border-2 border-dashed border-white/5 rounded-2xl">
                      <p className="text-xs text-gray-500 italic">No task in focus</p>
                      <button className="mt-2 text-[10px] text-blue-500 font-bold hover:underline">Pick a task</button>
                    </div>
                  )}
                </div>

                {/* 2. PULL REQUESTS MONITOR */}
                <div>
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Pull Requests</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'PR-102', title: 'Auth Fix', status: 'Reviewing', color: 'text-yellow-500' },
                      { id: 'PR-105', title: 'Nav UI', status: 'Approved', color: 'text-green-500' }
                    ].map((pr) => (
                      <div key={pr.id} className="group flex items-center justify-between p-3 bg-[#232323] hover:bg-[#2a2a2a] rounded-xl border border-white/5 transition-colors cursor-pointer">
                        <div>
                          <p className="text-[11px] font-bold text-gray-200 group-hover:text-white">{pr.id}</p>
                          <p className="text-[10px] text-gray-500">{pr.title}</p>
                        </div>
                        <span className={`text-[9px] font-black uppercase ${pr.color}`}>{pr.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. UPCOMING MILESTONES */}
                <div>
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Upcoming</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                        <div className="w-px h-full bg-gray-800" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-300">Sprint Demo</p>
                        <p className="text-[10px] text-gray-500">Tomorrow, 10:00 AM</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-gray-600 mt-1.5" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-300">Code Freeze</p>
                        <p className="text-[10px] text-gray-500">Friday, Jan 12</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. QUICK ACTIONS UTILITY */}
                <div className="mt-4">
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Utilities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    
                    {/* Updated Team Chat Button */}
                    <NavLink 
                      to="/TeamMembers" 
                      className="flex flex-col items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all group"
                    >
                      <MessageSquare size={16} className="text-gray-400 group-hover:text-blue-400 mb-1 transition-colors" />
                      <span className="text-[9px] font-bold text-gray-400 group-hover:text-gray-200">TEAM CHAT</span>
                    </NavLink>

                    <button className="flex flex-col items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all group">
                      <Layout size={16} className="text-gray-400 group-hover:text-purple-400 mb-1" />
                      <span className="text-[9px] font-bold text-gray-400 group-hover:text-gray-200">DOCS</span>
                    </button>
                    
                  </div>
                </div>

                {/* 5. STANDUP BOT ACTION (Sticky Bottom) */}
                <div className="mt-auto bg-gradient-to-br from-indigo-600 to-blue-700 p-5 rounded-2xl shadow-xl shadow-blue-900/20 relative overflow-hidden group">
                  <Zap className="absolute -right-4 -top-4 w-20 h-20 text-white/10 rotate-12 group-hover:scale-110 transition-transform" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={16} className="text-blue-200" />
                      <p className="text-xs font-black text-white uppercase tracking-wider">Standup Ready</p>
                    </div>
                    <p className="text-[10px] text-blue-100/80 leading-relaxed mb-4">
                      We've compiled your 2 PRs and 1 resolved blocker into a draft.
                    </p>
                    <button className="w-full bg-white text-blue-700 text-[10px] font-black py-2.5 rounded-lg uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-lg">
                      Sync with Bot
                    </button>
                  </div>
                </div>
              </aside>
            </div>
      </main>
    </div>
  );
};

export default DeveloperDashboard;