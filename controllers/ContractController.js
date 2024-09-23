const Contract = require("../models/Contract");
const Service = require("../models/Service");
const User = require("../models/User");

const ContractController = {
  async hireService(req, res) {
    const userId = req.user._id;
    const { serviceId } = req.body;

    try {
      const service = await Service.findById(serviceId).populate("provider");
      if (!service) {
        return res.status(404).json({ message: "Servicio no encontrado" });
      }

      const newContract = new Contract({
        service: service._id,
        user: userId,
        provider: service.provider._id,
        startDate: new Date(),
      });

      await newContract.save();

      await User.findByIdAndUpdate(userId, {
        $push: { contracts: newContract._id },
      });

      res.status(201).json({
        message: "Servicio contratado con éxito",
        contract: newContract,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al contratar el servicio", error });
    }
  },
  async getUserProfile(req, res) {
    try {
      const user = await User.findById(req.user.id).populate({
        path: "contracts",
        populate: {
          path: "service",
          model: "Service",
        },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.json({
        profile: user,
        contracts: user.contracts,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener el perfil del usuario" });
    }
  },
};

module.exports = ContractController;
