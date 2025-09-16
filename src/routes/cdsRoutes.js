const express = require("express");
const cdsController = require("../controllers/cdsController");

const router = express.Router();

router.route("/cds").post(cdsController.addMachlanAns);
router.route("/cds/:phone").get(cdsController.getMachlanAns);

module.exports = router;
