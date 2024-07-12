const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const { authentication } = require("../middleware/authentication");

router.get("/users",authentication, UserController.getAllUsers);
router.get("/id/:_id",authentication, UserController.getUserById);
router.get("/name/:username",authentication, UserController.getUserByName);
router.post("/", UserController.create);
router.post("/login", UserController.login);
router.delete("/id/:_id",authentication, UserController.deleteUser);
router.delete("/logout",authentication, UserController.logout);
router.put("/update/:_id",authentication, UserController.updateUser);

module.exports = router;