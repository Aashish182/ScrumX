// const express = require("express")
// const cors = require("cors")
// require('dotenv').config();
// const cookieParser = require('cookie-parser')
// const connectDB = require("../backend/config/db");
// const router = require('./routes/index');

// const app = express()
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }));
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api",router);

// const PORT = 8080 || process.env.PORT

// connectDB().then(() => {
//     app.listen(PORT,() => {
//         console.log("Connect to db");
//         console.log("Server is running");
//     })
// })


const express = require("express");
const cors = require("cors");
require('dotenv').config();
const cookieParser = require('cookie-parser');
const http = require('http'); // 1. Import HTTP module
const { Server } = require('socket.io'); // 2. Import Socket.io
const connectDB = require("../backend/config/db");
const router = require('./routes/index');
const chat = require("./models/chatModel"); // 3. Import your chat Model

const app = express();

// Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api", router);

// 4. Create the HTTP Server using Express app
const server = http.createServer(app);

// 5. Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
});

// 6. Socket.io Logic
io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // Join a private room for the team
    socket.on("join-team", (teamId) => {
        socket.join(teamId);
        console.log(`User joined team room: ${teamId}`);
    });

    // Listen for chats from frontend
    socket.on("send-chat", async (data) => {
        try {
            // Save to MongoDB
            const newchat = new chat({
                teamId: data.teamId,
                senderId: data.senderId,
                senderName: data.senderName,
                text: data.text,
                timestamp: data.timestamp
            });
            await newchat.save();

            // Send chat to everyone else in that team room
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

// 7. IMPORTANT: Listen via 'server', not 'app'
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("Connect to db");
        console.log(`Server is running on port ${PORT}`);
    });
});