const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const connect = require("./config/db-config");
const { pub, sub } = require("./redis/redisClient");
const socketHandlers = require("./sockets/socketHandlers");
const { chatRoutes, groupRoutes, joinRoutes } = require("./routes");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/group", groupRoutes);
app.use("/chat", chatRoutes);
app.use("/join", joinRoutes);

// Socket.io
socketHandlers(io);

// Start Server
server.listen(3001, async () => {
    console.log("listening on *:3001");
    try {
        await connect();
        console.log("DB connected");
    } catch (error) {
        console.error("DB CONNECTION ERROR:", error);
    }
});
