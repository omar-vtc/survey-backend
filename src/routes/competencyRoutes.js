const express = require("express");
const competencyController = require("../controllers/competencyController");
const router = express.Router();

router.route("/competency").post(competencyController.addCompetency);
router.route("/competency/:phone").get(competencyController.getCompetency);

module.exports = router;
