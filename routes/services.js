const express = require("express");
const ServiceController = require("../controllers/ServiceController");
const router = express.Router();
const { authentication } = require("../middleware/authentication");

router.get("/service", authentication, ServiceController.getUserServices);
router.get("/allServices", authentication, ServiceController.getAllServices);
router.post("/", authentication, ServiceController.create);
router.put(
  "/updateService/:_id",
  authentication,
  ServiceController.updateService
);
router.delete(
  "/deleteService/:_id",
  authentication,
  ServiceController.deleteService
);

module.exports = router;