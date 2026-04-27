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
const createBlog = require('../controller/createBlog');
const blogDetailsController = require('../controller/blogDetails');
const blogUser = require('../controller/blogUser');
const AllAboutUs = require('../controller/allQueries');
const createTeam = require('../controller/createTeam');
const allTeams = require('../controller/teamDetails');
const updateTeams = require('../controller/updateTeams');
const getTeamDetail = require('../controller/teamDetail');
const { getTeamchatsController } = require('../controller/chatController');
const getMyTasksController = require('../controller/getMytask');
const assignSubtasksController = require('../controller/assignSubTasks');
const getPendingInvitesController = require('../controller/getPendingInvites');
const respondSubtaskController = require('../controller/respondSubtask');
const getCurrentSprintController = require('../controller/currentSprint');
const {getDeveloperDashboardData, updateFocusTask} = require('../controller/devDashboard');
const userController = require('../controller/userController');
const sprintController = require('../controller/sprintController');
const { getTeamPerformance } = require('../controller/performanceController');
const getRetrospectiveController = require('../controller/retrospectiveController');
const getTeamPerformanceAnalytics = require('../controller/teamPerformanceAnalytics');
const { getChatAnalysis } = require('../controller/chatAnalysisController');
const { getStandups } = require("../controller/standupController");





// Routes
router.post("/Register", userRegisterController);
router.post("/Login", userLoginController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.get("/AllUser", allUsers);
router.post("/UpdateUser", updateUser);
router.post("/rolelogin", roleLogin);
router.post("/aboutusdetail", aboutusDetails);
router.post("/create-blog", createBlog);
router.get("/blogdetails", blogDetailsController);
router.get("/blog-user", blogUser);
router.get("/AllAboutus", AllAboutUs);
router.post("/CreateTeam", createTeam);
router.get("/AllTeams", allTeams);
router.post("/UpdateTeam", updateTeams);
router.post("/TeamDetail", getTeamDetail);
router.get("/team-chats/:teamId", getTeamchatsController);
router.get("/my-tasks",authToken,getMyTasksController);
router.post("/assign-subtasks", authToken, assignSubtasksController);
router.get("/pending-invitations",authToken, getPendingInvitesController);
router.post("/respond-subtask",authToken, respondSubtaskController);
router.get("/current-sprint", authToken, getCurrentSprintController);
router.post("/developer-dashboard", authToken,getDeveloperDashboardData);
router.post("/update-focus-task", authToken, updateFocusTask);
router.post("/update-user", authToken, userController.updateUser);
router.get("/get-user-details", authToken, userController.getUserDetails);



router.get("/sprints-with-subtasks", sprintController.getAllSprintsWithSubtasks);

// UPDATE SUBTASK (TEAM + ASSIGNEE)
router.patch("/update-subtask", sprintController.updateSubtask);


router.get("/team/performance/:teamId", getTeamPerformance);
router.get("/retrospective/:teamId", getRetrospectiveController);

router.get("/team/performance-analytics/:teamId", getTeamPerformanceAnalytics);
router.get("/get-chat-analysis", getChatAnalysis);
router.get("/standups", getStandups);



module.exports = router;
