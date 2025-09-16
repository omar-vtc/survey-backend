const express = require("express");
const patternsController = require("../controllers/patternsController");

const router = express.Router();

router.route("/patterns").post(patternsController.addMachlanAns);
router.route("/patterns/:phone").get(patternsController.getMachlanAns);

module.exports = router;
