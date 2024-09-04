const Service = require("../models/Service");
const User = require("../models/User");

const ServiceController = {
  async create(req, res) {
    try {
      // Crear el nuevo servicio con el ID del usuario autenticado como provider

      const service = await Service.create({
        ...req.body,
        provider: req.user._id,
      });

      // Actualizar el usuario para incluir el nuevo servicio
      const user = await User.findById(req.user._id);
      user.services.push(service._id);
      await user.save();

      res.status(201).send(service);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error al crear el servicio" });
    }
  },
  async updateService(req, res) {
    try {
      const service = await Service.findByIdAndUpdate(
        req.service._id,
        { ...req.body, provider: req.user._id },
        { new: true }
      );
      res.send(service);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema al actualizar el servicio" });
    }
  },
  async getUserServices(req, res) {
    try {
      const services = await Service.find({ provider: req.user._id });

      res.status(200).send(services);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: "Error al obtener los servicios del usuario" });
    }
  },

  async getAllService(req, res) {
    try {
      const services = await Service.find();
      res.send(services);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = ServiceController;
