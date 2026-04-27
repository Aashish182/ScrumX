const Subtask = require("../models/subtasksModel");
const Task = require("../models/tasksModel");
const Story = require("../models/userstoriesModel");
const Sprint = require("../models/sprintModel");
const Team = require("../models/teamModel");
const mongoose = require("mongoose");

const getTeamPerformanceAnalytics = async (req, res) => {
  try {
    const { teamId } = req.params;

    // ✅ Validate
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Team ID",
      });
    }

    // ✅ Get team
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    // ✅ Members
    const memberIds = team.members
      .filter(id => mongoose.Types.ObjectId.isValid(id))
      .map(id => new mongoose.Types.ObjectId(id));

    // ✅ Subtasks
    const subtasks = await Subtask.find({
      assignee_id: { $in: memberIds },
    });

    // 🔥 Chain mapping
    const taskIds = [...new Set(subtasks.map(s => s.task_id).filter(Boolean))];
    const tasks = await Task.find({ _id: { $in: taskIds } });

    const storyIds = [...new Set(tasks.map(t => t.story_id).filter(Boolean))];
    const stories = await Story.find({ _id: { $in: storyIds } });

    const sprintIds = [...new Set(stories.map(s => s.sprint_id).filter(Boolean))];
    const sprints = await Sprint.find({ _id: { $in: sprintIds } });

    // 🔥 Maps for fast lookup
    const taskMap = {};
    tasks.forEach(t => (taskMap[t._id] = t));

    const storyMap = {};
    stories.forEach(s => (storyMap[s._id] = s));

    const sprintMap = {};
    sprints.forEach(s => {
      sprintMap[s._id] = {
        name: s.name,
        Completed: 0,
        Pending: 0,
        Overdue: 0,
      };
    });

    // 🔥 Status counts
    let done = 0;
    let blocked = 0;
    let overdueTasks = 0;

    // 🔥 MAIN LOOP
    subtasks.forEach(sub => {
      const task = taskMap[sub.task_id];
      if (!task) return;

      const story = storyMap[task.story_id];
      if (!story) return;

      const sprintId = story.sprint_id?.toString();
      if (!sprintMap[sprintId]) return;

      const sprint = sprints.find(
        s => s._id.toString() === sprintId
      );

      const isOverdue =
        sprint &&
        sprint.end_date &&
        new Date() > new Date(sprint.end_date) &&
        sub.status !== "Done";

      if (sub.status === "Done") {
        sprintMap[sprintId].Completed++;
        done++;
      } else if (isOverdue) {
        sprintMap[sprintId].Overdue++;
        overdueTasks++;
      } else {
        sprintMap[sprintId].Pending++;
      }

      // 🔥 Blocked
      if (sub.status === "Blocked" || sub.status === "Rejected") {
        blocked++;
      }
    });

    const total = subtasks.length;
    const pending = total - done;

    // 🔥 Final Data
    const barData = Object.values(sprintMap);

    const pieData = [
      { name: "Completed", value: done },
      { name: "Pending", value: pending },
      { name: "Overdue", value: overdueTasks },
    ];

    const engagement = total === 0 ? 0 : Math.round((done / total) * 100);

    return res.status(200).json({
      success: true,
      data: {
        metrics: {
          engagement: `${engagement}%`,
          blockers: `${blocked}`,
          velocity: `${done} pts`,
          overdue: `${overdueTasks}`,
        },
        barData,
        pieData,
      },
    });

  } catch (error) {
    console.error("Performance Analytics Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = getTeamPerformanceAnalytics;