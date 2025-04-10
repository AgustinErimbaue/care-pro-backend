const User = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { JWT_SECRET: jwt_secret } = process.env;
const bcrypt = require("bcrypt");
const transporter = require("../config/nodemailer");

const UserController = {
  async create(req, res) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);

      const user = await User.create({ ...req.body, password });

      const emailToken = jwt.sign({ email: req.body.email }, jwt_secret);

      const url = `http://localhost:8080/users/confirm/` + emailToken;

      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirmación de Registro en Care-Pro",
        html: `
          <h2>¡Gracias por unirte a Care-Pro!</h2>
          <p>Estimado/a usuario/a,</p>
          <p>Estamos encantados de darte la bienvenida a nuestra plataforma. Para completar tu registro, por favor haz clic en el enlace a continuación:</p>
          <p><a href="${url}" style="color: #007bff; text-decoration: none;">Confirmar mi cuenta</a></p>
          <p>Si no solicitaste este registro, simplemente ignora este correo.</p>
          <p>Atentamente,<br>El equipo de Care-Pro</p>
          <hr>
          <small>Este correo fue enviado automáticamente. Por favor, no respondas a este mensaje.</small>
        `,
      });

      res.status(201).send({
        message: "Te hemos enviado un correo para confirmar el registro",
        user,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: "Error en el servidor al crear usuario" });
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
  
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        return res
          .status(400)
          .send({ message: "Correo o contraseña incorrecta" });
      }
  
      if (!user.confirmed) {
        return res.status(403).send({
          message: "Cuenta no confirmada. Por favor, verifica tu correo.",
        });
      }
  
      const token = jwt.sign({ _id: user._id }, jwt_secret, { expiresIn: '1d' });
  
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
      res.status(500).send({ message: "Error en el servidor" });
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
        name: new RegExp(req.params.name, "i"),
      });
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error en el servidor" });
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
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      res.status(500).send({
        message: "Hubo un problema al intentar desconectar al usuario",
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
      const user = await User.findById(req.user._id);
      if (!user)
        return res.status(404).send({ message: "Usuario no encontrado" });

      if (!req.file) {
        return res
          .status(400)
          .send({ message: "No se ha proporcionado ninguna imagen" });
      }

      user.profileImage = req.file.path;
      await user.save();

      res.status(200).json({
        message: "Imagen de perfil actualizada",
        profileImage: req.file.path,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al subir la imagen de perfil" });
    }
  },
  async confirm(req, res) {
    try {
      const token = req.params.emailToken;

      const payload = jwt.verify(token, jwt_secret);

      const user = await User.findOneAndUpdate(
        { email: payload.email },
        { confirmed: true },
        { new: true }
      );

      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }

      res.status(200).send("Usuario confirmado con éxito");
    } catch (error) {
      console.error("Error en confirmación:", error);
      res.status(500).send({ message: "Error al confirmar el usuario" });
    }
  },
};

module.exports = UserController;
