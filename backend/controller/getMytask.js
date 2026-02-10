// const subTaskModel = require("../models/subtasksModel");

// const getMyTasksController = async (req, res) => {
//   try {
//     // 1. Identify User (Assumes userId is attached to req via authToken middleware)
//     const currentUserId = req.userId;

//     if (!currentUserId) {
//       return res.status(401).json({
//         message: "User not authenticated",
//         error: true,
//         success: false,
//       });
//     }

//     // 2. Fetch subtasks assigned to this specific developer
//     // .populate('projectId') if you want to show project names in the table later
//     const subtasks = await subTaskModel
//       .find({ assignedTo: currentUserId })
//       .sort({ createdAt: -1 });

//     // 3. Calculate Metrics dynamically
//     const metrics = {
//       total: subtasks.length,
//       completed: subtasks.filter((task) => task.status === "Done").length,
//       blocked: subtasks.filter((task) => task.status === "Blocked").length,
//       inProgress: subtasks.filter((task) => task.status === "In Progress").length,
//     };

//     // 4. Return the response in the format your React frontend expects
//     res.status(200).json({
//       message: "Developer tasks fetched successfully",
//       success: true,
//       error: false,
//       data: {
//         subtasks,
//         metrics,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err.message || "Internal Server Error",
//       error: true,
//       success: false,
//     });
//   }
// };

// module.exports = getMyTasksController;


const subTaskModel = require("../models/subtasksModel");

const getMyTasksController = async (req, res) => {
  try {
    const currentUserId = req.userId;

    if (!currentUserId) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
        error: true
      });
    }

    // FIX: Change assignedTo -> assignee_id
    // FIX: Change createdAt -> created_at (per your schema)
    const subtasks = await subTaskModel
      .find({ assignee_id: currentUserId }) 
      .sort({ created_at: -1 });

    const metrics = {
      total: subtasks.length,
      completed: subtasks.filter((task) => task.status === "Done").length,
      blocked: subtasks.filter((task) => task.status === "Blocked").length,
      inProgress: subtasks.filter((task) => task.status === "In Progress").length,
    };

    res.status(200).json({
      success: true,
      error: false,
      data: { subtasks, metrics },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
      success: false,
      error: true
    });
  }
};

module.exports = getMyTasksController;