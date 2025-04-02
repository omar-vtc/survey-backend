const express = require("express");
const MBTIController = require("../controllers/MBTIController");
const router = express.Router();

router.route("/mbti").post(MBTIController.addMBTIAns);
router.route("/mbti/:phone").get(MBTIController.getMBTIAns);

module.exports = router;
