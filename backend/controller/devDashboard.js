// const SubTask = require("../models/subtasksModel");
// const Task = require("../models/tasksModel");
// const Story = require("../models/userstoriesModel");
// const Sprint = require("../models/sprintModel");

// const getDeveloperDashboardData = async (req, res) => {
//     try {
//         const userId = req.userId || req.query.userId;

//         // 1. Fetch ALL subtasks for this user and deep populate the hierarchy
//         const mySubtasks = await SubTask.find({ assignee_id: userId })
//             .populate({
//                 path: 'task_id',
//                 populate: {
//                     path: 'story_id',
//                     populate: {
//                         path: 'sprint_id'
//                     }
//                 }
//             });

//         if (!mySubtasks.length) {
//             return res.status(200).json({
//                 success: true,
//                 data: { activeSprint: null, stats: { totalTasks: 0, blockers: 0 }, monthlyTasks: [] }
//             });
//         }

//         // 2. Identify the Active Sprint and Calculate Metrics
//         let activeSprintObj = null;
//         let blockersCount = 0;
        
//         // Blockers = High priority tasks that are NOT Done
//         blockersCount = mySubtasks.filter(st => 
//             (st.priority === "High" || st.priority === "Critical") && st.status !== "Done"
//         ).length;

//         // Find the Sprint from the first subtask that has a valid chain
//         for (const st of mySubtasks) {
//             const sprint = st.task_id?.story_id?.sprint_id;
//             if (sprint && sprint.status === "Active") {
//                 activeSprintObj = {
//                     sprintName: sprint.name,
//                     daysLeft: Math.max(0, Math.ceil((new Date(sprint.endDate) - new Date()) / (1000 * 60 * 60 * 24)))
//                 };
//                 break;
//             }
//         }

//         // 3. Prepare Calendar Data (Monthly Tasks)
//         // Ensure frontend gets title, dueDate, and priority for the calendar dots
//         const monthlyTasks = mySubtasks.map(st => ({
//             _id: st._id,
//             title: st.title,
//             dueDate: st.dueDate, // The frontend uses this to place it on the calendar
//             priority: st.priority,
//             status: st.status
//         }));

//         // 4. Final Response formatted for DeveloperDashboard.jsx
//         res.status(200).json({
//             success: true,
//             data: {
//                 activeSprint: activeSprintObj || { sprintName: "No Active Sprint", daysLeft: 0 },
//                 stats: {
//                     totalTasks: mySubtasks.length,
//                     completed: mySubtasks.filter(s => s.status === "Done").length,
//                     blockers: blockersCount,
//                     velocity: "12pts", // Placeholder or calculated based on story points
//                     focusTask: mySubtasks.find(st => st.status === "In Progress") || null
//                 },
//                 monthlyTasks: monthlyTasks
//             }
//         });

//     } catch (err) {
//         console.error("Dashboard Error:", err);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

// module.exports = getDeveloperDashboardData;



// const SubTask = require("../models/subtasksModel");

// const getDeveloperDashboardData = async (req, res) => {
//     try {
//         const userId = req.userId || req.query.userId;

//         // Populate: SubTask -> Task -> Story -> Sprint
//         // Note: Ensure your Task model has 'story_id' and Story has 'sprint_id'
//         const subtasks = await SubTask.find({ assignee_id: userId })
//             .populate({
//                 path: 'task_id',
//                 populate: {
//                     path: 'story_id',
//                     populate: { path: 'sprint_id' }
//                 }
//             });

//         // 1. Identify the Active Sprint from the subtask population chain
//         let activeSprint = null;
//         for (const st of subtasks) {
//             const sprint = st.task_id?.story_id?.sprint_id;
//             if (sprint && sprint.status === "Active") {
//                 activeSprint = {
//                     name: sprint.name,
//                     created_at: sprint.created_at,
//                     // Assume 14-day sprint duration for UI visualization
//                     estimatedEnd: new Date(new Date(sprint.created_at).getTime() + 14 * 24 * 60 * 60 * 1000)
//                 };
//                 break; 
//             }
//         }

//         // 2. Metrics Calculation
//         const totalSubtasks = subtasks.length;
//         const pendingBlockers = subtasks.filter(s => s.status !== "Done").length;

//         // 3. Map for Calendar (Using created_at as requested)
//         const calendarData = subtasks.map(s => ({
//             _id: s._id,
//             title: s.title,
//             status: s.status,
//             created_at: s.created_at,
//             percent_complete: s.percent_complete
//         }));

//         res.status(200).json({
//             success: true,
//             data: {
//                 activeSprint,
//                 stats: {
//                     totalTasks: totalSubtasks,
//                     blockers: pendingBlockers,
//                 },
//                 monthlyTasks: calendarData
//             }
//         });
//     } catch (err) {
//         console.error("Dashboard Error:", err);
//         res.status(500).json({ success: false, message: "Server sync failed" });
//     }
// };

// module.exports = { getDeveloperDashboardData };


// const SubTask = require("../models/subtasksModel");

// const getDeveloperDashboardData = async (req, res) => {
//     try {
//         const userId = req.userId || req.query.userId;

//         // Populate the chain to get Sprint data
//         const subtasks = await SubTask.find({ assignee_id: userId })
//             .populate({
//                 path: 'task_id',
//                 populate: {
//                     path: 'story_id',
//                     populate: { path: 'sprint_id' }
//                 }
//             });

//         // 1. Identify the Active Sprint
//         let activeSprint = null;
//         for (const st of subtasks) {
//             const sprint = st.task_id?.story_id?.sprint_id;
//             if (sprint && sprint.status === "Active") {
//                 activeSprint = {
//                     sprintName: sprint.name,
//                     created_at: sprint.created_at,
//                     estimatedEnd: new Date(new Date(sprint.created_at).getTime() + 14 * 24 * 60 * 60 * 1000)
//                 };
//                 break;
//             }
//         }

//         // 2. Calculate the 4 Card Values
//         const totalTasks = subtasks.length;
//         const blockers = subtasks.filter(s => s.status !== "Done").length;
//         const focusTask = subtasks.find(s => s.focus === "yes");
        
//         // Calculate Days Remaining (Logic-based)
//         const daysLeft = activeSprint 
//             ? Math.max(0, Math.ceil((activeSprint.estimatedEnd - new Date()) / (1000 * 60 * 60 * 24))) 
//             : 0;

//         res.status(200).json({
//             success: true,
//             data: {
//                 activeSprint: { ...activeSprint, daysLeft },
//                 stats: {
//                     totalTasks,
//                     blockers,
//                     focusTask: focusTask || null,
//                     velocity: "24pts" // Placeholder or calculated based on completed story points
//                 },
//                 monthlyTasks: subtasks
//             }
//         });
//     } catch (err) {
//         res.status(500).json({ success: false, message: err.message });
//     }
// };

// // NEW: Toggle Focus Logic
// const updateFocusTask = async (req, res) => {
//     try {
//         const { taskId } = req.body;
//         const userId = req.userId;

//         // Set all user's tasks to focus "no"
//         await SubTask.updateMany({ assignee_id: userId }, { focus: "no" });
        
//         // Set selected task to focus "yes"
//         const updated = await SubTask.findByIdAndUpdate(taskId, { focus: "yes" }, { new: true });

//         res.status(200).json({ success: true, data: updated });
//     } catch (err) {
//         res.status(500).json({ success: false, message: err.message });
//     }
// };

// module.exports = { getDeveloperDashboardData, updateFocusTask };


const SubTask = require("../models/subtasksModel");

const getDeveloperDashboardData = async (req, res) => {
    try {
        const userId = req.userId || req.query.userId;

        const subtasks = await SubTask.find({ assignee_id: userId })
            .populate({
                path: 'task_id',
                populate: { path: 'story_id', populate: { path: 'sprint_id' } }
            });

        let activeSprint = null;
        for (const st of subtasks) {
            const sprint = st.task_id?.story_id?.sprint_id;
            if (sprint && sprint.status === "Active") {
                activeSprint = {
                    sprintName: sprint.name,
                    created_at: sprint.created_at,
                    estimatedEnd: new Date(new Date(sprint.created_at).getTime() + 14 * 24 * 60 * 60 * 1000)
                };
                break;
            }
        }

        const focusTask = subtasks.find(s => s.focus === "yes");

        res.status(200).json({
            success: true,
            data: {
                activeSprint: {
                    ...activeSprint,
                    daysLeft: activeSprint ? Math.max(0, Math.ceil((activeSprint.estimatedEnd - new Date()) / (1000 * 60 * 60 * 24))) : 0
                },
                stats: {
                    totalTasks: subtasks.length,
                    blockers: subtasks.filter(s => s.status !== "Done").length,
                    focusTask: focusTask || null,
                    velocity: "24pts"
                },
                monthlyTasks: subtasks
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateFocusTask = async (req, res) => {
    try {
        const { taskId, focus } = req.body; // focus is "yes" or "no"
        const userId = req.userId;

        // 1. If we are focusing a task, set all others to "no"
        if (focus === "yes") {
            await SubTask.updateMany({ assignee_id: userId }, { focus: "no" });
        }
        
        // 2. Update the specific task
        const updated = await SubTask.findByIdAndUpdate(taskId, { focus }, { new: true });

        res.status(200).json({ success: true, data: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { getDeveloperDashboardData, updateFocusTask };