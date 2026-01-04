const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (so localhost is NOT blank)
app.get("/", (req, res) => {
  res.send("Netflix Backend is running 🚀");
});

// Routes
const subscriptionRoutes = require("./subscriptionRoutes");
app.use("/api", subscriptionRoutes);

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/netflixDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
