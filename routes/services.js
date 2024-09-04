const express = require("express");
const ServiceController = require("../controllers/ServiceController");
const router = express.Router();
const { authentication } = require("../middleware/authentication");

router.get("/service",authentication, ServiceController.getUserServices);
router.get("/allService", authentication,ServiceController.getAllServices)
router.post("/", authentication, ServiceController.create);
router.put("/updateService", authentication, ServiceController.updateService);

module.exports = router;
