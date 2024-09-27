const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys");
const bcrypt = require("bcrypt");

const UserController = {
  async create(req, res) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ ...req.body, password });
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

      if (!user) {
        return res
          .status(400)
          .send({ message: "Correo o contraseña incorrecta" });
      }

      const isPasswordValid =
        req.body.password &&
        bcrypt.compareSync(req.body.password, user.password);

      if (!isPasswordValid) {
        return res
          .status(400)
          .send({ message: "Correo o contraseña incorrecta" });
      }

      const token = jwt.sign({ _id: user._id }, jwt_secret);

      if (user.tokens.length > 4) {
        user.tokens.shift();
      }

      user.tokens.push(token);
      await user.save();

      res.send({
        user: { _id: user._id, name: user.name, email: user.email },
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error en el servidor" });
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
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error en el servidor" });
    }
  },
  async getUserByName(req, res) {
    try {
      const user = await User.find({
        $text: {
          $search: req.params.usname,
        },
      });
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.user._id);
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      res.send({ message: "Usuario eliminado correctamente", user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema al eliminar el usuario" });
    }
  },
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Desconectado con exito" });
    } catch (error) {
      res.status(500).send({
        message: "Hubno un problema la intentar desconectar al usuario",
      });
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
      });
      res.send(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema al actualizar el usuario" });
    }
  },
  async uploadProfileImage(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).send("Usuario no encontrado");

      user.profileImage = req.file.path;
      await user.save();

      res
        .status(200)
        .json({
          message: "Imagen de perfil actualizada",
          profileImage: req.file.path,
        });
    } catch (error) {
      res.status(500).json({ error: "Error al subir la imagen de perfil" });
    }
  },
};
module.exports = UserController;
