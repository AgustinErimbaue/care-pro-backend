const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.post("/", UserController.create);
router.get("/users", UserController.getAllUsers);
router.get("/id/:_id", UserController.getUserByid);
router.get("/name/:username", UserController.getUserByName);
router.delete('/id/:_id',UserController.deleteUser)
module.exports = router;
