const express = require("express");
const router = express.Router();
const Subscription = require("./Subscription");

// 🔹 Status logic
const getSubscriptionStatus = (expiryDate) => {
  const today = new Date();
  const graceEnd = new Date(expiryDate);
  graceEnd.setDate(graceEnd.getDate() + 7);

  if (today <= expiryDate) return "Active";
  if (today <= graceEnd) return "Grace";
  return "Expired";
};

// 🔹 Subscribe
router.post("/subscribe", async (req, res) => {
  try {
    const { username, planName, duration, billingType } = req.body;

    const startDate = new Date();
    const expiryDate = new Date(startDate);
    expiryDate.setMonth(expiryDate.getMonth() + duration);

    const status = getSubscriptionStatus(expiryDate);

    const subscription = new Subscription({
      username,
      planName,
      duration,
      billingType,
      startDate,
      expiryDate,
      status
    });

    await subscription.save();

    res.status(201).json({
      message: "Subscription successful!",
      status,
      expiryDate
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Fetch all
router.get("/subscriptions", async (req, res) => {
  const subs = await Subscription.find();

  const updated = subs.map((s) => ({
    ...s._doc,
    status: getSubscriptionStatus(s.expiryDate)
  }));

  res.json(updated);
});

module.exports = router;
