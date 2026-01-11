const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  username: String,
  planName: String,

  // always stored in MONTHS
  duration: Number,

  billingType: {
    type: String,
    enum: ["monthly", "yearly"]
  },

  startDate: {
    type: Date,
    default: Date.now
  },

  expiryDate: Date,
  status: String
});

module.exports = mongoose.model("Subscription", subscriptionSchema);



//cd netflix-backend
//npm start


//cd netflix-subscription-frontend
//npm start