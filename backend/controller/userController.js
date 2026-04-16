const userModel = require("../models/userModel");

const userController = {
    // 1. Fetch User Details (Used by App.js on refresh)
    getUserDetails: async (req, res) => {
        try {
            const user = await userModel.findById(req.userId).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User not found", error: true, success: false });
            }
            res.status(200).json({ data: user, error: false, success: true });
        } catch (err) {
            res.status(400).json({ message: err.message, error: true, success: false });
        }
    },

    // 2. Update Profile & Documents
    updateUser: async (req, res) => {
        try {
            const sessionUser = req.userId;
            const { 
                name, number, office, emergency, 
                country, languages, profilePic, documents 
            } = req.body;

            const payload = {
                ...(name && { name }),
                ...(number && { number }),
                ...(office && { office }),
                ...(emergency && { emergency }),
                ...(country && { country }),
                ...(languages && { languages }),
                profilePic, // We allow these to be empty if user clears them
                documents   
            };

            const updatedUser = await userModel.findByIdAndUpdate(
                sessionUser,
                payload,
                { new: true }
            ).select("-password");

            res.status(200).json({
                data: updatedUser,
                message: "Profile & Vault Updated",
                success: true,
                error: false
            });
        } catch (err) {
            res.status(500).json({ message: err.message, error: true, success: false });
        }
    }
};

module.exports = userController;