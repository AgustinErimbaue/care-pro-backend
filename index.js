const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const cors = require("cors");

const { dbConnection } = require("./config/config");

app.use(express.json());
app.use(cors());

dbConnection();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/users", require("./routes/users"));
app.use("/services", require("./routes/services"));
app.use("/messages", require("./routes/messages"));
app.use("/contracts", require("./routes/contracts"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
