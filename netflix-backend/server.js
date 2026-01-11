const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

//  MongoDB connection 
mongoose
  .connect("mongodb://127.0.0.1:27017/netflixDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// 📦 Schema
const SubscriptionSchema = new mongoose.Schema({
  username: String,
  plan: String,
  duration: Number,
  billingType: String,
  expiryDate: Date,
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

// 🧪 Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/subscribe", async (req, res) => {
  console.log("🔥 /subscribe HIT");
  console.log("📦 Request body:", req.body);

  const { username, plan, duration, billingType } = req.body;

  if (!username || !plan) {
    console.log("❌ Missing data");
    return res.status(400).json({ message: "Missing data" });
  }

  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + duration);

  const subscription = new Subscription({
    username,
    plan,
    duration,
    billingType,
    expiryDate,
  });

  await subscription.save();
  console.log("✅ Saved to MongoDB");

  res.json({
    message: "Subscription saved",
    expiryDate,
  });
});

const PORT = 5001;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
