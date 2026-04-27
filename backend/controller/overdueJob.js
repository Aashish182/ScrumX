const cron = require("node-cron");
const Subtask = require("../models/subtasksModel");

const startOverdueJob = () => {

  // ⏰ Runs every 1 hour
  cron.schedule("0 * * * *", async () => {
    try {
      console.log("🔄 Running Overdue Job...");

      const twoDaysAgo = new Date(Date.now() - (2 * 24 * 60 * 60 * 1000));

      const result = await Subtask.updateMany(
        {
          status: { $in: ["To Do", "In Progress"] },
          updated_at: { $lte: twoDaysAgo }
        },
        {
          $set: { status: "Overdue" }
        }
      );

      console.log(`✅ Overdue Updated: ${result.modifiedCount}`);

    } catch (err) {
      console.error("❌ Overdue Job Error:", err.message);
    }
  });

};

module.exports = startOverdueJob;