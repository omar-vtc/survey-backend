const express = require("express");
const MBTIController = require("../controllers/MBTIController");
const router = express.Router();

router.route("/mbti").post(MBTIController.addMBTIAns);

module.exports = router;
