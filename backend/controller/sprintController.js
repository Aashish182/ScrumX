const Sprint = require("../models/sprintModel");
const Story = require("../models/userstoriesModel");
const Task = require("../models/tasksModel");
const Subtask = require("../models/subtasksModel");
const Team = require("../models/teamModel");
const User = require("../models/userModel");

// GET ALL SPRINTS WITH SUBTASKS + TEAM INFO
exports.getAllSprintsWithSubtasks = async (req, res) => {
  try {
    const sprints = await Sprint.find().sort({ createdAt: -1 });

    const result = [];

    for (const sprint of sprints) {
      const stories = await Story.find({ sprint_id: sprint._id });
      const storyIds = stories.map(s => s._id);

      const tasks = await Task.find({ story_id: { $in: storyIds } });
      const taskIds = tasks.map(t => t._id);

      const subtasks = await Subtask.find({ task_id: { $in: taskIds } });

      // attach team + assignee details
      const enrichedSubtasks = await Promise.all(
        subtasks.map(async (st) => {
          const team = st.team_id ? await Team.findById(st.team_id) : null;
          const user = st.assignee_id ? await User.findById(st.assignee_id) : null;

          return {
            ...st.toObject(),
            teamName: team?.teamName || "Unassigned Team",
            teamMembers: team?.members || [],
            assigneeName: user?.name || "Unassigned",
          };
        })
      );

      result.push({
        ...sprint.toObject(),
        subtasks: enrichedSubtasks,
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
      message: "Sprints loaded",
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// UPDATE TEAM + ASSIGNEE
exports.updateSubtask = async (req, res) => {
  try {
    const { subtaskId, teamId, assigneeId } = req.body;

    const updateData = {};

    if (teamId !== undefined) updateData.team_id = teamId;
    if (assigneeId !== undefined) updateData.assignee_id = assigneeId;

    const updated = await Subtask.findByIdAndUpdate(
      subtaskId,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updated,
      message: "Subtask updated",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};