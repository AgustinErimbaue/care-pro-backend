const Service = require("../models/Service");
const User = require("../models/User");

const ServiceController = {
  async create(req, res) {
    try {

      const service = await Service.create({
        ...req.body,
        provider: req.user._id,
      });

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
      const updatedService = await Service.findByIdAndUpdate(
        req.params._id,
        { ...req.body, provider: req.user._id },
        { new: true, runValidators: true }
      );

      if (!updatedService) {
        return res.status(400).json({ message: "Error updating service" });
      }

      res.status(200).json(updatedService);
    } catch (error) {
      console.error("Error al actualizar el servicio:", error);
      res.status(500).json({ message: "Error del servidor" });
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

  async getAllServices(req, res) {
    try {
      const services = await Service.find();
      res.send(services);
    } catch (error) {
      console.error(error);
    }
  },

  async deleteService(req, res) {
    try {
      const service = await Service.findByIdAndDelete(req.params._id);

      if (!service) {
        return res.status(404).send({ message: "Servicio no encontrado" });
      }

      const user = await User.findOne({ services: service._id });
      if (user) {
        user.services = user.services.filter(
          (serviceId) => serviceId.toString() !== service._id.toString()
        );
        await user.save();
      }

      res.send({ message: "Servicio eliminado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al eliminar el servicio" });
    }
  },
};

module.exports = ServiceController;
