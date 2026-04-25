const Subtask = require("../models/subtasksModel");
const Task = require("../models/tasksModel");
const Story = require("../models/userstoriesModel");
const Sprint = require("../models/sprintModel");
const Team = require("../models/teamModel");
const mongoose = require("mongoose");

exports.getTeamPerformance = async (req, res) => {
  try {
    const { teamId } = req.params;

    // 1. Validate teamId
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Team ID",
      });
    }

    // 2. Get team
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    // 3. Safe member IDs
    const memberIds = team.members
      .filter(id => mongoose.Types.ObjectId.isValid(id))
      .map(id => new mongoose.Types.ObjectId(id));

    // 4. Fetch subtasks (FIXED)
    const subtasks = await Subtask.aggregate([
      {
        $match: {
          assignee_id: { $in: memberIds },
        },
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

          percent_complete: {
            $ifNull: ["$percent_complete", 0],
          },

          // ✅ FIX: force number conversion
          estimatedHours: {
            $convert: {
              input: "$estimated_hours",
              to: "double",
              onError: 0,
              onNull: 0,
            },
          },

          assigneeName: {
            $ifNull: ["$assignee_info.name", "Unassigned"],
          },

          assignee_id: 1,
          task_id: 1,
        },
      },
    ]);

    // 5. Sprint fetch (SAFE)
    let sprint = null;

    if (subtasks.length > 0) {
      const taskIds = [
        ...new Set(subtasks.map(s => s.task_id).filter(Boolean)),
      ];

      const tasks = await Task.find({ _id: { $in: taskIds } });

      const storyIds = [
        ...new Set(tasks.map(t => t.story_id).filter(Boolean)),
      ];

      const stories = await Story.find({ _id: { $in: storyIds } });

      if (stories.length > 0) {
        sprint = await Sprint.findOne({
          _id: stories[0].sprint_id,
          status: "Active",
        });
      }
    }

    // 6. METRICS (FIXED SAFE REDUCE)
    const total = subtasks.length;
    const done = subtasks.filter(s => s.status === "Done").length;
    const blocked = subtasks.filter(s => s.status === "Blocked").length;
    const remaining = total - done;

    const totalHours = subtasks.reduce((sum, s) => {
      return sum + (Number(s.estimatedHours) || 0);
    }, 0);

    const progress = total ? Math.round((done / total) * 100) : 0;

    // 7. RESPONSE
    return res.status(200).json({
      success: true,
      data: {
        subtasks,

        sprintInfo: {
          name: sprint?.name || "No Active Sprint",
          goal: sprint?.goal || "",
          start_date: sprint?.start_date,
          end_date: sprint?.end_date,
        },

        metrics: {
          total,
          done,
          remaining,
          blocked,
          progress,
          totalHours,
        },
      },
    });

  } catch (error) {
    console.error("Team Performance Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};