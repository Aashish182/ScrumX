const SubTask = require("../models/subtasksModel");

const assignSubtasksController = async (req, res) => {
    try {
        const { assignments } = req.body; 
        // assignments is an array of: { title, description, task_id, assignee_id, role_tag }

        const data = assignments.map(item => ({
            ...item,
            status: "Pending" // Custom status for the handshake
        }));

        const result = await SubTask.insertMany(data);
        res.status(201).json({
            message: "Subtasks assigned and notifications sent!",
            success: true,
            data: result
        });
    } catch (err) {
        res.status(400).json({ message: err.message, error: true });
    }
};
module.exports = assignSubtasksController;