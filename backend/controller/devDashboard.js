// const SubTask = require("../models/subtasksModel");

// const getDeveloperDashboardData = async (req, res) => {
//   try {
//     const userId = req.userId || req.query.userId;

//     // 🔹 Fetch all subtasks assigned to this developer
//     const subtasks = await SubTask.find({ assignee_id: userId })
//       .populate({
//         path: "task_id",
//         populate: {
//           path: "story_id",
//           populate: { path: "sprint_id" }
//         }
//       });

//     // =========================
//     // 🔹 ACTIVE SPRINT
//     // =========================
//     let activeSprint = null;

//     for (const st of subtasks) {
//       const sprint = st.task_id?.story_id?.sprint_id;

//       if (sprint && sprint.status === "Active") {
//         activeSprint = sprint;
//         break;
//       }
//     }

//     let sprintData = {
//       sprintName: "No Active Sprint",
//       daysLeft: 0
//     };

//     if (activeSprint) {
//       const start = new Date(activeSprint.created_at);
//       const end = new Date(start.getTime() + 14 * 24 * 60 * 60 * 1000);

//       sprintData = {
//         sprintName: activeSprint.name,
//         daysLeft: Math.max(
//           0,
//           Math.ceil((end - new Date()) / (1000 * 60 * 60 * 24))
//         )
//       };
//     }

//     // =========================
//     // 🔹 METRICS
//     // =========================
//     const totalTasks = subtasks.length;

//     const completedTasks = subtasks.filter(s => s.status === "Done");

//     // 🔥 REAL VELOCITY (sum of completed work)
//     const velocity = completedTasks.reduce(
//       (sum, s) => sum + (Number(s.estimated_hours) || 0),
//       0
//     );

//     const blockers = subtasks.filter(s => s.status === "Blocked").length;

//     const focusTask = subtasks.find(s => s.focus === "yes") || null;

//     // =========================
//     // 🔹 RESPONSE
//     // =========================
//     res.status(200).json({
//       success: true,
//       data: {
//         activeSprint: sprintData,

//         stats: {
//           totalTasks,
//           completedTasks: completedTasks.length,
//           blockers,
//           velocity, // ✅ FIXED
//           focusTask
//         },

//         monthlyTasks: subtasks
//       }
//     });

//   } catch (err) {
//     console.error("Developer Dashboard Error:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };

// const updateFocusTask = async (req, res) => {
//   try {
//     const { taskId, focus } = req.body;
//     const userId = req.userId;

//     // Remove focus from all tasks
//     if (focus === "yes") {
//       await SubTask.updateMany(
//         { assignee_id: userId },
//         { focus: "no" }
//       );
//     }

//     // Set focus on selected task
//     const updated = await SubTask.findByIdAndUpdate(
//       taskId,
//       { focus },
//       { new: true }
//     );

//     res.status(200).json({
//       success: true,
//       data: updated
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };

// module.exports = {
//   getDeveloperDashboardData,
//   updateFocusTask
// };

const SubTask = require("../models/subtasksModel");

const getDeveloperDashboardData = async (req, res) => {
  try {
    const userId = req.userId || req.query.userId;

    // 🔹 Fetch all subtasks assigned to this developer
    const subtasks = await SubTask.find({ assignee_id: userId })
      .populate({
        path: "task_id",
        populate: {
          path: "story_id",
          populate: { path: "sprint_id" }
        }
      });

    // =========================
    // 🔹 ACTIVE SPRINT
    // =========================
    let activeSprint = null;

    for (const st of subtasks) {
      const sprint = st.task_id?.story_id?.sprint_id;

      if (sprint && sprint.status === "Active") {
        activeSprint = sprint;
        break;
      }
    }

    let sprintData = {
      sprintName: "No Active Sprint",
      daysLeft: 0
    };

    if (activeSprint) {
      const start = new Date(activeSprint.created_at);
      const end = new Date(start.getTime() + 14 * 24 * 60 * 60 * 1000);

      sprintData = {
        sprintName: activeSprint.name,
        daysLeft: Math.max(
          0,
          Math.ceil((end - new Date()) / (1000 * 60 * 60 * 24))
        )
      };
    }

    // =========================
    // 🔹 METRICS
    // =========================
    const totalTasks = subtasks.length;

    const completedTasks = subtasks.filter(s => s.status === "Done");

    // 🔥 REAL VELOCITY (sum of completed work)
    const velocity = completedTasks.reduce(
      (sum, s) => sum + (Number(s.estimated_hours) || 0),
      0
    );

    const blockers = subtasks.filter(s => s.status === "Blocked").length;

    const focusTask = subtasks.find(s => s.focus === "yes") || null;

    // =========================
    // 🔹 LATEST SUBTASKS (Review Queue)
    // =========================
    let doneOrBlocked = subtasks
        .filter(s => s.status === "Done" || s.status === "Blocked")
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 2);

        let todo = subtasks
        .filter(s => s.status !== "Done" && s.status !== "Blocked")
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 1);

        // fallback if less items
        const combined = [...doneOrBlocked, ...todo];

        if (combined.length < 3) {
        const remaining = subtasks
            .filter(s => !combined.includes(s))
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        combined.push(...remaining.slice(0, 3 - combined.length));
        }

        const latestSubtasks = combined.map(s => ({
        _id: s._id,
        title: s.title,
        status: s.status,
        updatedAt: s.updatedAt
        }));

    // =========================
    // 🔹 RESPONSE
    // =========================
    res.status(200).json({
      success: true,
      data: {
        activeSprint: sprintData,

        stats: {
          totalTasks,
          completedTasks: completedTasks.length,
          blockers,
          velocity,
          focusTask
        },

        monthlyTasks: subtasks,

        latestSubtasks // ✅ NEW FIELD (for Review Queue)
      }
    });

  } catch (err) {
    console.error("Developer Dashboard Error:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const updateFocusTask = async (req, res) => {
  try {
    const { taskId, focus } = req.body;
    const userId = req.userId;

    // Remove focus from all tasks
    if (focus === "yes") {
      await SubTask.updateMany(
        { assignee_id: userId },
        { focus: "no" }
      );
    }

    // Set focus on selected task
    const updated = await SubTask.findByIdAndUpdate(
      taskId,
      { focus },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updated
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  getDeveloperDashboardData,
  updateFocusTask
};