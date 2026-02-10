// const SubTask = require("../models/subtasksModel");
// const Task = require("../models/tasksModel");
// const Story = require("../models/userstoriesModel");
// const Sprint = require("../models/sprintModel");

// const getCurrentSprintController = async (req, res) => {
//     try {
//         const userId = req.userId || req.query.userId;

//         // 1. Get all subtasks assigned to this developer
//         const mySubtasks = await SubTask.find({ assignee_id: userId });

//         if (!mySubtasks.length) {
//             return res.status(200).json({
//                 success: true,
//                 message: "No tasks assigned to user",
//                 data: null
//             });
//         }

//         // 2. Extract Task IDs from subtasks to find the Sprint
//         const taskIds = mySubtasks.map(st => st.task_id);
//         const tasks = await Task.find({ _id: { $in: taskIds } });

//         // 3. Extract Story IDs from Tasks
//         const storyIds = tasks.map(t => t.story_id);
//         const stories = await Story.find({ _id: { $in: storyIds } });

//         // 4. Get the Sprint ID from the first story found 
//         // (Assuming all tasks belong to the same active sprint)
//         const sprintId = stories[0]?.sprint_id;

//         const activeSprint = await Sprint.findById(sprintId);

//         if (!activeSprint || activeSprint.status !== "Active") {
//             return res.status(200).json({
//                 success: true,
//                 message: "No active sprint found",
//                 data: null
//             });
//         }

//         // 5. Calculate Metrics for the dashboard
//         const total = mySubtasks.length;
//         const completed = mySubtasks.filter(s => s.status === "Done").length;
//         const blocked = mySubtasks.filter(s => s.status === "Blocked").length;
//         const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

//         res.status(200).json({
//             success: true,
//             data: {
//                 sprint: activeSprint,
//                 subtasks: mySubtasks,
//                 metrics: { total, completed, blocked, progress }
//             }
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

// module.exports = getCurrentSprintController;
const SubTask = require("../models/subtasksModel");
const Task = require("../models/tasksModel");
const Story = require("../models/userstoriesModel");
const Sprint = require("../models/sprintModel");

const getCurrentSprintController = async (req, res) => {
    try {
        const userId = req.userId || req.query.userId;

        // 1. Fetch ALL subtasks for this user to calculate accurate metrics first
        const allUserSubtasks = await SubTask.find({ assignee_id: userId });

        if (!allUserSubtasks.length) {
            return res.status(200).json({ success: true, data: null });
        }

        // 2. Filter out "Done" tasks for the "Active Work" list
        const activeSubtasks = allUserSubtasks.filter(task => task.status !== "Done");

        // 3. Resolve the Sprint via the Task -> Story chain
        const taskIds = allUserSubtasks.map(st => st.task_id);
        const tasks = await Task.find({ _id: { $in: taskIds } });
        const storyIds = tasks.map(t => t.story_id);
        const stories = await Story.find({ _id: { $in: storyIds } });
        
        const sprintId = stories[0]?.sprint_id;
        const activeSprint = await Sprint.findById(sprintId);

        // 4. Metrics calculation (Total vs Completed)
        const totalCount = allUserSubtasks.length;
        const completedCount = allUserSubtasks.filter(s => s.status === "Done").length;
        const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

        res.status(200).json({
            success: true,
            data: {
                sprint: activeSprint,
                subtasks: activeSubtasks, // Only returns Pending/To Do/In Progress
                metrics: { 
                    total: totalCount, 
                    remaining: activeSubtasks.length,
                    completed: completedCount, 
                    progress: progressPercent 
                }
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = getCurrentSprintController;