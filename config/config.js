const mongoose = require("mongoose");
const { MONGO_URI } = require("./keys");

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Base de datos conectada con exito");
  } catch (error) {
    console.error(error);
    throw new Error("Error a la hora de inicar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
