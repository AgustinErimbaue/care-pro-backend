const express = require("express");
const app = express();
const PORT = 8080;
const { dbConnection } = require("./config/config");

app.use(express.json());

dbConnection();

app.use("/users", require("./routes/users"));
app.use("/services", require("./routes/services"));
app.use("/messages", require("./routes/messages"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
