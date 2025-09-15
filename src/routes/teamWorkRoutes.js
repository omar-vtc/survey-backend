const express = require("express");
const teamWorkController = require("../controllers/teamWorkController");

const router = express.Router();

router.route("/teamwork").post(teamWorkController.addMachlanAns);
router.route("/teamwork/:phone").get(teamWorkController.getMachlanAns);

module.exports = router;
