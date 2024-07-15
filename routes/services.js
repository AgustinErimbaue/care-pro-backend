const express = require("express");
const ServiceController = require("../controllers/ServiceController");
const router = express.Router();
const { authentication } = require("../middleware/authentication");

router.post("/", authentication, ServiceController.create);
module.exports = router;
