const mongoose = require("mongoose");
const SubTask = require("../models/subtasksModel");
const User = require("../models/userModel");

const COLLECTION_NAME = "standups";

const getChatAnalysis = async (req, res) => {
  try {

    // 👨‍💻 Developers
    const users = await User.find({ role: "DEVELOPER" });

    // 📌 Tasks
    const subtasks = await SubTask.find({});

    // 🔥 Native MongoDB (Python data)
    const db = mongoose.connection;
    const collection = db.collection(COLLECTION_NAME);

    const standups = await collection
      .find({})
      .sort({ created_at: -1 }) // latest first
      .toArray();

    const devMap = {};

    // ================= INIT =================
    users.forEach(u => {
      devMap[u._id.toString()] = {
        developerId: u._id.toString(),
        developerName: u.name,
        roleId: u.roleId || "N/A",

        total: 0,
        done: 0,
        blocked: 0,
        inProgress: 0,

        latestStandup: null,
        standupDays: {}
      };
    });

    // ================= TASK COUNT =================
    subtasks.forEach(task => {
      const devId = task.assignee_id?.toString();
      if (!devId || !devMap[devId]) return;

      devMap[devId].total++;

      if (task.status === "Done") devMap[devId].done++;
      else if (task.status === "Blocked") devMap[devId].blocked++;
      else devMap[devId].inProgress++;
    });

    // ================= STANDUPS (PYTHON DATA) =================
    standups.forEach(s => {
      const devId = s.developer_id?.toString();
      if (!devId || !devMap[devId]) return;

      const dateKey = new Date(s.created_at)
        .toISOString()
        .split("T")[0];

      devMap[devId].standupDays[dateKey] = true;

      // 🔥 ONLY LATEST PER DEVELOPER
      if (!devMap[devId].latestStandup) {
        devMap[devId].latestStandup = {
          text: s.raw_message || "No updates",
          date: s.created_at
        };
      }
    });

    // ================= RESPONSE =================
    const result = Object.values(devMap).map(dev => {
      const presentDays = Object.keys(dev.standupDays).length;
      const totalDays = 30;

      return {
        ...dev,

        productivity:
          dev.total === 0 ? 0 : Math.round((dev.done / dev.total) * 100),

        standupChart: [
          { name: "Present", value: presentDays },
          { name: "Missed", value: totalDays - presentDays }
        ]
      };
    });

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    console.error("Chat Analysis Error:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = { getChatAnalysis };