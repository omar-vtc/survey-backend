const express = require("express");
const FinancialCompetencyController = require("../controllers/financialCompetencyController");
const router = express.Router();

router
  .route("/financial-competency")
  .post(FinancialCompetencyController.addCompetency);
router
  .route("/financial-competency/:phone")
  .get(FinancialCompetencyController.getCompetency);

module.exports = router;
