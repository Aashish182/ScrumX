// const Standup = require("../models/standupsModel");
// const SubTask = require("../models/subtasksModel");
// const User = require("../models/userModel");

// const getChatAnalysis = async (req, res) => {
//   try {
//     const standups = await Standup.find({}).sort({ created_at: -1 });
//     const subtasks = await SubTask.find({});
//     const users = await User.find({ role: "DEVELOPER" });

//     // user map (IMPORTANT FIX)
//     const userMap = {};
//     users.forEach(u => {
//       userMap[u._id.toString()] = {
//         name: u.name,
//         roleId: u.roleId || "N/A"
//       };
//     });

//     const devMap = {};

//     // ================= TASKS =================
//     subtasks.forEach(task => {
//       const devId = task.assignee_id?.toString();
//       if (!devId) return;

//       if (!devMap[devId]) {
//         devMap[devId] = {
//           developerId: devId,
//           developerName: userMap[devId]?.name || "Unknown",
//           roleId: userMap[devId]?.roleId || "N/A",

//           total: 0,
//           done: 0,
//           blocked: 0,
//           inProgress: 0,

//           updates: [],
//           standupDays: {}
//         };
//       }

//       devMap[devId].total++;

//       if (task.status === "Done") devMap[devId].done++;
//       else if (task.status === "Blocked") devMap[devId].blocked++;
//       else devMap[devId].inProgress++;
//     });

//     // ================= STANDUPS =================
//     standups.forEach(s => {
//       const devId = s.developer_id?.toString();
//       if (!devId) return;

//       // 🔥 FIX: even if no tasks, still show dev
//       if (!devMap[devId]) {
//         devMap[devId] = {
//           developerId: devId,
//           developerName: userMap[devId]?.name || "Unknown",
//           roleId: userMap[devId]?.roleId || "N/A",

//           total: 0,
//           done: 0,
//           blocked: 0,
//           inProgress: 0,

//           updates: [],
//           standupDays: {}
//         };
//       }

//       const dateKey = new Date(s.created_at).toISOString().split("T")[0];

//       devMap[devId].standupDays[dateKey] = true;

//       devMap[devId].updates.unshift({
//         text: s.raw_message,
//         date: s.created_at
//       });
//     });

//     // ================= FINAL RESPONSE =================
//     const result = Object.values(devMap).map(dev => {
//       const presentDays = Object.keys(dev.standupDays).length;
//       const totalDays = 30;

//       return {
//         ...dev,

//         updates: dev.updates.slice(0, 3),

//         productivity:
//           dev.total === 0 ? 0 : Math.round((dev.done / dev.total) * 100),

//         standupChart: [
//           { name: "Present", value: presentDays },
//           { name: "Missed", value: totalDays - presentDays }
//         ]
//       };
//     });

//     res.json({ success: true, data: result });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };

// module.exports = { getChatAnalysis };

const Standup = require("../models/standupsModel");
const SubTask = require("../models/subtasksModel");
const User = require("../models/userModel");

const getChatAnalysis = async (req, res) => {
  try {

    // 🔥 ONLY DEVELOPERS (IMPORTANT FIX)
    const users = await User.find({ role: "DEVELOPER" });

    const subtasks = await SubTask.find({});
    const standups = await Standup.find({}).sort({ created_at: -1 });

    // ================= DEV MAP =================
    const devMap = {};

    users.forEach(u => {
      devMap[u._id.toString()] = {
        developerId: u._id.toString(),
        developerName: u.name,
        roleId: u.roleId || "N/A",

        total: 0,
        done: 0,
        blocked: 0,
        inProgress: 0,

        updates: [],
        standupDays: {}
      };
    });

    // ================= TASKS =================
    subtasks.forEach(task => {
      const devId = task.assignee_id?.toString();

      if (!devId || !devMap[devId]) return;

      devMap[devId].total++;

      if (task.status === "Done") devMap[devId].done++;
      else if (task.status === "Blocked") devMap[devId].blocked++;
      else devMap[devId].inProgress++;
    });

    // ================= STANDUPS =================
    standups.forEach(s => {
      const devId = s.developer_id?.toString();

      if (!devId || !devMap[devId]) return;

      const dateKey = new Date(s.created_at)
        .toISOString()
        .split("T")[0];

      devMap[devId].standupDays[dateKey] = true;

      devMap[devId].updates.push({
        text: s.raw_message,
        date: s.created_at
      });
    });

    // ================= RESPONSE =================
    const result = Object.values(devMap).map(dev => {
      const presentDays = Object.keys(dev.standupDays).length;
      const totalDays = 30;

      return {
        ...dev,

        updates: dev.updates.slice(0, 5),

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