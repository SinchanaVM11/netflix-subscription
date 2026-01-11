import { useState, useRef, useEffect } from "react";
import { subscribePlan } from "../services/api";
import Navbar from "./Navbar";
import "./SubscriptionPlans.css";

const plans = [
  { name: "Basic", price: 199, quality: "SD", screens: 1 },
  { name: "Standard", price: 499, quality: "HD", screens: 2 },
  { name: "Premium", price: 799, quality: "4K", screens: 4 }
];

export default function SubscriptionPlans() {
  // ─── STATE ──────────────────────────────────────
  const [username, setUsername] = useState("");
  const [duration, setDuration] = useState(1);
  const [billingType, setBillingType] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [message, setMessage] = useState("");

  // ─── AUTO SCROLL REF ────────────────────────────
  const confirmRef = useRef(null);

  // ─── AUTO SCROLL EFFECT ─────────────────────────
  useEffect(() => {
    if (showConfirmBox && confirmRef.current) {
      confirmRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [showConfirmBox]);

  // ─── SUBSCRIBE HANDLER ──────────────────────────
  const handleSubscribe = async () => {
    console.log("🔥 Confirm Subscription clicked");

    if (!username || !selectedPlan) {
      alert("Enter username and select a plan");
      return;
    }

    try {
      const durationInMonths =
        billingType === "yearly" ? duration * 12 : duration;

      const res = await subscribePlan(
        username,
        selectedPlan.name,
        durationInMonths,
        billingType
      );

      console.log("✅ Subscription success:", res);

      setShowConfirmBox(false);

      setMessage(
        `Subscribed (${billingType}) • Expires on ${new Date(
          res.expiryDate
        ).toDateString()}`
      );
    } catch (err) {
      console.error("❌ Subscription failed:", err);
      alert("Subscription failed. Please try again.");
    }
  };

  // ─── UI ─────────────────────────────────────────
  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className="hero">
        <h1>Unlimited movies, TV shows and more</h1>
        <p>Watch anywhere. Cancel anytime.</p>
      </div>

      {/* CONTENT */}
      <div className="content">
        <h2>Choose Your Plan</h2>

        {/* USER INPUT */}
        <div className="user-box">
          <input
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            placeholder="Duration"
          />

          <div className="billing-toggle">
            <button
              type="button"
              className={billingType === "monthly" ? "active" : ""}
              onClick={() => setBillingType("monthly")}
            >
              Monthly
            </button>

            <button
              type="button"
              className={billingType === "yearly" ? "active" : ""}
              onClick={() => setBillingType("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* PLANS */}
        <div className="plans">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`plan-card ${
                selectedPlan?.name === plan.name ? "selected" : ""
              }`}
            >
              <h3>{plan.name}</h3>
              <p className="price">₹{plan.price}</p>
              <p>{plan.quality}</p>
              <p>{plan.screens} screens</p>

              <button
                type="button"
                onClick={() => {
                  setSelectedPlan(plan);
                  setShowConfirmBox(true);
                }}
              >
                Select
              </button>
            </div>
          ))}
        </div>

        {/* CONFIRMATION BOX */}
        {showConfirmBox && selectedPlan && (
          <div className="confirm-box" ref={confirmRef}>
            <h3>Confirm Your Plan</h3>

            <p><strong>Plan:</strong> {selectedPlan.name}</p>
            <p><strong>Billing:</strong> {billingType}</p>
            <p>
              <strong>Duration:</strong> {duration}{" "}
              {billingType === "yearly" ? "year(s)" : "month(s)"}
            </p>

            <p className="final-price">
              Total: ₹
              {billingType === "yearly"
                ? selectedPlan.price * 12 * duration
                : selectedPlan.price * duration}
            </p>

            <div className="confirm-actions">
              <button
                type="button"
                className="confirm"
                onClick={handleSubscribe}
              >
                Confirm Subscription
              </button>

              <button
                type="button"
                className="cancel"
                onClick={() => setShowConfirmBox(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {message && <div className="success">{message}</div>}
      </div>
    </>
  );
}
