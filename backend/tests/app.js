const express = require("express");
const clientRoutes = require("../routes/clientRoutes");
const app = express();

app.use(express.json());
app.use("/api/clients", clientRoutes);

module.exports = app;
