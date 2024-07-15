const express = require("express");
const ServiceController = require("../controllers/ServiceController");
const router = express.Router();
const { authentication } = require("../middleware/authentication");

router.post("/", authentication, ServiceController.create);
router.put("/updateService", authentication, ServiceController.updateService);
module.exports = router;
