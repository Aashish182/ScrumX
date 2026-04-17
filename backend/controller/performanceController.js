

const Subtask = require("../models/subtasksModel"); // Check your actual model file name!
const Team = require("../models/teamModel");       // Double-check this filename!
const mongoose = require("mongoose");

exports.getTeamPerformance = async (req, res) => {
  try {
    const { teamId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({ success: false, message: "Invalid Team ID" });
    }

    // 1. Verify Team exists
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ success: false, message: "Team not found" });

    // 2. Aggregation Logic
    const subtasks = await Subtask.aggregate([
      {
        // FILTER: Only get subtasks where the assignee is one of the team members
        // (This assumes subtasks are linked via assignee_id)
        $match: {
          assignee_id: { $in: team.members.map(id => new mongoose.Types.ObjectId(id)) }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "assignee_id",
          foreignField: "_id",
          as: "assignee_info",
        },
      },
      {
        $unwind: {
          path: "$assignee_info",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          status: 1,
          percent_complete: { $ifNull: ["$percent_complete", 0] },
          estimatedHours: { $ifNull: ["$estimatedHours", 0] },
          assigneeName: { $ifNull: ["$assignee_info.name", "Unassigned"] },
          created_at: 1,
        },
      },
      { $sort: { created_at: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        subtasks,
        totalTeamMembers: team.members.length,
        sprintPoints: 0, 
        sprintInfo: {
          name: "Current Sprint",
          goal: team.projectName || "Goal not set"
        }
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};