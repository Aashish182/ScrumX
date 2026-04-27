// const express = require("express");
// const cors = require("cors");
// require('dotenv').config();
// const cookieParser = require('cookie-parser');
// const http = require('http'); // 1. Import HTTP module
// const { Server } = require('socket.io'); // 2. Import Socket.io
// const connectDB = require("../backend/config/db");
// const router = require('./routes/index');
// const chat = require("./models/chatModel"); // 3. Import your chat Model

// const app = express();

// // --- UPDATED MIDDLEWARES ---
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }));

// /** 
//  * FIX: Increase the limit for JSON and URL-encoded bodies.
//  * This prevents the '413 Payload Too Large' error when 
//  * uploading Base64 images/documents.
//  */
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

// app.use(cookieParser());

// // API Routes
// app.use("/api", router);

// // 4. Create the HTTP Server using Express app
// const server = http.createServer(app);

// // 5. Initialize Socket.io
// const io = new Server(server, {
//     cors: {
//         origin: process.env.FRONTEND_URL,
//         methods: ["GET", "POST"],
//         credentials: true
//     }
// });

// // 6. Socket.io Logic
// io.on("connection", (socket) => {
//     console.log("User Connected:", socket.id);

//     // Join a private room for the team
//     socket.on("join-team", (teamId) => {
//         socket.join(teamId);
//         console.log(`User joined team room: ${teamId}`);
//     });

//     // Listen for chats from frontend
//     socket.on("send-chat", async (data) => {
//         try {
//             // Save to MongoDB
//             const newchat = new chat({
//                 teamId: data.teamId,
//                 senderId: data.senderId,
//                 senderName: data.senderName,
//                 text: data.text,
//                 timestamp: data.timestamp
//             });
//             await newchat.save();

//             // Send chat to everyone else in that team room
//             socket.to(data.teamId).emit("receive-chat", data);
//         } catch (error) {
//             console.error("Socket Error:", error);
//         }
//     });

//     socket.on("disconnect", () => {
//         console.log("User Disconnected");
//     });
// });

// const PORT = process.env.PORT || 8080;

// // 7. IMPORTANT: Listen via 'server', not 'app'
// connectDB().then(() => {
//     server.listen(PORT, () => {
//         console.log("Connect to db");
//         console.log(`Server is running on port ${PORT}`);
//     });
// });


const express = require("express");
const cors = require("cors");
require('dotenv').config();
const cookieParser = require('cookie-parser');
const http = require('http'); 
const { Server } = require('socket.io'); 
const connectDB = require("../backend/config/db");
const router = require('./routes/index'); // This is the gatekeeper
const chat = require("./models/chatModel"); 

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api", router);

// --- ADD THIS: DEBUGGING FOR 404s ---
// If the frontend hits a route that isn't defined, this will log it in your terminal
app.use((req, res) => {
    console.log(`404 - Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ success: false, message: "Route not found on server" });
});

const server = http.createServer(app);
const startOverdueJob = require("./controller/overdueJob");
startOverdueJob();

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("join-team", (teamId) => {
        socket.join(teamId);
        console.log(`User joined team room: ${teamId}`);
    });

    socket.on("send-chat", async (data) => {
        try {
            const newchat = new chat({
                teamId: data.teamId,
                senderId: data.senderId,
                senderName: data.senderName,
                text: data.text,
                timestamp: data.timestamp
            });
            await newchat.save();
            socket.to(data.teamId).emit("receive-chat", data);
        } catch (error) {
            console.error("Socket Error:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
});

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("Connected to DB");
        console.log(`Server is running on port ${PORT}`);
    });
});