const Message = require("../models/Message");

const MessageController = {
  async create(req, res) {
    try {
      const chat = await Message.create({ ...req.body }); 
      res.status(201).send(chat); 
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el usuario" });
    }
  },
};

module.exports = MessageController;
