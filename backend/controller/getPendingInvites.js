// const SubTask = require("../models/subtasksModel");

// const getPendingInvitesController = async (req, res) => {
//     try {
//         const invitations = await SubTask.find({ 
//             status: "Pending",
            
//             $or: [
//                 { assignee_id: req.userId }, 
//                 { assignee_id: null } 
//             ]
//         }).populate("_id");

//         res.json({ data: invitations, success: true });
//     } catch (err) {
//         res.status(400).json({ message: err.message, error: true });
//     }
// };
// module.exports = getPendingInvitesController;



const SubTask = require("../models/subtasksModel");

const getPendingInvitesController = async (req, res) => {
  try {
    const invitations = await SubTask.find({
      status: "Pending",
      $or: [
        { assignee_id: req.userId },
        { assignee_id: null }
      ]
    });

    res.json({
      success: true,
      data: invitations
    });

  } catch (err) {
    console.error("Invite Fetch Error:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = getPendingInvitesController;