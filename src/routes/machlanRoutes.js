const express = require("express");
const machlanController = require("../controllers/machlanController");

const router = express.Router();

router.route("/machlan").post(machlanController.addMachlanAns);
router.route("/machlan/:phone").get(machlanController.getMachlanAns);

module.exports = router;
