const express = require("express");
const ServiceController = require("../controllers/ServiceController");
const router = express.Router();

router.post("/", ServiceController.create);
module.exports = router;
