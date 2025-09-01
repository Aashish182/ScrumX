const express = require('express');
const router = express.Router();

// Controller imports
const userRegisterController = require('../controller/userRegister');
const userLoginController = require('../controller/userLogin');
const userDetailsController = require('../controller/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/userLogout');
const allUsers = require('../controller/allUsers');
const updateUser = require('../controller/updateUser');
const roleLogin = require('../controller/roleLogin');
const aboutusDetails = require('../controller/aboutusDetails');


// Routes
router.post("/Register", userRegisterController);
router.post("/Login", userLoginController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.get("/AllUser", allUsers);
router.post("/UpdateUser", updateUser);
router.post("/rolelogin", roleLogin);
router.post("/aboutusdetail", aboutusDetails);

module.exports = router;
