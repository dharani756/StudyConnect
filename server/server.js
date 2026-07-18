const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const requestRoutes =require("./routes/requestRoutes");
console.log("userRoutes imported:", userRoutes);
const doubtRoutes =
require("./routes/doubtRoutes");
const sessionRoutes =
require("./routes/sessionRoutes");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use(
  "/api/requests",
  requestRoutes
);
app.use(
  "/api/doubts",
  doubtRoutes
);
app.use(
  "/api/sessions",
  sessionRoutes
);
app.get("/", (req, res) => {
  res.send("API Running");
});

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});