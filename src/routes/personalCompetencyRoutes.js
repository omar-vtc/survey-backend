const express = require("express");
const personalCompetencyController = require("../controllers/personalCompetencyController");

const router = express.Router();

router
  .route("/personal-competency")
  .post(personalCompetencyController.addMachlanAns);
router
  .route("/personal-competency/:phone")
  .get(personalCompetencyController.getMachlanAns);

module.exports = router;
