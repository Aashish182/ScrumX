const Subtask = require("../models/subtasksModel");
const Task = require("../models/tasksModel");
const Story = require("../models/userstoriesModel");
const Sprint = require("../models/sprintModel");
const Team = require("../models/teamModel");
const mongoose = require("mongoose");

exports.getTeamPerformance = async (req, res) => {
  try {
    const { teamId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Team ID",
      });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    // ✅ TEAM MEMBERS
    const memberIds = team.members
      .filter(id => mongoose.Types.ObjectId.isValid(id))
      .map(id => new mongoose.Types.ObjectId(id));

    // ✅ FETCH SUBTASKS
    const subtasks = await Subtask.aggregate([
      {
        $match: {
          assignee_id: { $in: memberIds },
        },
      },
      {
        $addFields: {
          isOverdue: {
            $and: [
              { $in: ["$status", ["To Do", "In Progress"]] },
              {
                $lt: [
                  "$created_at",
                  new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                ],
              },
            ],
          },
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
          status: {
            $cond: {
              if: "$isOverdue",
              then: "Overdue",
              else: "$status",
            },
          },
          percent_complete: { $ifNull: ["$percent_complete", 0] },

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

          task_id: 1,
        },
      },
    ]);

    // ✅ FIND SPRINT
    let sprint = null;

    if (subtasks.length > 0) {
      const taskIds = [...new Set(subtasks.map(s => s.task_id))];

      const tasks = await Task.find({ _id: { $in: taskIds } });

      const storyIds = [...new Set(tasks.map(t => t.story_id))];

      const stories = await Story.find({ _id: { $in: storyIds } });

      if (stories.length > 0) {
        sprint = await Sprint.findOne({
          _id: stories[0].sprint_id,
          status: "Active",
        });
      }
    }

    // =========================
    // ✅ METRICS
    // =========================

    const total = subtasks.length;

    const doneTasks = subtasks.filter(s => s.status === "Done");
    const blockedTasks = subtasks.filter(s => s.status === "Blocked");
    const overdueTasks = subtasks.filter(s => s.status === "Overdue");

    const totalHours = subtasks.reduce(
      (sum, s) => sum + (Number(s.estimatedHours) || 0),
      0
    );

    const completedHours = doneTasks.reduce(
      (sum, s) => sum + (Number(s.estimatedHours) || 0),
      0
    );

    // ✅ VELOCITY (ONLY DONE WORK)
    const velocity = completedHours;

    // ✅ PROGRESS %
    const progress = total
      ? Math.round(
          subtasks.reduce((sum, s) => sum + s.percent_complete, 0) / total
        )
      : 0;

    // ✅ CAPACITY
    const totalMembers = memberIds.length || 1;
    const maxCapacity = totalMembers * 40;
    const capacity = Math.min(
      Math.round((totalHours / maxCapacity) * 100),
      100
    );

    return res.status(200).json({
      success: true,
      data: {
        subtasks,

        sprintInfo: {
          name: sprint?.name || "No Active Sprint",
          goal: sprint?.goal || "",
        },

        sprintPoints: velocity,
        totalTeamMembers: totalMembers,

        metrics: {
          total,
          done: doneTasks.length,
          blocked: blockedTasks.length,
          overdue: overdueTasks.length,
          totalHours,
          progress,
          capacity,
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