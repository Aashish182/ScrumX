const mongoose = require('mongoose');
const Subtask = require('../models/subtasksModel'); 

exports.getTeamPerformance = async (req, res) => {
    try {
        const { teamId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(teamId)) {
            return res.status(400).json({ success: false, message: "Invalid Team ID" });
        }

        const objectIdTeam = new mongoose.Types.ObjectId(teamId);

        /**
         * 1. BAR CHART DATA
         * Groups by sprint to show completion trends.
         * Assumes subtasks have a 'sprint_id' or 'sprint_name' field.
         */
        const barData = await Subtask.aggregate([
            { $match: { team_id: objectIdTeam } },
            {
                $group: {
                    _id: "$sprint_name", 
                    // Counts based on your 'status' field
                    Completed: { $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] } },
                    Pending: { $sum: { $cond: [{ $eq: ["$status", "In Progress"] }, 1, 0] } }, 
                    Overdue: { $sum: { $cond: [{ $eq: ["$status", "Overdue"] }, 1, 0] } }
                }
            },
            { 
                $project: { 
                    name: { $ifNull: ["$_id", "Unassigned"] }, 
                    Completed: 1, 
                    Pending: 1, 
                    Overdue: 1, 
                    _id: 0 
                } 
            },
            { $sort: { name: 1 } }
        ]);

        /**
         * 2. PIE CHART DATA
         * Distribution based on task categories or status.
         */
        const pieData = await Subtask.aggregate([
            { $match: { team_id: objectIdTeam } },
            {
                $group: {
                    _id: "$status",
                    value: { $sum: 1 }
                }
            },
            { $project: { name: "$_id", value: 1, _id: 0 } }
        ]);

        /**
         * 3. AGGREGATED METRICS
         * Using 'percent_complete' and 'estimated_hours' from your schema.
         */
        const stats = await Subtask.aggregate([
            { $match: { team_id: objectIdTeam } },
            {
                $group: {
                    _id: null,
                    avgProgress: { $avg: "$percent_complete" },
                    totalHours: { $sum: "$estimated_hours" },
                    overdueCount: { $sum: { $cond: [{ $eq: ["$status", "Overdue"] }, 1, 0] } },
                    totalCount: { $sum: 1 }
                }
            }
        ]);

        const result = stats[0] || { avgProgress: 0, totalHours: 0, overdueCount: 0, totalCount: 0 };

        const metrics = {
            engagement: `${Math.round(result.avgProgress || 0)}%`, // Progress %
            blockers: `${result.overdueCount}/${result.totalCount}`, // Overdue ratio
            velocity: `${result.totalHours} hrs` // Total capacity in hours
        };

        res.status(200).json({
            success: true,
            barData,
            pieData,
            metrics
        });

    } catch (error) {
        console.error("ScrumX Analytics Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};