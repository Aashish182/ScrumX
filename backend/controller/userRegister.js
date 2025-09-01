const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function userRegisterController(req, res) {
  try {
    const { name, number, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists!",
        error: true,
        success: false,
      });
    }

    if (!name || !number || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const saveUser = await new userModel(payload).save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User registered successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
}

module.exports = userRegisterController;
