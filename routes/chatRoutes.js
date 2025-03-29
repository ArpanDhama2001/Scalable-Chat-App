const express = require("express");
const router = express.Router();
const Group = require("../models/group");
const Chat = require("../models/chat");

router.get("/:roomid", async (req, res) => {
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

module.exports = router;
