const Team = require("../models/teamModel");
const User = require("../models/userModel");

// GET RETROSPECTIVE DATA
const getRetrospectiveController = async (req, res) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    const members = await User.find({
      _id: { $in: team.members },
    }).select("name email");

    const data = {
      velocity: 42,
      sayDo: 95,
      quality: 98,
      hours: 120,
      wentWell: [
        "Smooth sprint execution",
        "Good UI collaboration",
      ],
      improvements: [
        "Need better planning",
        "Improve API testing",
      ],
      members,
    };

    return res.status(200).json({
      success: true,
      data,
      message: "Retrospective loaded",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = getRetrospectiveController;