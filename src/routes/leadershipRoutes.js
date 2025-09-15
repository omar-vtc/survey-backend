const express = require("express");
const leadershipController = require("../controllers/leadershipController");

const router = express.Router();

router.route("/leadership").post(leadershipController.addMachlanAns);
router.route("/leadership/:phone").get(leadershipController.getMachlanAns);

module.exports = router;
