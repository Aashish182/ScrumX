
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



// import React, { useState, useEffect, useRef } from "react";
// import { Search, Bell, Calendar, CheckCircle, Layout, Flame, Zap, ChevronLeft, ChevronRight, MessageSquare, Clock, X, Check } from "lucide-react";
// import SideBar from "../components/Sidebar";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import SummaryApi from "../common"; // Ensure this has our new routes
// import { NavLink } from "react-router-dom";
// import { toast } from "react-toastify"; // Optional for feedback

// const DeveloperDashboard = () => {
//   const isOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector(state => state?.user?.user);

//   // 1. STATE DEFINITIONS
//   const [dbData, setDbData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [notifications, setNotifications] = useState([]);
//   const [showNotif, setShowNotif] = useState(false);
//   const notifRef = useRef(null);

//   // 2. CALENDAR CALCULATIONS (Fixes: daysOfWeek, startDay, daysInMonth, monthYear)
//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
//   const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
//   const daysInMonth = endOfMonth.getDate();
//   const startDay = startOfMonth.getDay();
//   const monthYear = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

//   // 3. CALENDAR NAVIGATION (Fixes: prevMonth, nextMonth)
//   const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
//   const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

//   // 4. DATA MAPPING (Fixes: topCards)
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

//   // 5. FETCH LOGIC (useEffect and functions)
//   useEffect(() => {
//     if (user?._id) {
//       fetchDevData();
//       fetchNotifications();
//     }
//   }, [user, currentMonth]);

//   // Fetch "Pending" subtasks assigned to this user
//   const fetchNotifications = async () => {
//     try {
//       const response = await axios({
//           url: SummaryApi.getPendingInvitations.url,
//           method: SummaryApi.getPendingInvitations.method,
//           withCredentials: true 
//       });
//       if (response.data.success) {
//         setNotifications(response.data.data);
//       }
//     } catch (err) {
//       console.error("Error fetching invitations", err);
//     }
//   };
  
  
//   const note=user?._id; // Debugging line
//   console.log("Current User ID (note):", note); // Debugging line
//   const handleResponse = async (subtaskId, isAccepted) => {
//     try {
//       const response = await axios({
//           url: SummaryApi.respondToSubtask.url,
//           method: SummaryApi.respondToSubtask.method,
//           data: { subtaskId, accept: isAccepted, userId: note },
//           withCredentials: true
//       });

//       if (response.data.success) {
//         // Remove from local list and refresh dashboard data
//         setNotifications(prev => prev.filter(item => item._id !== subtaskId));
//         fetchDevData(); 
//         toast.success(isAccepted ? "Task Accepted!" : "Task Rejected");
//       }
//     } catch (err) {
//       toast.error("Action failed");
//     }
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (notifRef.current && !notifRef.current.contains(event.target)) {
//         setShowNotif(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ... (Your existing calendar calculations and fetchDevData remain the same)
//   const fetchDevData = async () => { /* your existing code */ setLoading(false); };

//   return (
//     <div className="flex min-h-screen bg-[#121212] text-white">
//       <SideBar />

//       <main className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
//         {/* Header */}
//         <header className="flex items-center justify-between px-6 py-4 bg-[#1b1b1b] border-b border-gray-700 relative z-50">
//           <div>
//             <h1 className="text-2xl font-bold">Mission Control</h1>
//             <p className="text-[10px] text-blue-500 font-bold uppercase">Role: {user?.role || "Developer"}</p>
//           </div>

//           <div className="flex items-center gap-6">
//              {/* NOTIFICATION ICON WITH BADGE */}
//             <div className="relative" ref={notifRef}>
//               <button 
//                 onClick={() => setShowNotif(!showNotif)}
//                 className="relative p-2 text-gray-400 hover:text-white transition-colors"
//               >
//                 <Bell size={22} />
//                 {notifications.length > 0 && (
//                   <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-[#1b1b1b] animate-bounce">
//                     {notifications.length}
//                   </span>
//                 )}
//               </button>

//               {/* DROPDOWN MENU */}
//               {showNotif && (
//                 <div className="absolute right-0 mt-3 w-80 bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
//                   <div className="p-4 border-b border-gray-700 bg-[#252525]">
//                     <h3 className="text-sm font-bold">New Task Invitations</h3>
//                   </div>
                  
//                   <div className="max-h-96 overflow-y-auto">
//                     {notifications.length === 0 ? (
//                       <div className="p-8 text-center text-gray-500 text-xs italic">
//                         No new tasks for now.
//                       </div>
//                     ) : (
//                       notifications.map((notif) => (
//                         <div key={notif._id} className="p-4 border-b border-gray-800 hover:bg-white/[0.02] transition-colors">
//                           <p className="text-xs font-bold text-blue-400 mb-1">{notif.title}</p>
//                           <p className="text-[10px] text-gray-400 mb-3 line-clamp-2">{notif.description}</p>
//                           <div className="flex gap-2">
//                             <button 
//                               onClick={() => handleResponse(notif._id, true)}
//                               className="flex-1 flex items-center justify-center gap-1 bg-green-600/20 text-green-500 text-[10px] font-bold py-1.5 rounded hover:bg-green-600 hover:text-white transition-all"
//                             >
//                               <Check size={12} /> ACCEPT
//                             </button>
//                             <button 
//                               onClick={() => handleResponse(notif._id, false)}
//                               className="flex-1 flex items-center justify-center gap-1 bg-red-600/20 text-red-500 text-[10px] font-bold py-1.5 rounded hover:bg-red-600 hover:text-white transition-all"
//                             >
//                               <X size={12} /> REJECT
//                             </button>
//                           </div>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="relative hidden md:block">
//               <Search className="absolute top-2.5 left-2.5 text-gray-400" size={18} />
//               <input type="text" placeholder="Search tasks..." className="pl-9 pr-4 py-2 rounded-md bg-[#2a2a2a] text-sm focus:outline-none" />
//             </div>
//           </div>
//         </header>

//         <div className="flex flex-1 overflow-hidden">
//           <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            
//              {/* Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//               {topCards.map((card, i) => (
//                     <div key={i} className="bg-[#1f1f1f] rounded-xl p-5 border border-white/5 group hover:bg-white/[0.02] transition-all shadow-lg">
//                       <div className="mb-3 p-2 w-fit bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">{card.icon}</div>
//                       <h2 className="font-semibold text-gray-200">{card.title}</h2>
//                       <p className="text-sm text-gray-400">{card.subtitle}</p>
//                       <div className="mt-2 text-xs font-bold text-blue-500">{card.status}</div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Calendar */}
//                 <div className="p-6 bg-[#1f1f1f] rounded-xl shadow-lg border border-white/5">
//                   <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-lg font-bold flex items-center gap-2">
//                       <Calendar size={20} className="text-blue-500" /> Sprint Timeline
//                     </h2>
//                     <div className="flex items-center gap-3">
//                       <button onClick={prevMonth} className="p-1.5 rounded-md hover:bg-[#2a2a2a] bg-[#121212] border border-white/5"><ChevronLeft size={18}/></button>
//                       <span className="text-sm font-medium w-32 text-center text-gray-300">{monthYear}</span>
//                       <button onClick={nextMonth} className="p-1.5 rounded-md hover:bg-[#2a2a2a] bg-[#121212] border border-white/5"><ChevronRight size={18}/></button>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-7 text-center text-[10px] mb-3 font-bold text-gray-500 uppercase tracking-widest">
//                     {daysOfWeek.map((day) => <div key={day}>{day}</div>)}
//                   </div>

//                   <div className="grid grid-cols-7 gap-2">
//                     {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
//                     {Array.from({ length: daysInMonth }, (_, i) => {
//                       const day = i + 1;
//                       const dayEvents = dbData?.monthlyTasks?.filter(t => new Date(t.dueDate).getDate() === day);
//                       const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth.getMonth();

//                       return (
//                         <div key={i} className={`min-h-[90px] p-2 rounded-lg border transition-all ${isToday ? "border-blue-500 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-white/5 bg-[#262626]"}`}>
//                           <span className={`text-xs font-bold ${isToday ? "text-blue-400" : "text-gray-500"}`}>{day}</span>
//                           {dayEvents?.map((event, idx) => (
//                             <div key={idx} className="mt-1 bg-blue-600/20 border border-blue-500/30 rounded p-1.5 text-[9px] text-blue-100 truncate">
//                               {event.title}
//                             </div>
//                           ))}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>

//               {/* Right Sidebar */}
//               <aside className="w-80 bg-[#1b1b1b] border-l border-gray-700 p-6 hidden xl:flex flex-col gap-8 overflow-y-auto custom-scrollbar">
//                 {/* 1. FOCUS TASK & TRACKER */}
//                 <div>
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Focus Task</h3>
//                     <span className="text-[10px] font-bold text-blue-500 px-2 py-0.5 bg-blue-500/10 rounded-full">ACTIVE</span>
//                   </div>
                  
//                   {dbData?.stats?.focusTask ? (
//                     <div className="bg-[#2a2a2a] p-4 rounded-2xl border border-white/5 shadow-inner">
//                       <p className="text-sm font-bold text-white mb-1">{dbData.stats.focusTask.title}</p>
//                       <p className="text-[10px] text-gray-500 mb-4 flex items-center gap-1">
//                         <Clock size={10} /> 2h 15m logged today
//                       </p>
                      
//                       <div className="space-y-2">
//                         <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
//                           <div className="bg-blue-500 h-full w-[65%] shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
//                         </div>
//                         <div className="flex justify-between items-center text-[9px] font-bold">
//                           <span className="text-gray-500">PROGRESS</span>
//                           <span className="text-blue-400">65%</span>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="text-center py-6 border-2 border-dashed border-white/5 rounded-2xl">
//                       <p className="text-xs text-gray-500 italic">No task in focus</p>
//                       <button className="mt-2 text-[10px] text-blue-500 font-bold hover:underline">Pick a task</button>
//                     </div>
//                   )}
//                 </div>

//                 {/* 2. PULL REQUESTS MONITOR */}
//                 <div>
//                   <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Pull Requests</h3>
//                   <div className="space-y-3">
//                     {[
//                       { id: 'PR-102', title: 'Auth Fix', status: 'Reviewing', color: 'text-yellow-500' },
//                       { id: 'PR-105', title: 'Nav UI', status: 'Approved', color: 'text-green-500' }
//                     ].map((pr) => (
//                       <div key={pr.id} className="group flex items-center justify-between p-3 bg-[#232323] hover:bg-[#2a2a2a] rounded-xl border border-white/5 transition-colors cursor-pointer">
//                         <div>
//                           <p className="text-[11px] font-bold text-gray-200 group-hover:text-white">{pr.id}</p>
//                           <p className="text-[10px] text-gray-500">{pr.title}</p>
//                         </div>
//                         <span className={`text-[9px] font-black uppercase ${pr.color}`}>{pr.status}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* 3. UPCOMING MILESTONES */}
//                 <div>
//                   <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Upcoming</h3>
//                   <div className="space-y-4">
//                     <div className="flex gap-3">
//                       <div className="flex flex-col items-center">
//                         <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
//                         <div className="w-px h-full bg-gray-800" />
//                       </div>
//                       <div>
//                         <p className="text-[11px] font-bold text-gray-300">Sprint Demo</p>
//                         <p className="text-[10px] text-gray-500">Tomorrow, 10:00 AM</p>
//                       </div>
//                     </div>
//                     <div className="flex gap-3">
//                       <div className="flex flex-col items-center">
//                         <div className="w-2 h-2 rounded-full bg-gray-600 mt-1.5" />
//                       </div>
//                       <div>
//                         <p className="text-[11px] font-bold text-gray-300">Code Freeze</p>
//                         <p className="text-[10px] text-gray-500">Friday, Jan 12</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* 4. QUICK ACTIONS UTILITY */}
//                 <div className="mt-4">
//                   <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Utilities</h3>
//                   <div className="grid grid-cols-2 gap-2">
                    
//                     {/* Updated Team Chat Button */}
//                     <NavLink 
//                       to="/TeamMembers" 
//                       className="flex flex-col items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all group"
//                     >
//                       <MessageSquare size={16} className="text-gray-400 group-hover:text-blue-400 mb-1 transition-colors" />
//                       <span className="text-[9px] font-bold text-gray-400 group-hover:text-gray-200">TEAM CHAT</span>
//                     </NavLink>

//                     <button className="flex flex-col items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all group">
//                       <Layout size={16} className="text-gray-400 group-hover:text-purple-400 mb-1" />
//                       <span className="text-[9px] font-bold text-gray-400 group-hover:text-gray-200">DOCS</span>
//                     </button>
                    
//                   </div>
//                 </div>

//                 {/* 5. STANDUP BOT ACTION (Sticky Bottom) */}
//                 <div className="mt-auto bg-gradient-to-br from-indigo-600 to-blue-700 p-5 rounded-2xl shadow-xl shadow-blue-900/20 relative overflow-hidden group">
//                   <Zap className="absolute -right-4 -top-4 w-20 h-20 text-white/10 rotate-12 group-hover:scale-110 transition-transform" />
//                   <div className="relative z-10">
//                     <div className="flex items-center gap-2 mb-2">
//                       <CheckCircle size={16} className="text-blue-200" />
//                       <p className="text-xs font-black text-white uppercase tracking-wider">Standup Ready</p>
//                     </div>
//                     <p className="text-[10px] text-blue-100/80 leading-relaxed mb-4">
//                       We've compiled your 2 PRs and 1 resolved blocker into a draft.
//                     </p>
//                     <button className="w-full bg-white text-blue-700 text-[10px] font-black py-2.5 rounded-lg uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-lg">
//                       Sync with Bot
//                     </button>
//                   </div>
//                 </div>
//               </aside>
//             </div>
//       </main>
//     </div>
//   );
// };

// export default DeveloperDashboard;


// import React, { useState, useEffect, useRef } from "react";
// import { Search, Bell, Calendar, CheckCircle, Layout, Flame, Zap, ChevronLeft, ChevronRight, MessageSquare, Clock, X, Check, XCircle } from "lucide-react";
// import SideBar from "../components/Sidebar";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import SummaryApi from "../common"; 
// import { NavLink } from "react-router-dom";
// import { toast } from "react-toastify";

// const DeveloperDashboard = () => {
//   const isOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector(state => state?.user?.user);

//   // 1. STATE DEFINITIONS
//   const [dbData, setDbData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [notifications, setNotifications] = useState([]);
//   const [showNotif, setShowNotif] = useState(false);
//   const notifRef = useRef(null);

//   // 2. CALENDAR CALCULATIONS
//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
//   const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
//   const daysInMonth = endOfMonth.getDate();
//   const startDay = startOfMonth.getDay();
//   const monthYear = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

//   const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
//   const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

//   // 3. FETCH LOGIC
//   const fetchDevData = async () => {
//     try {
//       const response = await axios({
//         url: SummaryApi.getDeveloperDashboardData.url,
//         method: SummaryApi.getDeveloperDashboardData.method,
//         withCredentials: true,
//       });
//       if (response.data.success) setDbData(response.data.data);
//     } catch (err) { console.error("Data fetch error", err); }
//     finally { setLoading(false); }
//   };

//   const fetchNotifications = async () => {
//     try {
//       const response = await axios({
//           url: SummaryApi.getPendingInvitations.url,
//           method: SummaryApi.getPendingInvitations.method,
//           withCredentials: true 
//       });
//       if (response.data.success) setNotifications(response.data.data);
//     } catch (err) { console.error("Error fetching invitations", err); }
//   };

//   useEffect(() => {
//     if (user?._id) {
//       fetchDevData();
//       fetchNotifications();
//     }
//   }, [user, currentMonth]);

//   // 4. FOCUS & HANDSHAKE HANDLERS
//   const handleToggleFocus = async (taskId, currentFocusStatus) => {
//     try {
//       const newStatus = currentFocusStatus === "yes" ? "no" : "yes";
//       const response = await axios({
//         url: SummaryApi.updateFocusTask.url,
//         method: SummaryApi.updateFocusTask.method,
//         data: { taskId, focus: newStatus },
//         withCredentials: true 
//       });

//       if (response.data.success) {
//         toast.success(newStatus === "yes" ? "Task Focused" : "Focus Removed");
//         fetchDevData(); 
//       }
//     } catch (err) { toast.error("Failed to update focus"); }
//   };

//   const handleResponse = async (subtaskId, isAccepted) => {
//     try {
//       const response = await axios({
//           url: SummaryApi.respondToSubtask.url,
//           method: SummaryApi.respondToSubtask.method,
//           data: { subtaskId, accept: isAccepted, userId: user?._id },
//           withCredentials: true
//       });
//       if (response.data.success) {
//         setNotifications(prev => prev.filter(item => item._id !== subtaskId));
//         fetchDevData(); 
//         toast.success(isAccepted ? "Task Accepted!" : "Task Rejected");
//       }
//     } catch (err) { toast.error("Action failed"); }
//   };

//   // Close notifications on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotif(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const topCards = [
//     { title: "Active Sprint", subtitle: dbData?.activeSprint?.sprintName || "Idle", status: `${dbData?.activeSprint?.daysLeft || 0} Days Left`, icon: <Zap className="text-yellow-400" /> },
//     { title: "My Tasks", subtitle: "Sprint Allocation", status: `${dbData?.stats?.totalTasks || 0} Tasks Total`, icon: <Layout className="text-blue-400" /> },
//     { title: "Blockers", subtitle: "Action Required", status: `${dbData?.stats?.blockers || 0} Active`, icon: <Flame className="text-red-400" /> },
//     { title: "Velocity", subtitle: "Last 3 Sprints", status: "Avg: 12pts", icon: <CheckCircle className="text-green-400" /> },
//   ];

//   return (
//     <div className="flex min-h-screen bg-[#121212] text-white">
//       <SideBar />

//       <main className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
//         {/* Header */}
//         <header className="flex items-center justify-between px-6 py-4 bg-[#1b1b1b] border-b border-gray-700 relative z-50">
//           <div>
//             <h1 className="text-2xl font-bold">Mission Control</h1>
//             <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Role: {user?.role || "Developer"}</p>
//           </div>

//           <div className="flex items-center gap-6">
//             <div className="relative" ref={notifRef}>
//               <button onClick={() => setShowNotif(!showNotif)} className="relative p-2 text-gray-400 hover:text-white transition-colors">
//                 <Bell size={22} />
//                 {notifications.length > 0 && (
//                   <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-[#1b1b1b] animate-bounce">
//                     {notifications.length}
//                   </span>
//                 )}
//               </button>

//               {showNotif && (
//                 <div className="absolute right-0 mt-3 w-80 bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
//                   <div className="p-4 border-b border-gray-700 bg-[#252525]"><h3 className="text-sm font-bold">New Task Invitations</h3></div>
//                   <div className="max-h-96 overflow-y-auto">
//                     {notifications.length === 0 ? (
//                       <div className="p-8 text-center text-gray-500 text-xs italic">No new tasks for now.</div>
//                     ) : (
//                       notifications.map((notif) => (
//                         <div key={notif._id} className="p-4 border-b border-gray-800 hover:bg-white/[0.02]">
//                           <p className="text-xs font-bold text-blue-400 mb-1">{notif.title}</p>
//                           <div className="flex gap-2 mt-3">
//                             <button onClick={() => handleResponse(notif._id, true)} className="flex-1 flex items-center justify-center gap-1 bg-green-600/20 text-green-500 text-[10px] font-bold py-1.5 rounded hover:bg-green-600 hover:text-white transition-all"><Check size={12} /> ACCEPT</button>
//                             <button onClick={() => handleResponse(notif._id, false)} className="flex-1 flex items-center justify-center gap-1 bg-red-600/20 text-red-500 text-[10px] font-bold py-1.5 rounded hover:bg-red-600 hover:text-white transition-all"><X size={12} /> REJECT</button>
//                           </div>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="relative hidden md:block">
//               <Search className="absolute top-2.5 left-2.5 text-gray-400" size={18} />
//               <input type="text" placeholder="Search tasks..." className="pl-9 pr-4 py-2 rounded-md bg-[#2a2a2a] text-sm focus:outline-none border border-white/5" />
//             </div>
//           </div>
//         </header>

//         <div className="flex flex-1 overflow-hidden">
//           {/* Main Dashboard Area */}
//           <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
//             {/* Top Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//               {topCards.map((card, i) => (
//                 <div key={i} className="bg-[#1b1b1b] rounded-xl p-5 border border-white/5 group hover:bg-white/[0.02] transition-all shadow-lg">
//                   <div className="mb-3 p-2 w-fit bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">{card.icon}</div>
//                   <h2 className="font-semibold text-gray-200">{card.title}</h2>
//                   <p className="text-sm text-gray-400">{card.subtitle}</p>
//                   <div className="mt-2 text-xs font-bold text-blue-500 tracking-tighter">{card.status}</div>
//                 </div>
//               ))}
//             </div>

//             {/* Calendar View */}
//             <div className="p-6 bg-[#1b1b1b] rounded-xl shadow-lg border border-white/5">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-lg font-bold flex items-center gap-2"><Calendar size={20} className="text-blue-500" /> Sprint Timeline</h2>
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
//                   const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
//                   const dayEvents = dbData?.monthlyTasks?.filter(t => new Date(t.created_at).toDateString() === dateObj.toDateString());
//                   const isToday = new Date().toDateString() === dateObj.toDateString();

//                   return (
//                     <div key={i} className={`min-h-[100px] p-2 rounded-lg border transition-all ${isToday ? "border-blue-500 bg-blue-500/5 shadow-inner" : "border-white/5 bg-[#232323]"}`}>
//                       <span className={`text-xs font-bold ${isToday ? "text-blue-400" : "text-gray-600"}`}>{day}</span>
//                       <div className="mt-1 space-y-1">
//                         {dayEvents?.map((event, idx) => (
//                           <div 
//                             key={idx} 
//                             onClick={() => handleToggleFocus(event._id, event.focus)}
//                             className={`p-1.5 text-[9px] font-bold rounded cursor-pointer truncate transition-all border-l-2
//                               ${event.focus === 'yes' ? 'bg-blue-600 text-white border-white scale-105 shadow-md' : 'bg-blue-600/10 border-blue-500/50 text-blue-100 hover:bg-blue-600/20'}`}
//                           >
//                             {event.title}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar */}
//           <aside className="w-80 bg-[#1b1b1b] border-l border-gray-700 p-6 hidden xl:flex flex-col gap-8 overflow-y-auto custom-scrollbar">
//             {/* Focus Task Section */}
//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Focus Task</h3>
//                 {dbData?.stats?.focusTask && <span className="text-[9px] font-bold text-blue-500 px-2 py-0.5 bg-blue-500/10 rounded-full animate-pulse">ACTIVE</span>}
//               </div>
              
//               {dbData?.stats?.focusTask ? (
//                 <div className="bg-[#232323] p-5 rounded-2xl border border-white/5 shadow-xl relative group">
//                   <button 
//                     onClick={() => handleToggleFocus(dbData.stats.focusTask._id, "yes")}
//                     className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition-colors"
//                   >
//                     <XCircle size={16} />
//                   </button>
//                   <p className="text-sm font-bold text-white mb-1 pr-4">{dbData.stats.focusTask.title}</p>
//                   <p className="text-[10px] text-gray-500 mb-4 flex items-center gap-1"><Clock size={10} /> Active Session</p>
                  
//                   <div className="space-y-2">
//                     <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
//                       <div className="bg-blue-500 h-full shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-1000" style={{ width: `${dbData.stats.focusTask.percent_complete}%` }} />
//                     </div>
//                     <div className="flex justify-between items-center text-[9px] font-bold">
//                       <span className="text-gray-500 uppercase">Progress</span>
//                       <span className="text-blue-400">{dbData.stats.focusTask.percent_complete}%</span>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-10 border-2 border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
//                   <p className="text-xs text-gray-600 italic">No task in focus</p>
//                   <p className="text-[9px] text-gray-700 mt-1 uppercase font-bold tracking-tighter">Select from calendar</p>
//                 </div>
//               )}
//             </div>

//             {/* PR Monitor (Mock Data as requested) */}
//             <div>
//               <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Pull Requests</h3>
//               <div className="space-y-3">
//                 {[
//                   { id: 'PR-102', title: 'Auth Fix', status: 'Reviewing', color: 'text-yellow-500' },
//                   { id: 'PR-105', title: 'Nav UI', status: 'Approved', color: 'text-green-500' }
//                 ].map((pr) => (
//                   <div key={pr.id} className="group flex items-center justify-between p-3 bg-[#232323] hover:bg-[#2a2a2a] rounded-xl border border-white/5 transition-colors">
//                     <div>
//                       <p className="text-[11px] font-bold text-gray-200 group-hover:text-blue-400">{pr.id}</p>
//                       <p className="text-[10px] text-gray-500">{pr.title}</p>
//                     </div>
//                     <span className={`text-[9px] font-black uppercase ${pr.color}`}>{pr.status}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Utilities */}
//             <div className="mt-4">
//               <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Utilities</h3>
//               <div className="grid grid-cols-2 gap-2">
//                 <NavLink to="/TeamMembers" className="flex flex-col items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all group">
//                   <MessageSquare size={16} className="text-gray-400 group-hover:text-blue-400 mb-1" />
//                   <span className="text-[9px] font-bold text-gray-400 group-hover:text-gray-200 uppercase">Chat</span>
//                 </NavLink>
//                 <button className="flex flex-col items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all group">
//                   <Layout size={16} className="text-gray-400 group-hover:text-purple-400 mb-1" />
//                   <span className="text-[9px] font-bold text-gray-400 group-hover:text-gray-200 uppercase">Docs</span>
//                 </button>
//               </div>
//             </div>

//             {/* Sticky Bottom Standup */}
//             <div className="mt-auto bg-gradient-to-br from-indigo-600 to-blue-700 p-5 rounded-2xl shadow-xl relative overflow-hidden group">
//               <Zap className="absolute -right-4 -top-4 w-20 h-20 text-white/10 rotate-12 group-hover:scale-110 transition-transform" />
//               <div className="relative z-10">
//                 <div className="flex items-center gap-2 mb-2">
//                   <CheckCircle size={16} className="text-blue-200" />
//                   <p className="text-xs font-black text-white uppercase">Standup Ready</p>
//                 </div>
//                 <p className="text-[10px] text-blue-100/80 leading-relaxed mb-4">We've compiled your activity into a draft update.</p>
//                 <button className="w-full bg-white text-blue-700 text-[10px] font-black py-2.5 rounded-lg uppercase tracking-widest hover:bg-blue-50 transition-colors">Sync with Bot</button>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DeveloperDashboard;



// import React, { useState, useEffect, useRef } from "react";
// import { 
//   Search, Bell, Calendar, CheckCircle, Layout, Flame, Zap, 
//   ChevronLeft, ChevronRight, MessageSquare, Clock, X, Check, 
//   XCircle, Terminal, Coffee, Activity, Code2, ExternalLink
// } from "lucide-react";
// import SideBar from "../components/Sidebar";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import SummaryApi from "../common"; 
// import { NavLink } from "react-router-dom";
// import { toast } from "react-toastify";

// const DeveloperDashboard = () => {
//   const isOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector(state => state?.user?.user);

//   const [dbData, setDbData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [notifications, setNotifications] = useState([]);
//   const [showNotif, setShowNotif] = useState(false);
//   const notifRef = useRef(null);

//   // Calendar logic
//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
//   const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
//   const daysInMonth = endOfMonth.getDate();
//   const startDay = startOfMonth.getDay();
//   const monthYear = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

//   const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
//   const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

//   const fetchDevData = async () => {
//     try {
//       const response = await axios({
//         url: SummaryApi.getDeveloperDashboardData.url,
//         method: SummaryApi.getDeveloperDashboardData.method,
//         withCredentials: true,
//       });
//       if (response.data.success) setDbData(response.data.data);
//     } catch (err) { console.error("Data fetch error", err); }
//     finally { setLoading(false); }
//   };

//   const fetchNotifications = async () => {
//     try {
//       const response = await axios({
//           url: SummaryApi.getPendingInvitations.url,
//           method: SummaryApi.getPendingInvitations.method,
//           withCredentials: true 
//       });
//       if (response.data.success) setNotifications(response.data.data);
//     } catch (err) { console.error("Error fetching invitations", err); }
//   };

//   useEffect(() => {
//     if (user?._id) {
//       fetchDevData();
//       fetchNotifications();
//     }
//   }, [user, currentMonth]);

//   const handleToggleFocus = async (taskId, currentFocusStatus) => {
//     try {
//       const newStatus = currentFocusStatus === "yes" ? "no" : "yes";
//       const response = await axios({
//         url: SummaryApi.updateFocusTask.url,
//         method: SummaryApi.updateFocusTask.method,
//         data: { taskId, focus: newStatus },
//         withCredentials: true 
//       });
//       if (response.data.success) {
//         toast.success(newStatus === "yes" ? "System Focus Initialized" : "Focus Disengaged");
//         fetchDevData(); 
//       }
//     } catch (err) { toast.error("Hardware interrupt: Focus update failed"); }
//   };

//   const handleResponse = async (subtaskId, isAccepted) => {
//     try {
//       const response = await axios({
//           url: SummaryApi.respondToSubtask.url,
//           method: SummaryApi.respondToSubtask.method,
//           data: { subtaskId, accept: isAccepted, userId: user?._id },
//           withCredentials: true
//       });
//       if (response.data.success) {
//         setNotifications(prev => prev.filter(item => item._id !== subtaskId));
//         fetchDevData(); 
//         toast.success(isAccepted ? "Task Approved!" : "Request Terminated");
//       }
//     } catch (err) { toast.error("Action failed"); }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotif(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const topCards = [
//     { title: "Active Sprint", subtitle: dbData?.activeSprint?.sprintName || "System Idle", status: `${dbData?.activeSprint?.daysLeft || 0} Days Remaining`, icon: <Zap className="text-amber-400" />, color: "from-amber-500/20" },
//     { title: "Task Load", subtitle: "Sprint Allocation", status: `${dbData?.stats?.totalTasks || 0} Active Units`, icon: <Code2 className="text-indigo-400" />, color: "from-indigo-500/20" },
//     { title: "Blockers", subtitle: "Action Required", status: `${dbData?.stats?.blockers || 0} Impediments`, icon: <Flame className="text-rose-400" />, color: "from-rose-500/20" },
//     { title: "Velocity", subtitle: "Efficiency Rate", status: "12pts Average", icon: <Activity className="text-emerald-400" />, color: "from-emerald-500/20" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-[#0A0A0B] text-slate-200 selection:bg-indigo-500/30">
//       <SideBar />

//       <main className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${isOpen ? "ml-64" : "ml-20"}`}>
//         {/* Futuristic Header */}
//         <header className="flex items-center justify-between px-8 py-5 bg-[#0F0F12]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-[60]">
//           <div className="flex items-center gap-4">
//             <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-600/20">
//               <Terminal size={20} className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-black tracking-tight text-white">MISSION CONTROL</h1>
//               <div className="flex items-center gap-2">
//                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
//                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Agent: {user?.name?.split(' ')[0] || "Unknown"}</p>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="relative group hidden lg:block">
//               <Search className="absolute top-2.5 left-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={16} />
//               <input type="text" placeholder="Search repository..." className="pl-10 pr-4 py-2 w-64 rounded-xl bg-white/5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 border border-white/5 transition-all" />
//             </div>

//             <div className="relative" ref={notifRef}>
//               <button onClick={() => setShowNotif(!showNotif)} className={`relative p-2.5 rounded-xl transition-all ${showNotif ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}>
//                 <Bell size={20} />
//                 {notifications.length > 0 && (
//                   <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#0A0A0B]">
//                     {notifications.length}
//                   </span>
//                 )}
//               </button>

//               {showNotif && (
//                 <div className="absolute right-0 mt-4 w-80 bg-[#16161A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
//                   <div className="p-4 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
//                     <h3 className="text-xs font-black uppercase tracking-widest text-indigo-400">Incoming Requests</h3>
//                     <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full font-bold">{notifications.length} New</span>
//                   </div>
//                   <div className="max-h-[400px] overflow-y-auto">
//                     {notifications.length === 0 ? (
//                       <div className="p-10 text-center flex flex-col items-center gap-3">
//                         <Coffee size={32} className="text-slate-700" />
//                         <p className="text-xs text-slate-500 italic font-medium">Queue empty. Time for coffee?</p>
//                       </div>
//                     ) : (
//                       notifications.map((notif) => (
//                         <div key={notif._id} className="p-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors group">
//                           <p className="text-xs font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{notif.title}</p>
//                           <div className="flex gap-2 mt-4">
//                             <button onClick={() => handleResponse(notif._id, true)} className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black py-2 rounded-lg hover:bg-emerald-500 hover:text-white transition-all underline-offset-4 tracking-tighter uppercase">
//                               <Check size={12} strokeWidth={3} /> Commit
//                             </button>
//                             <button onClick={() => handleResponse(notif._id, false)} className="flex-1 flex items-center justify-center gap-1.5 bg-rose-500/10 text-rose-500 text-[10px] font-black py-2 rounded-lg hover:bg-rose-500 hover:text-white transition-all tracking-tighter uppercase">
//                               <X size={12} strokeWidth={3} /> Drop
//                             </button>
//                           </div>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         <div className="flex flex-1 overflow-hidden px-8 py-6 gap-8">
//           {/* Main Content */}
//           <div className="flex-1 flex flex-col gap-8 overflow-y-auto pr-2 custom-scrollbar">
            
//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
//               {topCards.map((card, i) => (
//                 <div key={i} className={`relative overflow-hidden bg-[#16161A] rounded-2xl p-6 border border-white/5 group hover:border-indigo-500/30 transition-all duration-300 shadow-xl shadow-black/20 hover:-translate-y-1`}>
//                   <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity`}></div>
//                   <div className="relative z-10">
//                     <div className="mb-4 p-2.5 w-fit bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
//                       {React.cloneElement(card.icon, { size: 20 })}
//                     </div>
//                     <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest">{card.title}</h2>
//                     <p className="text-lg font-bold text-white mt-1 group-hover:text-indigo-400 transition-colors">{card.subtitle}</p>
//                     <div className="mt-4 flex items-center justify-between">
//                         <span className="text-[10px] font-bold py-1 px-2 bg-white/5 rounded-md text-slate-300">{card.status}</span>
//                         <ChevronRight size={14} className="text-slate-600 group-hover:text-white transition-all transform group-hover:translate-x-1" />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Calendar / Timeline Section */}
//             <div className="bg-[#16161A] rounded-3xl shadow-2xl border border-white/5 overflow-hidden">
//               <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
//                     <Calendar size={20} className="text-indigo-500" />
//                   </div>
//                   <div>
//                     <h2 className="text-lg font-bold text-white">Sprint Timeline</h2>
//                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Temporal Task Mapping</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-1 bg-black/40 p-1.5 rounded-xl border border-white/5">
//                   <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all"><ChevronLeft size={18}/></button>
//                   <span className="text-xs font-black w-28 text-center text-slate-200 uppercase tracking-tighter">{monthYear}</span>
//                   <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all"><ChevronRight size={18}/></button>
//                 </div>
//               </div>

//               <div className="p-8">
//                 <div className="grid grid-cols-7 text-center text-[10px] mb-6 font-black text-slate-600 uppercase tracking-[0.2em]">
//                   {daysOfWeek.map((day) => <div key={day}>{day}</div>)}
//                 </div>

//                 <div className="grid grid-cols-7 gap-3">
//                   {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} className="aspect-square opacity-20" />)}
//                   {Array.from({ length: daysInMonth }, (_, i) => {
//                     const day = i + 1;
//                     const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
//                     const dayEvents = dbData?.monthlyTasks?.filter(t => new Date(t.created_at).toDateString() === dateObj.toDateString());
//                     const isToday = new Date().toDateString() === dateObj.toDateString();

//                     return (
//                       <div key={i} className={`min-h-[120px] p-3 rounded-2xl border transition-all duration-300 relative group
//                         ${isToday ? "border-indigo-500 bg-indigo-500/[0.03] shadow-[0_0_20px_rgba(99,102,241,0.1)]" : "border-white/5 bg-[#1C1C21] hover:bg-[#23232A]"}`}>
//                         <span className={`text-xs font-black ${isToday ? "text-indigo-400" : "text-slate-700"}`}>{day.toString().padStart(2, '0')}</span>
                        
//                         <div className="mt-2 space-y-1.5">
//                           {dayEvents?.map((event, idx) => (
//                             <div 
//                               key={idx} 
//                               onClick={() => handleToggleFocus(event._id, event.focus)}
//                               className={`group/item p-2 text-[9px] font-black rounded-lg cursor-pointer truncate transition-all border-l-4 shadow-sm
//                                 ${event.focus === 'yes' 
//                                   ? 'bg-indigo-600 text-white border-white scale-105 z-10 ring-4 ring-indigo-500/20' 
//                                   : 'bg-white/5 border-indigo-500/30 text-slate-300 hover:bg-white/10 hover:border-indigo-400'}`}
//                             >
//                               <div className="flex items-center gap-1">
//                                 {event.focus === 'yes' && <Zap size={8} className="fill-current animate-pulse" />}
//                                 {event.title}
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                         {dayEvents?.length > 2 && <div className="absolute bottom-2 right-2 text-[8px] font-bold text-slate-500">+{dayEvents.length - 2} more</div>}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Gutter - Command Center */}
//           <aside className="w-[320px] hidden xl:flex flex-col gap-6 overflow-y-auto custom-scrollbar">
            
//             {/* Focus Task - Glassmorphic Card */}
//             <section className="bg-gradient-to-b from-indigo-600/20 to-transparent rounded-3xl border border-indigo-500/20 p-6 backdrop-blur-sm">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Current Frequency</h3>
//                 {dbData?.stats?.focusTask && (
//                    <span className="flex items-center gap-1.5 text-[9px] font-black text-white px-2 py-1 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/40">
//                       <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
//                       SYNCING
//                    </span>
//                 )}
//               </div>
              
//               {dbData?.stats?.focusTask ? (
//                 <div className="relative group">
//                   <button 
//                     onClick={() => handleToggleFocus(dbData.stats.focusTask._id, "yes")}
//                     className="absolute -top-1 -right-1 p-1 bg-white/5 rounded-full text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition-all z-20"
//                   >
//                     <XCircle size={18} />
//                   </button>
//                   <div className="space-y-4">
//                     <p className="text-sm font-black text-white leading-tight pr-6">{dbData.stats.focusTask.title}</p>
//                     <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase italic">
//                        <span className="flex items-center gap-1"><Clock size={12}/> {dbData.stats.focusTask.priority || "High"}</span>
//                        <span className="flex items-center gap-1 text-indigo-400"><Activity size={12}/> Online</span>
//                     </div>
                    
//                     <div className="space-y-2 pt-2">
//                       <div className="flex justify-between text-[10px] font-black mb-1.5">
//                         <span className="text-slate-500 tracking-widest">EXECUTION</span>
//                         <span className="text-indigo-400">{dbData.stats.focusTask.percent_complete}%</span>
//                       </div>
//                       <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
//                         <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-all duration-1000" style={{ width: `${dbData.stats.focusTask.percent_complete}%` }} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="py-8 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl bg-white/[0.02]">
//                   <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
//                     <Zap size={20} className="text-slate-600" />
//                   </div>
//                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Ready for focus</p>
//                 </div>
//               )}
//             </section>

//             {/* PR Monitor */}
//             <section className="bg-[#16161A] rounded-3xl p-6 border border-white/5">
//               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center justify-between">
//                 Review Queue <ExternalLink size={12} className="cursor-pointer hover:text-white" />
//               </h3>

//               <div className="space-y-3">
//                 {dbData?.latestSubtasks?.length === 0 ? (
//                   <p className="text-xs text-slate-500 text-center">No recent activity</p>
//                 ) : (
//                   dbData?.latestSubtasks?.map((task) => {
//                     const isDone = task.status === "Done";
//                     const isBlocked = task.status === "Blocked";

//                     return (
//                       <div 
//                         key={task._id} 
//                         className="group flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/[0.06] rounded-2xl border border-white/5 transition-all cursor-pointer"
//                       >
//                         <div className="flex items-center gap-3">
                          
//                           {/* Status color bar */}
//                           <div className={`w-1.5 h-8 rounded-full 
//                             ${isDone ? "bg-emerald-500" : ""}
//                             ${isBlocked ? "bg-rose-500" : ""}
//                             ${!isDone && !isBlocked ? "bg-amber-500" : ""}
//                           `}></div>

//                           <div>
//                             {/* Subtask ID */}
//                             <p className="text-[11px] font-black text-white group-hover:text-indigo-400 uppercase tracking-tighter">
//                               {task._id.slice(-6)} {/* short id */}
//                             </p>

//                             {/* Title */}
//                             <p className="text-[10px] text-slate-500 font-medium truncate w-32">
//                               {task.title}
//                             </p>
//                           </div>
//                         </div>

//                         {/* Status badge */}
//                         <span className={`text-[8px] font-black uppercase px-2 py-1 bg-white/5 rounded-md
//                           ${isDone ? "text-emerald-500" : ""}
//                           ${isBlocked ? "text-rose-500" : ""}
//                           ${!isDone && !isBlocked ? "text-amber-500" : ""}
//                         `}>
//                           {task.status}
//                         </span>
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//             </section>

//             {/* Navigation Utilities */}
//             <section className="grid grid-cols-2 gap-3">
//                 <NavLink to="/TeamMembers" className="flex flex-col items-center gap-3 p-5 bg-[#16161A] hover:bg-indigo-600 rounded-3xl border border-white/5 transition-all group shadow-lg">
//                   <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/20 transition-colors">
//                     <MessageSquare size={20} className="text-slate-400 group-hover:text-white" />
//                   </div>
//                   <span className="text-[10px] font-black text-slate-500 group-hover:text-white uppercase tracking-widest">Team Chat</span>
//                 </NavLink>
//                 <NavLink to="/ChatBot" className="flex flex-col items-center gap-3 p-5 bg-[#16161A] hover:bg-purple-600 rounded-3xl border border-white/5 transition-all group shadow-lg">
//                   <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/20 transition-colors">
//                     <Layout size={20} className="text-slate-400 group-hover:text-white" />
//                   </div>
//                   <span className="text-[10px] font-black text-slate-500 group-hover:text-white uppercase tracking-widest">Chat Bot</span>
//                 </NavLink>
//             </section>
//           </aside>
//         </div>
//       </main>
      
//       {/* Global CSS for scrollbars */}
//       <style>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 5px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 20px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(99,102,241,0.2); }
//       `}</style>
//     </div>
//   );
// };

// export default DeveloperDashboard;



import React, { useState, useEffect, useRef } from "react";
import { 
  Search, Bell, Calendar, Layout, Flame, Zap, 
  ChevronLeft, ChevronRight, MessageSquare, Clock, X, Check, 
  XCircle, Coffee, Activity, Code2, ExternalLink, Loader2,
  CheckCircle2, Layers, User as UserIcon
} from "lucide-react";
import SideBar from "../components/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import SummaryApi from "../common"; 
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const DeveloperDashboard = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector(state => state?.user?.user);

  const [dbData, setDbData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef(null);

  // Calendar logic
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const daysInMonth = endOfMonth.getDate();
  const startDay = startOfMonth.getDay();
  const monthYear = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const fetchDevData = async () => {
    try {
      const response = await axios({
        url: SummaryApi.getDeveloperDashboardData.url,
        method: SummaryApi.getDeveloperDashboardData.method,
        withCredentials: true,
      });
      if (response.data.success) setDbData(response.data.data);
    } catch (err) { console.error("Data fetch error", err); }
    finally { setLoading(false); }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios({
          url: SummaryApi.getPendingInvitations.url,
          method: SummaryApi.getPendingInvitations.method,
          withCredentials: true 
      });
      if (response.data.success) setNotifications(response.data.data);
    } catch (err) { console.error("Error fetching invitations", err); }
  };

  useEffect(() => {
    if (user?._id) {
      fetchDevData();
      fetchNotifications();
    }
  }, [user, currentMonth]);

  const handleToggleFocus = async (taskId, currentFocusStatus) => {
    try {
      const newStatus = currentFocusStatus === "yes" ? "no" : "yes";
      const response = await axios({
        url: SummaryApi.updateFocusTask.url,
        method: SummaryApi.updateFocusTask.method,
        data: { taskId, focus: newStatus },
        withCredentials: true 
      });
      if (response.data.success) {
        toast.success(newStatus === "yes" ? "Focus Set" : "Focus Removed");
        fetchDevData(); 
      }
    } catch (err) { toast.error("Update failed"); }
  };

  const handleResponse = async (subtaskId, isAccepted) => {
    try {
      const response = await axios({
          url: SummaryApi.respondToSubtask.url,
          method: SummaryApi.respondToSubtask.method,
          data: { subtaskId, accept: isAccepted, userId: user?._id },
          withCredentials: true
      });
      if (response.data.success) {
        setNotifications(prev => prev.filter(item => item._id !== subtaskId));
        fetchDevData(); 
        toast.success(isAccepted ? "Accepted" : "Declined");
      }
    } catch (err) { toast.error("Action failed"); }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0b0f1a]">
        <Loader2 className="animate-spin text-blue-500" size={50} />
      </div>
    );
  }

  const topCards = [
    { title: "Active Sprint", subtitle: dbData?.activeSprint?.sprintName || "No Sprint", status: `${dbData?.activeSprint?.daysLeft || 0} Days Left`, icon: <Zap className="text-blue-400" /> },
    { title: "Task Load", subtitle: "Sprint Allocation", status: `${dbData?.stats?.totalTasks || 0} Tasks`, icon: <Code2 className="text-purple-400" /> },
    { title: "Blockers", subtitle: "Action Required", status: `${dbData?.stats?.blockers || 0} Issues`, icon: <Flame className="text-red-400" /> },
    { title: "Velocity", subtitle: "Efficiency", status: "12pts Avg", icon: <Activity className="text-green-400" /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
      <SideBar />

      <main className={`flex-1 ${isOpen ? "ml-64" : "ml-20"} p-8`}>
        
        {/* HEADER */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <Layers className="text-blue-500" />
              Developer Dashboard
            </h1>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
              Agent: {user?.name || "User"} • System Online
            </p>
          </div>

          {/* NOTIFICATIONS */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setShowNotif(!showNotif)} 
              className={`p-2 rounded-lg border border-white/10 transition-all ${showNotif ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#0b0f1a]">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotif && (
              <div className="absolute right-0 mt-3 w-80 bg-[#111827] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                  <h3 className="text-xs font-bold uppercase text-blue-400">Task Invitations</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 text-xs italic">No pending requests</div>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif._id} className="p-4 border-b border-white/5 hover:bg-white/[0.02]">
                        <p className="text-xs font-medium text-white mb-3">{notif.title}</p>
                        <div className="flex gap-2">
                          <button onClick={() => handleResponse(notif._id, true)} className="flex-1 bg-green-500/10 text-green-500 text-[10px] font-bold py-1.5 rounded border border-green-500/20 hover:bg-green-500 hover:text-white transition-all">Accept</button>
                          <button onClick={() => handleResponse(notif._id, false)} className="flex-1 bg-red-500/10 text-red-500 text-[10px] font-bold py-1.5 rounded border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">Reject</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {topCards.map((card, i) => (
            <div key={i} className="bg-gradient-to-br from-[#111827] to-[#0b0f1a] border border-white/10 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  {card.icon}
                </div>
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">{card.title}</h2>
              </div>
              <p className="text-lg font-bold text-white">{card.subtitle}</p>
              <div className="mt-2 text-[10px] font-bold text-blue-400 bg-blue-500/5 w-fit px-2 py-0.5 rounded border border-blue-500/10">
                {card.status}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* CALENDAR SECTION */}
          <div className="xl:col-span-2 bg-gradient-to-br from-[#111827] to-[#0b0f1a] border border-white/10 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Calendar className="text-blue-400" />
                <h2 className="text-lg font-bold text-white">Sprint Timeline</h2>
              </div>
              <div className="flex items-center gap-2 bg-black/20 p-1 rounded-lg border border-white/5">
                <button onClick={prevMonth} className="p-1 hover:text-blue-400"><ChevronLeft size={18}/></button>
                <span className="text-xs font-bold w-24 text-center uppercase tracking-tighter">{monthYear}</span>
                <button onClick={nextMonth} className="p-1 hover:text-blue-400"><ChevronRight size={18}/></button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-7 mb-4 text-[10px] font-bold text-gray-500 uppercase text-center">
                {daysOfWeek.map(d => <div key={d}>{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: startDay }).map((_, i) => <div key={i} className="aspect-square opacity-0" />)}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                  const isToday = new Date().toDateString() === dateObj.toDateString();
                  const dayEvents = dbData?.monthlyTasks?.filter(t => new Date(t.created_at).toDateString() === dateObj.toDateString());

                  return (
                    <div key={i} className={`min-h-[80px] p-2 rounded-xl border transition-all ${isToday ? "border-blue-500 bg-blue-500/5" : "border-white/5 bg-white/[0.02]"}`}>
                      <span className={`text-xs font-bold ${isToday ? "text-blue-400" : "text-gray-600"}`}>{day}</span>
                      <div className="mt-1 space-y-1">
                        {dayEvents?.slice(0, 2).map((ev, idx) => (
                          <div key={idx} className={`text-[8px] p-1 rounded truncate border ${ev.focus === 'yes' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                            {ev.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SIDEBAR COMMANDS */}
          <div className="space-y-6">
            {/* FOCUS TASK */}
            <div className="bg-gradient-to-br from-[#111827] to-[#0b0f1a] border border-blue-500/20 rounded-2xl p-5 shadow-xl">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Focus Frequency</h3>
              {dbData?.stats?.focusTask ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-white">{dbData.stats.focusTask.title}</p>
                    <button onClick={() => handleToggleFocus(dbData.stats.focusTask._id, "yes")} className="text-gray-500 hover:text-red-500"><XCircle size={16}/></button>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full transition-all" style={{ width: `${dbData.stats.focusTask.percent_complete}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
                    <span>Progress</span>
                    <span className="text-blue-400">{dbData.stats.focusTask.percent_complete}%</span>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center border border-dashed border-white/10 rounded-xl">
                  <p className="text-[10px] text-gray-600 font-bold uppercase">No Active Focus</p>
                </div>
              )}
            </div>

            {/* REVIEW QUEUE (RECENT ACTIVITY) */}
            <section className="bg-gradient-to-br from-[#111827] to-[#0b0f1a] border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Review Queue
                </h3>
                <ExternalLink size={14} className="text-gray-500 hover:text-blue-400 cursor-pointer transition-colors" />
              </div>

              <div className="space-y-3">
                {dbData?.latestSubtasks?.length === 0 ? (
                  <div className="py-4 text-center border border-dashed border-white/5 rounded-xl">
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">No recent activity</p>
                  </div>
                ) : (
                  dbData?.latestSubtasks?.map((task) => {
                    const isDone = task.status === "Done";
                    const isBlocked = task.status === "Blocked";

                    return (
                      <div 
                        key={task._id} 
                        className="group flex items-center justify-between p-3 bg-white/[0.02] hover:bg-white/[0.05] rounded-xl border border-white/5 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          {/* Vertical Status Indicator */}
                          <div className={`w-1 h-6 rounded-full transition-colors
                            ${isDone ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : ""}
                            ${isBlocked ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" : ""}
                            ${!isDone && !isBlocked ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" : ""}
                          `}></div>

                          <div className="overflow-hidden">
                            <p className="text-[10px] font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tighter">
                              ID: {task._id.slice(-6)}
                            </p>
                            <p className="text-[10px] text-gray-500 font-medium truncate w-24">
                              {task.title}
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span className={`text-[8px] font-black uppercase px-2 py-1 rounded border
                          ${isDone ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
                          ${isBlocked ? "bg-red-500/10 text-red-500 border-red-500/20" : ""}
                          ${!isDone && !isBlocked ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : ""}
                        `}>
                          {task.status}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </section>

            {/* QUICK ACTIONS */}
            <div className="grid grid-cols-2 gap-4">
              <NavLink to="/TeamMembers" className="p-4 bg-[#111827] border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all text-center group">
                <MessageSquare className="mx-auto mb-2 text-gray-500 group-hover:text-blue-400" size={20} />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Team Chat</span>
              </NavLink>
              <NavLink to="/ChatBot" className="p-4 bg-[#111827] border border-white/10 rounded-2xl hover:border-purple-500/50 transition-all text-center group">
                <Layout className="mx-auto mb-2 text-gray-500 group-hover:text-purple-400" size={20} />
                <span className="text-[10px] font-bold text-gray-400 uppercase">AI Assistant</span>
              </NavLink>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeveloperDashboard;