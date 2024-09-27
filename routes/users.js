const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes en formato jpeg, jpg o png"));
    }
  },
});

const { authentication } = require("../middleware/authentication");

router.get("/users", authentication, UserController.getAllUsers);
router.get("/id/:_id", authentication, UserController.getUserById);
router.get("/name/:name", authentication, UserController.getUserByName);
router.post("/", UserController.create);
router.post("/login", UserController.login);
router.delete("/delete", authentication, UserController.deleteUser);
router.delete("/logout", authentication, UserController.logout);
router.put("/update", authentication, UserController.updateUser);

module.exports = router;
