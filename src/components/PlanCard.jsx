import React from "react";

function PlanCard({ plan, selectPlan }) {
  return (
    <div className="plan-card">
      {plan.name === "Premium" && (
        <div className="badge">MOST POPULAR</div>
      )}

      <h3>{plan.name}</h3>
      <p>₹{plan.price} / month</p>
      <p>Quality: {plan.quality}</p>
      <p>Screens: {plan.screens}</p>

      <button
  onClick={() => {
    setSelectedPlan(plan);
    setShowConfirmBox(true);
  }}
>
  Select
</button>

    </div>
  );
}

export default PlanCard;
