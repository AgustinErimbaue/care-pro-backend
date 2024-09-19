const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authentication");
const ContractController = require("../controllers/ContractController");

router.get("/contract-info", authentication, ContractController.getUserProfile);
router.post("/hire", authentication, ContractController.hireService);

module.exports = router;
