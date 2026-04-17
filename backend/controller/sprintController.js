const sprintModels = require("../models/sprintModel");
const subtaskModels = require("../models/subtasksModel");

const sprintController = {
    getAllSprintsWithSubtasks: async (req, res) => {
        try {
            console.log("DEBUG: Fetching sprints from DB...");

            // 1. We find sprints
            // 2. We populate 'subtasks' (the field in your Sprint Schema)
            // 3. We use .lean() to convert Mongoose docs to plain JS objects (Prevents 500 crashes)
            const sprints = await sprintModels.find()
                .populate({
                    path: 'subtasks', 
                    model: 'subtask' // CHECK: Does your subtaskModels.js use "subtask" or "subtasks"?
                })
                .sort({ createdAt: -1 })
                .lean(); 

            console.log(`DEBUG: Successfully found ${sprints?.length || 0} sprints`);

            res.status(200).json({
                data: sprints,
                message: "Sprints loaded",
                success: true,
                error: false
            });
        } catch (err) {
            console.error("CRITICAL ERROR IN GET_ALL_SPRINTS:", err.stack);
            res.status(500).json({
                message: err.message || "Internal Server Error",
                error: true,
                success: false
            });
        }
    },

    updateSubtaskTeam: async (req, res) => {
        try {
            const { subtaskId, teamId } = req.body;
            
            if (!subtaskId) {
                return res.status(400).json({ message: "Subtask ID required", error: true });
            }

            console.log(`DEBUG: Assigning subtask ${subtaskId} to team ${teamId}`);

            const updated = await subtaskModels.findByIdAndUpdate(
                subtaskId,
                { team_id: teamId || null }, // Allow unassigning by passing empty value
                { new: true }
            );

            res.status(200).json({
                data: updated,
                message: "Assignment updated successfully",
                success: true,
                error: false
            });
        } catch (err) {
            console.error("UPDATE ERROR:", err.message);
            res.status(500).json({ 
                message: err.message, 
                error: true, 
                success: false 
            });
        }
    }
};

module.exports = sprintController;