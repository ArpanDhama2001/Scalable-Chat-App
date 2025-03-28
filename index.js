const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const connect = require("./config/db-config");
const path = require("path");

const Group = require("./models/group");
const Chat = require("./models/chat");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const onlineUsers = {}; // Store online users per group

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
    socket.on("join_room", (data) => {
        console.log("joining a room", data.roomid);
        const { roomid, username } = data;
        if (!username || username.trim() === "") return;
        socket.join(roomid);

        // Initialize room if not exists
        if (!onlineUsers[roomid]) {
            onlineUsers[roomid] = new Set();
        }

        // Add user to the room
        onlineUsers[roomid].add(username);

        // Broadcast updated online users list
        io.to(roomid).emit(
            "update_online_users",
            Array.from(onlineUsers[roomid])
        );

        // Store the username and roomid for this socket
        socket.username = username;
        socket.roomid = roomid;
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);

        const { username, roomid } = socket;

        if (roomid && username && onlineUsers[roomid]) {
            onlineUsers[roomid].delete(username);

            // Broadcast the updated online users list
            io.to(roomid).emit(
                "update_online_users",
                Array.from(onlineUsers[roomid])
            );

            // Notify others that the user has left
            io.to(roomid).emit("user_left", username);
        }
    });

    socket.on("new_msg", async (data) => {
        console.log("received new message", data);
        try {
            const chat = await Chat.create({
                roomid: data.roomid,
                sender: data.sender,
                content: data.message,
            });
            io.to(data.roomid).emit("msg_rcvd", data);
        } catch (error) {
            console.log(error);
        }
    });
});

app.get("/chat/:roomid/:user", async (req, res) => {
    try {
        const group = await Group.findById(req.params.roomid);
        const chats = await Chat.find({
            roomid: req.params.roomid,
        });
        res.render("index", {
            roomid: req.params.roomid,
            user: req.params.user,
            groupname: group.name,
            previousmsgs: chats,
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/group", async (req, res) => {
    try {
        const groups = await Group.find(); // Fetch all groups from the database
        res.render("home", { groups }); // Render the home page with the list of groups
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching groups");
    }
});

app.get("/join", (req, res) => {
    const { roomid } = req.query;
    res.render("join", { roomid });
});

app.get("/chat/:roomid", async (req, res) => {
    const { roomid } = req.params;
    const { user } = req.query; // Get the username from the query string
    try {
        const group = await Group.findById(roomid);
        const chats = await Chat.find({ roomid });
        res.render("index", {
            roomid,
            user,
            groupname: group.name,
            previousmsgs: chats,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error loading chat room");
    }
});

app.post("/group", async (req, res) => {
    console.log(req.body);
    try {
        await Group.create({
            name: req.body.name,
        });
        res.redirect("/group");
    } catch (error) {
        console.log(error);
    }
});

server.listen(3001, async () => {
    console.log("listening on *:3000");
    try {
        await connect();
    } catch (error) {
        console.log("DB CONNECTION ERROR:", error);
    }
    console.log("DB connected");
});
