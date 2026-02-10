// import React, { useEffect, useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import axios from "axios";
// import { toast } from "react-toastify";
// import SummaryApi from "../common";

// const EditTeam = ({
//   teamId,
//   teamName,
//   projectName,
//   completionDate,
//   members,
//   teamLeader,
//   onClose,
//   callFunc,
// }) => {
//   const [updatedProjectName, setUpdatedProjectName] = useState(projectName);
//   const [updatedTeamLeader, setUpdatedTeamLeader] = useState(teamLeader);
//   const [updatedMembers, setUpdatedMembers] = useState(members || []);
//   const [updatedCompletionDate, setUpdatedCompletionDate] = useState(
//     completionDate ? completionDate.split("T")[0] : ""
//   );
//   const [users, setUsers] = useState([]);

//   // Fetch all users for selection
//   const fetchAllUsers = async () => {
//     try {
//       const response = await axios.get(SummaryApi.allUser.url, {
//         withCredentials: true,
//       });
//       if (response.data.success) {
//         setUsers(response.data.data);
//       } else {
//         toast.error(response.data.message || "Failed to load users");
//       }
//     } catch (error) {
//       toast.error("Error fetching users");
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchAllUsers();
//   }, []);

//   // Handle team member selection
//   const handleMemberToggle = (userId) => {
//     if (updatedMembers.includes(userId)) {
//       setUpdatedMembers(updatedMembers.filter((id) => id !== userId));
//     } else {
//       setUpdatedMembers([...updatedMembers, userId]);
//     }
//   };

//   // Handle form submission
//   const handleUpdateTeam = async () => {
//     if (!updatedProjectName || !updatedCompletionDate || updatedMembers.length === 0) {
//       toast.error("Please fill all fields and select at least one member");
//       return;
//     }

//     try {
//       const response = await axios({
//         url: SummaryApi.updateTeam.url,
//         method: SummaryApi.updateTeam.method,
//         data: {
//           teamId,
//           projectName: updatedProjectName,
//           teamLeader: updatedTeamLeader,
//           members: updatedMembers,
//           completionDate: updatedCompletionDate,
//         },
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       });

//       const data = response.data;

//       if (data.success) {
//         toast.success("Team updated successfully!");
//         onClose();
//         callFunc(); // Refresh parent list
//       } else {
//         toast.error(data.message || "Failed to update team");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error updating team");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-200 bg-opacity-10 backdrop-blur-md flex justify-center items-center z-50">
//       <div className="bg-white p-8 w-[450px] shadow-lg rounded-lg relative">
//         {/* Close button */}
//         <div className="absolute top-4 right-4 cursor-pointer" onClick={onClose}>
//           <IoMdClose size={25} />
//         </div>

//         <h2 className="text-xl font-semibold text-center mb-4">Edit Team</h2>

//         <p className="text-lg mb-2">
//           <strong>Team Name:</strong> {teamName}
//         </p>

//         {/* Editable Completion Date */}
//         <div className="mb-4">
//           <label className="block mb-1 text-lg">Completion Date</label>
//           <input
//             type="date"
//             value={updatedCompletionDate}
//             onChange={(e) => setUpdatedCompletionDate(e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full"
//           />
//         </div>

//         {/* Project Name */}
//         <div className="mb-4">
//           <label className="block mb-1 text-lg">Project Name</label>
//           <input
//             type="text"
//             value={updatedProjectName}
//             onChange={(e) => setUpdatedProjectName(e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full"
//             placeholder="Enter project name"
//           />
//         </div>

//         {/* Select Team Leader */}
//         <div className="mb-4">
//           <label className="block mb-1 text-lg">Team Leader</label>
//           <select
//             value={updatedTeamLeader}
//             onChange={(e) => setUpdatedTeamLeader(e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full"
//           >
//             <option value="">-- Select Team Leader --</option>
//             {users.map((user) => (
//               <option key={user._id} value={user._id}>
//                 {user.name} ({user.email})
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Select Team Members */}
//         <div className="mb-4">
//           <label className="block mb-2 text-lg">Team Members</label>
//           <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-md p-2 space-y-1">
//             {users.map((user) => (
//               <div
//                 key={user._id}
//                 className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded-md cursor-pointer"
//                 onClick={() => handleMemberToggle(user._id)}
//               >
//                 <input
//                   type="checkbox"
//                   checked={updatedMembers.includes(user._id)}
//                   readOnly
//                 />
//                 <span>
//                   {user.name} ({user.email})
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Submit */}
//         <button
//           onClick={handleUpdateTeam}
//           className="w-full mt-6 bg-purple-500 text-white py-2 rounded-lg text-lg hover:bg-purple-600"
//         >
//           Update Team
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditTeam;


import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import SummaryApi from "../common";

const EditTeam = ({
  teamId,
  teamName,
  projectName,
  completionDate,
  members,
  teamLeader,
  onClose,
  callFunc,
}) => {
  const [updatedProjectName, setUpdatedProjectName] = useState(projectName);
  const [updatedTeamLeader, setUpdatedTeamLeader] = useState(teamLeader);
  const [updatedMembers, setUpdatedMembers] = useState(members || []);
  const [updatedCompletionDate, setUpdatedCompletionDate] = useState(
    completionDate ? completionDate.split("T")[0] : ""
  );
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all users for selection
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(SummaryApi.allUser.url, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to load users");
      }
    } catch (error) {
      toast.error("Error fetching users");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Handle team member selection
  const handleMemberToggle = (userId) => {
    if (updatedMembers.includes(userId)) {
      setUpdatedMembers(updatedMembers.filter((id) => id !== userId));
    } else {
      setUpdatedMembers([...updatedMembers, userId]);
    }
  };

  // Handle form submission
  const handleUpdateTeam = async () => {
    if (!updatedProjectName || !updatedCompletionDate || updatedMembers.length === 0) {
      toast.error("Please fill all fields and select at least one member");
      return;
    }

    setLoading(true);
    try {
      const response = await axios({
        url: SummaryApi.updateTeam.url,
        method: SummaryApi.updateTeam.method,
        data: {
          teamId,
          projectName: updatedProjectName,
          teamLeader: updatedTeamLeader,
          members: updatedMembers,
          completionDate: updatedCompletionDate,
        },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("Team updated successfully!");
        onClose();
        callFunc();
      } else {
        toast.error(response.data.message || "Failed to update team");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex justify-center items-center z-[1000] p-4">
      <div className="bg-white p-8 w-full max-w-lg shadow-2xl rounded-xl relative text-slate-900">
        
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 text-slate-400 hover:text-red-600 transition-colors" 
          onClick={onClose}
        >
          <IoMdClose size={28} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-slate-900 border-b pb-2">Edit Team Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                <p className="text-sm font-semibold text-slate-500 uppercase">Team Name</p>
                <p className="text-lg font-medium text-purple-700">{teamName}</p>
            </div>
            {/* Completion Date */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Completion Date</label>
                <input
                    type="date"
                    value={updatedCompletionDate}
                    onChange={(e) => setUpdatedCompletionDate(e.target.value)}
                    className="border border-slate-300 rounded-lg p-2 w-full bg-white text-slate-900 focus:ring-2 focus:ring-purple-500 outline-none"
                />
            </div>
        </div>

        {/* Project Name */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-slate-700 mb-1">Project Name</label>
          <input
            type="text"
            value={updatedProjectName}
            onChange={(e) => setUpdatedProjectName(e.target.value)}
            className="border border-slate-300 rounded-lg p-2 w-full bg-white text-slate-900 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Enter project name"
          />
        </div>

        {/* Select Team Leader */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-slate-700 mb-1">Team Leader</label>
          <select
            value={updatedTeamLeader}
            onChange={(e) => setUpdatedTeamLeader(e.target.value)}
            className="border border-slate-300 rounded-lg p-2 w-full bg-white text-slate-900 focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="">-- Select Team Leader --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Team Members */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-700 mb-2">Team Members ({updatedMembers.length} selected)</label>
          <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-3 space-y-2 bg-slate-50 scrollbar-thin">
            {users.map((user) => (
              <div
                key={user._id}
                className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                    updatedMembers.includes(user._id) ? 'bg-purple-100 border-purple-200' : 'hover:bg-slate-200'
                }`}
                onClick={() => handleMemberToggle(user._id)}
              >
                <input
                  type="checkbox"
                  checked={updatedMembers.includes(user._id)}
                  onChange={() => {}} // Handled by div onClick
                  className="w-4 h-4 accent-purple-600"
                />
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-slate-500">{user.email}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleUpdateTeam}
          disabled={loading}
          className={`w-full bg-purple-600 text-white py-3 rounded-lg font-bold text-lg shadow-lg transition-all active:scale-95 ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-700"
          }`}
        >
          {loading ? "Updating..." : "Update Team"}
        </button>
      </div>
    </div>
  );
};

export default EditTeam;



