const SubTask = require("../models/subtasksModel");

const respondSubtaskController = async (req, res) => {
    try {
        const { subtaskId, accept } = req.body;
        const userId = req.userId; 
        console.log("Received response for subtask:", subtaskId, "Accept:", accept, "User ID:", userId);
        if (!accept) return res.json({ success: true, message: "Declined" });

        // Force the update using $set to ensure the field is overwritten
        const updated = await SubTask.findByIdAndUpdate(
            subtaskId,
            { 
                $set: { 
                    assignee_id: userId, 
                    status: "To Do" 
                } 
            },
            { 
                new: true, 
                runValidators: false 
            }
        );

        if (!updated) {
            return res.status(404).json({ message: "Task not found", success: false });
        }

        // CHECK YOUR VS CODE TERMINAL FOR THIS LOG:
        console.log("SUCCESS! New Assignee is:", updated.assignee_id);

        res.json({ data: updated, success: true });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ message: err.message });
    }
};
module.exports = respondSubtaskController;