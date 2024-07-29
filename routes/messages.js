const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authentication");
const MessageController = require("../controllers/MessageController");

router.post("/", MessageController.create);

module.exports = router;
