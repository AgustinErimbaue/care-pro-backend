const Contract = require("../models/Contract");
const Service = require("../models/Service");

const ContractController = {
  async hireService(req, res) {
    
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

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

      res.status(201).json({
        message: "Servicio contratado con éxito",
        contract: newContract,
      });
    } catch (error) {
      res.status(500).json({ message: "Error al contratar el servicio", error });
    }
  },
};

module.exports = ContractController;
