const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys");

const UserController = {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).send(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el usuario" });
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      const token = jwt.sign({ _id: user._id }, jwt_secret);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.send({ message: `Bienveid@ ${user.username}, ${token}` });
    } catch (error) {
      console.error(error);
    }
  },
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.error(error);
    }
  },
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params._id);
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },
  async getUserByName(req, res) {
    try {
      const user = await User.find({
        $text: {
          $search: req.params.username,
        },
      });
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params._id);
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Desconectado con extito" });
    } catch (error) {
      res.status(500).send({message:"Hubno un problema la intentar desconectar al usuario"})
    }
  },
};
module.exports = UserController;
