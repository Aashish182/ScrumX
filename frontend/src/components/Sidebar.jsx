
// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// // Fixed: Removed duplicate X import and added missing icons
// import { Menu, X, Robot, History, Layers } from "lucide-react"; 
// import { setUserDetails } from "../store/userSlice";
// import { toggleSidebar } from "../store/sidebarSlice";
// import SummaryApi from "../common";
// import { toast } from "react-toastify";
// import {
//   FaClipboardList, FaComments, FaUsers,
//   FaBan, FaChartLine, FaTasks,
//   FaCog, FaSignOutAlt, FaHistory, FaRobot, FaLayerGroup
// } from "react-icons/fa";

// const SideBar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Redux State
//   const user = useSelector((state) => state?.user?.user);
//   const isOpen = useSelector((state) => state.sidebar.isOpen);

//   // User details logic
//   const userName = user?.name || "Guest User";
//   const userEmail = user?.email || "guest@email.com";
//   const userRole = user?.role || "DEVELOPER"; 
  
//   const userInitials = userName
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();

//   const handleLogout = async () => {
//     try {
//       const fetchData = await fetch(SummaryApi.logout_user.url, {
//         method: SummaryApi.logout_user.method,
//         credentials: "include",
//       });
//       const data = await fetchData.json();

//       if (data.success) {
//         toast.success(data.message);
//         dispatch(setUserDetails(null));
//         navigate("/");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Logout failed. Please try again.");
//     }
//   };

//   return (
//     <aside
//       className={`fixed top-0 left-0 h-screen bg-[#1E1E1E] text-white flex flex-col justify-between px-3 py-6 shadow-lg z-50 transition-all duration-300
//         ${isOpen ? "w-64" : "w-20"} `}
//     >
//       <div>
//         {/* Top Section with Profile */}
//         <div className={`flex items-center mb-8 px-2 ${!isOpen && "justify-center"}`}>
//           <div className="w-10 h-10 rounded-full bg-green-600 flex-shrink-0 flex items-center justify-center font-bold text-sm border-2 border-gray-700">
//             {userInitials}
//           </div>
//           {isOpen && (
//             <div className="ml-3 overflow-hidden">
//               <p className="font-semibold truncate">{userName}</p>
//               <p className="text-xs text-gray-400 truncate">{userRole.replace('_', ' ')}</p>
//             </div>
//           )}
//         </div>

//         {/* Toggle Button */}
//         <button
//           className="p-2 mb-6 rounded-md hover:bg-gray-700 flex items-center justify-center transition-colors mx-auto lg:ml-1"
//           onClick={() => dispatch(toggleSidebar())}
//         >
//           {isOpen ? <X size={20} /> : <Menu size={20} />}
//         </button>

//         {/* Navigation based on role */}
//         <nav className="flex flex-col space-y-2">
//           {userRole === "SCRUM_MASTER" ? (
//             <>
//               <SidebarLink to="/ScrumMaster/Dashboard" icon={<FaClipboardList />} label="Dashboard" isOpen={isOpen} />
//               <SidebarLink to="/STeamChat" icon={<FaComments />} label="Team Chat" isOpen={isOpen} />
//               <SidebarLink to="/ScrumTeams" icon={<FaUsers />} label="Team Performance" isOpen={isOpen} />
//               <SidebarLink to="/Retrospectives" icon={<FaHistory />} label="Retrospectives" isOpen={isOpen} />
//               <SidebarLink to="/Reports" icon={<FaChartLine />} label="Insights & Reports" isOpen={isOpen} />
//             </>
//           ) : (
//             <>
//               <SidebarLink to="/Developer/Dashboard" icon={<FaClipboardList />} label="My Dashboard" isOpen={isOpen} />
//               <SidebarLink to="/ChatBot" icon={<FaRobot />} label="Daily Bot Check-in" isOpen={isOpen} />
//               <SidebarLink to="/MyTasks" icon={<FaTasks />} label="Task Board" isOpen={isOpen} />
//               <SidebarLink to="/Sprints" icon={<FaLayerGroup />} label="Current Sprint" isOpen={isOpen} />
//               <SidebarLink to="/TeamMembers" icon={<FaUsers />} label="My Team" isOpen={isOpen} />
//             </>
//           )}
//         </nav>
//       </div>

//       {/* Bottom Section */}
//       <div className="border-t border-gray-700 pt-4 px-2">
//         <SidebarLink to="/Preferences" icon={<FaCog />} label="Settings" isOpen={isOpen} />
//         <button
//           onClick={handleLogout}
//           className={`w-full mt-2 px-3 py-2 rounded-md text-red-400 hover:bg-red-900/20 flex items-center transition-all ${isOpen ? "gap-3 text-left" : "justify-center"}`}
//         >
//           <FaSignOutAlt className="flex-shrink-0" /> 
//           {isOpen && <span className="font-medium">Log Out</span>}
//         </button>
//       </div>
//     </aside>
//   );
// };

// // Sub-component for cleaner code
// const SidebarLink = ({ to, icon, label, isOpen }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       `flex items-center rounded-md transition-all py-2.5 px-3 ${
//         isOpen ? "gap-3" : "justify-center"
//       } ${
//         isActive ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-800 text-gray-300 hover:text-white"
//       }`
//     }
//   >
//     <div className="text-lg flex-shrink-0">{icon}</div>
//     {isOpen && <span className="font-medium text-sm whitespace-nowrap">{label}</span>}
//   </NavLink>
// );

// export default SideBar;

// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// // Fixed: Removed duplicate X import and added missing icons
// import { Menu, X, Robot, History, Layers } from "lucide-react"; 
// import { setUserDetails } from "../store/userSlice";
// import { toggleSidebar } from "../store/sidebarSlice";
// import SummaryApi from "../common";
// import { toast } from "react-toastify";
// import {
//   FaClipboardList, FaComments, FaUsers,
//   FaBan, FaChartLine, FaTasks,
//   FaCog, FaSignOutAlt, FaHistory, FaRobot, FaLayerGroup, Fawindturbine,
//   FaPlus
// } from "react-icons/fa";

// const SideBar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Redux State
//   const user = useSelector((state) => state?.user?.user);
//   const isOpen = useSelector((state) => state.sidebar.isOpen);

//   // User details logic
//   const userName = user?.name || "Guest User";
//   const userEmail = user?.email || "guest@email.com";
//   const userRole = user?.role || "DEVELOPER"; 
  
//   const userInitials = userName
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();

//   const handleLogout = async () => {
//     try {
//       const fetchData = await fetch(SummaryApi.logout_user.url, {
//         method: SummaryApi.logout_user.method,
//         credentials: "include",
//       });
//       const data = await fetchData.json();

//       if (data.success) {
//         toast.success(data.message);
//         dispatch(setUserDetails(null));
//         navigate("/");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Logout failed. Please try again.");
//     }
//   };

//   return (
//     <aside
//       className={`fixed top-0 left-0 h-screen bg-[#1E1E1E] text-white flex flex-col justify-between px-3 py-6 shadow-lg z-50 transition-all duration-300
//         ${isOpen ? "w-64" : "w-20"} `}
//     >
//       <div>
//         {/* Top Section with Profile */}
//         <div className={`flex items-center mb-8 px-2 ${!isOpen && "justify-center"}`}>
//           <div className="w-10 h-10 rounded-full bg-green-600 flex-shrink-0 flex items-center justify-center font-bold text-sm border-2 border-gray-700">
//             {userInitials}
//           </div>
//           {isOpen && (
//             <div className="ml-3 overflow-hidden">
//               <p className="font-semibold truncate">{userName}</p>
//               <p className="text-xs text-gray-400 truncate">{userRole.replace('_', ' ')}</p>
//             </div>
//           )}
//         </div>

//         {/* Toggle Button */}
//         <button
//           className="p-2 mb-6 rounded-md hover:bg-gray-700 flex items-center justify-center transition-colors mx-auto lg:ml-1"
//           onClick={() => dispatch(toggleSidebar())}
//         >
//           {isOpen ? <X size={20} /> : <Menu size={20} />}
//         </button>

//         {/* Navigation based on role */}
//         <nav className="flex flex-col space-y-2">
//           {userRole === "SCRUM_MASTER" ? (
//             <>
//               <SidebarLink to="/ScrumMaster/Dashboard" icon={<FaClipboardList />} label="Dashboard" isOpen={isOpen} />
//               <SidebarLink to="/SprintControl" icon={<FaComments />} label="Sprint Control" isOpen={isOpen} />
//               <SidebarLink to="/ScrumTeams" icon={<FaUsers />} label="Team Performance" isOpen={isOpen} />
//               <SidebarLink to="/Retrospectives" icon={<FaHistory />} label="Retrospectives" isOpen={isOpen} />
//               <SidebarLink to="/ReportGenerator" icon={<FaChartLine />} label="Insights & Reports" isOpen={isOpen} />
//               <SidebarLink to="/SprintGenerator" icon={<FaPlus />} label="Sprint Generation" isOpen={isOpen} />
//             </>
//           ) : (
//             <>
//               <SidebarLink to="/Developer/Dashboard" icon={<FaClipboardList />} label="My Dashboard" isOpen={isOpen} />
//               <SidebarLink to="/ChatBot" icon={<FaRobot />} label="Daily Bot Check-in" isOpen={isOpen} />
//               <SidebarLink to="/MyTasks" icon={<FaTasks />} label="Task Board" isOpen={isOpen} />
//               <SidebarLink to="/CurrentSprint" icon={<FaLayerGroup />} label="Current Sprint" isOpen={isOpen} />
//               <SidebarLink to="/TeamMembers" icon={<FaUsers />} label="My Team" isOpen={isOpen} />
//             </>
//           )}
//         </nav>
//       </div>

//       {/* Bottom Section */}
//       <div className="border-t border-gray-700 pt-4 px-2">
//         <SidebarLink to="/Preferences" icon={<FaCog />} label="Settings" isOpen={isOpen} />
//         <button
//           onClick={handleLogout}
//           className={`w-full mt-2 px-3 py-2 rounded-md text-red-400 hover:bg-red-900/20 flex items-center transition-all ${isOpen ? "gap-3 text-left" : "justify-center"}`}
//         >
//           <FaSignOutAlt className="flex-shrink-0" /> 
//           {isOpen && <span className="font-medium">Log Out</span>}
//         </button>
//       </div>
//     </aside>
//   );
// };

// // Sub-component for cleaner code
// const SidebarLink = ({ to, icon, label, isOpen }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       `flex items-center rounded-md transition-all py-2.5 px-3 ${
//         isOpen ? "gap-3" : "justify-center"
//       } ${
//         isActive ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-800 text-gray-300 hover:text-white"
//       }`
//     }
//   >
//     <div className="text-lg flex-shrink-0">{icon}</div>
//     {isOpen && <span className="font-medium text-sm whitespace-nowrap">{label}</span>}
//   </NavLink>
// );

// export default SideBar;



import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X } from "lucide-react"; 
import { setUserDetails } from "../store/userSlice";
import { toggleSidebar } from "../store/sidebarSlice";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { RiChatAiFill } from "react-icons/ri";
import {
  FaClipboardList, FaComments, FaUsers,
  FaChartLine, FaTasks,
  FaCog, FaSignOutAlt, FaHistory, FaRobot, FaLayerGroup,
  FaPlus
} from "react-icons/fa";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user?.user);
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  const userName = user?.name || "Guest User";
  const userRole = user?.role || "DEVELOPER"; 
  
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: "include",
      });
      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#0F172A] text-slate-200 flex flex-col justify-between py-6 shadow-2xl z-50 transition-all duration-500 ease-in-out border-r border-slate-800
        ${isOpen ? "w-64 px-4" : "w-20 px-2"} `}
    >
      <div>
        {/* Profile Section with Glow */}
        <div className={`flex items-center mb-10 transition-all duration-300 ${!isOpen && "justify-center"}`}>
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex-shrink-0 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20">
              {userInitials}
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#0F172A] rounded-full"></div>
          </div>
          
          {isOpen && (
            <div className="ml-3 overflow-hidden animate-in fade-in slide-in-from-left-2 duration-500">
              <p className="font-bold text-slate-100 truncate tracking-tight">{userName}</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-500/80 truncate">
                {userRole.replace('_', ' ')}
              </p>
            </div>
          )}
        </div>

        {/* Action Button: Toggle */}
        <button
          className="w-full flex items-center justify-center p-2 mb-8 rounded-xl bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700/50"
          onClick={() => dispatch(toggleSidebar())}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Navigation Section */}
        <nav className="flex flex-col space-y-1.5">
            <p className={`text-[10px] font-bold text-slate-500 mb-2 px-3 tracking-widest uppercase ${!isOpen && "text-center"}`}>
               {isOpen ? "Main Menu" : "•••"}
            </p>
          {userRole === "SCRUM_MASTER" ? (
            <>
              <SidebarLink to="/ScrumMaster/Dashboard" icon={<FaClipboardList />} label="Dashboard" isOpen={isOpen} />
              <SidebarLink to="/SprintControl" icon={<FaComments />} label="Sprint Control" isOpen={isOpen} />
              <SidebarLink to="/ScrumTeams" icon={<FaUsers />} label="Team Performance" isOpen={isOpen} />
              <SidebarLink to="/Retrospectives" icon={<FaHistory />} label="Retrospectives" isOpen={isOpen} />
              <SidebarLink to="/ChatAnalysis" icon={<RiChatAiFill />} label="Chat Analysis" isOpen={isOpen} />
              <SidebarLink to="/ReportGenerator" icon={<FaChartLine />} label="Insights & Reports" isOpen={isOpen} />
              <SidebarLink to="/SprintGenerator" icon={<FaPlus />} label="Sprint Generation" isOpen={isOpen} />
            </>
          ) : (
            <>
              <SidebarLink to="/Developer/Dashboard" icon={<FaClipboardList />} label="My Dashboard" isOpen={isOpen} />
              <SidebarLink to="/ChatBot" icon={<FaRobot />} label="Daily Bot Check-in" isOpen={isOpen} />
              <SidebarLink to="/MyTasks" icon={<FaTasks />} label="Task Board" isOpen={isOpen} />
              <SidebarLink to="/CurrentSprint" icon={<FaLayerGroup />} label="Current Sprint" isOpen={isOpen} />
              <SidebarLink to="/TeamMembers" icon={<FaUsers />} label="My Team" isOpen={isOpen} />
            </>
          )}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="pt-4 space-y-1">
        <SidebarLink to="/Preferences" icon={<FaCog />} label="Settings" isOpen={isOpen} />
        <button
          onClick={handleLogout}
          className={`w-full group mt-2 px-3 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 flex items-center transition-all duration-300 ${isOpen ? "gap-3" : "justify-center"}`}
        >
          <FaSignOutAlt className="text-lg group-hover:scale-110 transition-transform" /> 
          {isOpen && <span className="font-semibold text-sm">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

const SidebarLink = ({ to, icon, label, isOpen }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center rounded-xl transition-all duration-300 py-3 px-3 group ${
        isOpen ? "gap-3" : "justify-center"
      } ${
        isActive 
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/40" 
          : "hover:bg-slate-800 text-slate-400 hover:text-slate-100"
      }`
    }
  >
    <div className={`text-lg transition-transform duration-300 group-hover:scale-110`}>
      {icon}
    </div>
    {isOpen && (
      <span className="font-semibold text-sm whitespace-nowrap overflow-hidden animate-in fade-in slide-in-from-left-1">
        {label}
      </span>
    )}
  </NavLink>
);

export default SideBar;