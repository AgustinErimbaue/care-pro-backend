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
};

module.exports = ServiceController;
