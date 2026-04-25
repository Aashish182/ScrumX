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

// // module.exports = getCurrentSprintController;
// const SubTask = require("../models/subtasksModel");
// const Task = require("../models/tasksModel");
// const Story = require("../models/userstoriesModel");
// const Sprint = require("../models/sprintModel");

// const getCurrentSprintController = async (req, res) => {
//     try {
//         const userId = req.userId || req.query.userId;

//         // 1. Fetch ALL subtasks for this user to calculate accurate metrics first
//         const allUserSubtasks = await SubTask.find({ assignee_id: userId });

//         if (!allUserSubtasks.length) {
//             return res.status(200).json({ success: true, data: null });
//         }

//         // 2. Filter out "Done" tasks for the "Active Work" list
//         const activeSubtasks = allUserSubtasks.filter(task => task.status !== "Done");

//         // 3. Resolve the Sprint via the Task -> Story chain
//         const taskIds = allUserSubtasks.map(st => st.task_id);
//         const tasks = await Task.find({ _id: { $in: taskIds } });
//         const storyIds = tasks.map(t => t.story_id);
//         const stories = await Story.find({ _id: { $in: storyIds } });
        
//         const sprintId = stories[0]?.sprint_id;
//         const activeSprint = await Sprint.findById(sprintId);

//         // 4. Metrics calculation (Total vs Completed)
//         const totalCount = allUserSubtasks.length;
//         const completedCount = allUserSubtasks.filter(s => s.status === "Done").length;
//         const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

//         res.status(200).json({
//             success: true,
//             data: {
//                 sprint: activeSprint,
//                 subtasks: activeSubtasks, // Only returns Pending/To Do/In Progress
//                 metrics: { 
//                     total: totalCount, 
//                     remaining: activeSubtasks.length,
//                     completed: completedCount, 
//                     progress: progressPercent 
//                 }
//             }
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: "Server Error" });
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

        // 1. Get subtasks
        const subtasks = await SubTask.find({ assignee_id: userId });

        if (!subtasks.length) {
            return res.status(200).json({ success: true, data: null });
        }

        // 2. Get related tasks (safe mapping)
        const taskIds = [...new Set(subtasks.map(s => s.task_id).filter(Boolean))];

        const tasks = await Task.find({ _id: { $in: taskIds } });

        if (!tasks.length) {
            return res.status(200).json({ success: true, data: null });
        }

        // 3. Get stories
        const storyIds = [...new Set(tasks.map(t => t.story_id).filter(Boolean))];

        const stories = await Story.find({ _id: { $in: storyIds } });

        if (!stories.length) {
            return res.status(200).json({ success: true, data: null });
        }

        // 4. Get sprint
        const sprintId = stories[0]?.sprint_id;
        const sprint = await Sprint.findById(sprintId);

        if (!sprint) {
            return res.status(200).json({ success: true, data: null });
        }

        // 5. Metrics calculation
        const total = subtasks.length;
        const done = subtasks.filter(s => s.status === "Done").length;
        const remaining = total - done;

        const totalHours = subtasks.reduce(
            (sum, s) => sum + Number(s.estimated_hours || 0),
            0
        );

        const completedHours = subtasks
            .filter(s => s.status === "Done")
            .reduce((sum, s) => sum + Number(s.estimated_hours || 0), 0);

        const progress = total ? Math.round((done / total) * 100) : 0;

        // 6. Active subtasks sorted (important for UI)
        const activeSubtasks = subtasks
            .filter(s => s.status !== "Done")
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        return res.status(200).json({
            success: true,
            data: {
                sprint: {
                    _id: sprint._id,
                    name: sprint.name,
                    goal: sprint.goal,
                    start_date: sprint.start_date,
                    end_date: sprint.end_date
                },
                subtasks: activeSubtasks,
                metrics: {
                    total,
                    done,
                    remaining,
                    progress,
                    totalHours,
                    completedHours
                }
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = getCurrentSprintController;