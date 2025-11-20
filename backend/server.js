require("dotenv").config(); 

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const gstRoutes = require("./routes/gstRoutes");
const clientRoutes = require("./routes/clientRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI) 
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB Error:", err));

app.use("/api/gst", gstRoutes);
app.use("/api/clients", clientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
