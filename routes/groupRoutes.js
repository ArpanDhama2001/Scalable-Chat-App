const express = require("express");
const router = express.Router();
const Group = require("../models/group");

router.get("/", async (req, res) => {
    try {
        const groups = await Group.find();
        res.render("home", { groups });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching groups");
    }
});

router.post("/", async (req, res) => {
    try {
        await Group.create({ name: req.body.name });
        res.redirect("/group");
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
