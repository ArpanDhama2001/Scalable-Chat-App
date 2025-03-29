const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const { roomid } = req.query;
    res.render("join", { roomid });
});

module.exports = router;
