const express = require("express");
const hollandController = require("../controllers/hollandController");

const router = express.Router();

router.route("/holland").post(hollandController.addMachlanAns);
router.route("/holland/:phone").get(hollandController.getMachlanAns);

module.exports = router;
