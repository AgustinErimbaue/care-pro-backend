const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authentication");
const ContractController = require("../controllers/ContractController");

router.post("/hire", ContractController.hireService);
module.exports = router;
