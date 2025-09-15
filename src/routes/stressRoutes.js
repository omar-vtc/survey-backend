const express = require("express");
const StressController = require("../controllers/StressController");

const router = express.Router();

router.route("/stress").post(StressController.addMachlanAns);
router.route("/stress/:phone").get(StressController.getMachlanAns);

module.exports = router;
