const { pub, sub } = require("../redis/redisClient");

const onlineUsers = {}; // Store online users per group

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("join_room", (data) => {
            const { roomid, username } = data;
            if (!username || username.trim() === "") return;

            console.log(`User ${username} joining room: ${roomid}`);
            socket.join(roomid);

            // Subscribe to the Redis channel for this room
            sub.subscribe(`room:${roomid}`, (err, count) => {
                if (err) {
                    console.error(`Error subscribing to room:${roomid}:`, err);
                } else {
                    console.log(
                        `Subscribed to room:${roomid}. Total subscriptions: ${count}`
                    );
                }
            });

            // Initialize room if it doesn't exist
            if (!onlineUsers[roomid]) {
                onlineUsers[roomid] = new Set();
            }

            // Add the user to the room
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

        socket.on("new_msg", async (data) => {
            const { roomid, sender, message } = data;
            console.log(
                `New message from ${sender} in room ${roomid}: ${message}`
            );

            try {
                // Publish the message to the Redis channel
                pub.publish(`room:${roomid}`, JSON.stringify(data));

                // TODO: DB store
            } catch (error) {
                console.error("Error publishing to Redis:", error);
            }
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

                // Unsubscribe from the Redis channel if the room is empty
                if (onlineUsers[roomid].size === 0) {
                    sub.unsubscribe(`room:${roomid}`, (err) => {
                        if (err) {
                            console.error(
                                `Error unsubscribing from room:${roomid}:`,
                                err
                            );
                        } else {
                            console.log(`Unsubscribed from room:${roomid}`);
                        }
                    });
                }
            }
        });
    });

    // Redis Subscriber: Handle incoming messages from Redis
    sub.on("message", (channel, message) => {
        const roomid = channel.split(":")[1]; // Extract room ID from the channel name
        const data = JSON.parse(message);

        console.log(`Message received from Redis for room ${roomid}:`, data);

        // Broadcast the message to all clients in the room
        io.to(roomid).emit("msg_rcvd", data);
    });
};
