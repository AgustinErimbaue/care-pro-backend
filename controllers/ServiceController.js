const Service = require("../models/Service");

const ServiceController = {
  async create(req, res) {
    try {
      const service = await Service.create(req.body);
      res.status(201).send(service);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = ServiceController;
