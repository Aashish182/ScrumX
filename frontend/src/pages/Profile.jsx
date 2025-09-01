// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaStarOfLife } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// // import Footer from '../components/Footer';
// import SummaryApi from '../common';
// import { toast } from 'react-toastify';

// const Profile = () => {
//   const user = useSelector((state) => state?.user?.user);
//   const [showFeedback, setShowFeedback] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const userId=user?._id
//   const [data, setData] = useState({
//     feedback: '',
//     creator: userId,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({
//         ...prev,
//         [name]: value
//     }));
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const dataResponse = await fetch(SummaryApi.feedback.url, {
//   //       method: SummaryApi.feedback.method,
//   //       headers: {
//   //           "content-type": "application/json"
//   //       },
//   //       body: JSON.stringify(data)
//   //   });

//   //   const dataApi = await dataResponse.json();

//   //   if (dataApi.success) {
//   //     toast.success(dataApi.message);
//   //     setShowFeedback(false); 
//   //     setData({ feedback: '', creator: userId });
//   //     fetchAllFeedback();
//   //   } else if (dataApi.error) {
//   //     toast.error(dataApi.message);
//   //   }
//   //   console.log("data", dataApi);
//   // };
    
//   //   const[allFeedback,setAllFeedback] = useState({});
//   //   const fetchAllFeedback = async() =>{
//   //       const response1 = await fetch(SummaryApi.userfeedback.url,{
//   //           method: SummaryApi.userfeedback.method,
//   //           headers: {
//   //               'Content-Type': 'application/json',
//   //           },
//   //           body: JSON.stringify({
//   //               userId: user?._id
//   //           })
//   //       })
//   //       const dataResponse1 = await response1.json();
//   //       setAllFeedback(dataResponse1?.data || [])
//   //       console.log("data",dataResponse1)
//   //   }

//   // useEffect(() => {
//   //   fetchAllFeedback();
//   // },[])

//   return (
//     <div className=' bg-gradient-to-br from-purple-100 via-[#f3e8ff] to-[#e9d5ff] min-h-screen'>
//       <div className="container w-full px-6 md:px-28 pt-20">
//         <h1 className="text-3xl font-semibold pb-4 mt-12">Profile</h1>

//         {/* User Section */}
//         <div className="mb-10">
//           <h1 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2">User</h1>
//           <div className="text-lg pt-4 max-w-4xl">
//             <div className="flex flex-col gap-4 mb-4">
//               <div className="flex gap-2">
//                 <span className="font-medium w-40">Email:</span>
//                 <span>{user?.email}</span>
//               </div>
//               <div className="flex gap-2">
//                 <span className="font-medium w-40">Name:</span>
//                 <span>{user?.name}</span>
//               </div>
//               <div className="flex gap-2 items-center">
//                 <span className="font-medium w-40">Password:</span>
//                 <div className="flex items-center gap-6">
//                   <span className="flex gap-1">
//                     {[...Array(7)].map((_, index) => (
//                       <FaStarOfLife key={index} size={10} />
//                     ))}
//                   </span>
//                   <Link
//                     to="/forgotPassword"
//                     className="text-orange-600 bg-blue-100 hover:bg-purple-300 transition-all px-3 py-2 rounded-xl text-base"
//                   >
//                     Change
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Feedback Section */}
//         {/* <div className="mb-10">
//           <h1 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2">Give Feedback</h1>
//           <div className="pt-4 max-w-4xl"> 
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Feedback:</h2>
//           {allFeedback.length > 0 ? (
//             <div className="space-y-4 mb-6">
//               {allFeedback.map((item, index) => (
//                 <div
//                   key={index}
//                   className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200"
//                 >
//                   <p className="text-gray-800 text-base">{item?.feedback}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-gray-600 italic mb-6">
//               No feedbacks are given yet.
//             </div>
//           )}
//             <button
//               onClick={() => setShowFeedback(!showFeedback)}
//               className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all mb-4"
//             >
//               {showFeedback ? 'Close Feedback' : 'Give Feedback'}
//             </button>

//             {showFeedback && (
//               <div className="bg-white p-4 rounded-lg shadow-md">
//                 <textarea
//                   rows="4"
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-purple-400"
//                   placeholder="Enter your feedback here..."
//                   name='feedback'
//                   value={data.feedback}
//                   onChange={handleChange}
//                   required
//                 />
//                 <button
//                   onClick={handleSubmit}
//                   className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all"
//                 >
//                   Submit Feedback
//                 </button>
//               </div>
//             )}
//           </div>
//         </div> */}
//       </div>

//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default Profile;

import { FaCode, FaUserTie, FaProjectDiagram } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  const role = user?.role?.toLowerCase(); 

  const roleOptions = {
    developer: {
      label: "DEVELOPER",
      icon: <FaCode className="text-purple-600 text-4xl mb-3" />,
      path: "/Developer/Login",
    },
    client: {
      label: "CLIENT",
      icon: <FaUserTie className="text-green-600 text-4xl mb-3" />,
      path: "/Client/Login",
    },
    scrum_master: {
      label: "SCRUM_MASTER",
      icon: <FaProjectDiagram className="text-blue-600 text-4xl mb-3" />,
      path: "/ScrumMaster/Login",
    },
  };

  const selectedRole = roleOptions[role]; 

  return (
    <div className="bg-gradient-to-br from-purple-100 via-[#f3e8ff] to-[#e9d5ff] min-h-screen">
      <div className="container w-full px-6 md:px-28 pt-20">
        <h1 className="text-3xl font-semibold pb-4 mt-12">Profile</h1>

        
        <div className="mb-10">
          <h1 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2">
            User
          </h1>
          <div className="text-lg pt-4 max-w-4xl">
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex gap-2">
                <span className="font-medium w-40">Email:</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium w-40">Name:</span>
                <span>{user?.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium w-40">Role:</span>
                <span className="capitalize">{role}</span>
              </div>
            </div>
          </div>
        </div>

        
        {selectedRole && (
          <div className="mb-10">
            <h1 className="text-2xl font-semibold border-b-2 border-gray-300 pb-4">
              Continue As
            </h1>

            <div className="flex justify-start mt-6">
              <button
                onClick={() => navigate(selectedRole.path)}
                className="flex flex-col items-center bg-white shadow-lg hover:shadow-xl p-8 rounded-xl transition transform hover:scale-105 w-56"
              >
                {selectedRole.icon}
                <span className="text-xl font-semibold">
                  {selectedRole.label}
                </span>
              </button>
            </div>
          </div>
        )}

        
        {!selectedRole && (
          <p className="text-red-600 font-medium">
            Role not recognized. Please contact admin.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
